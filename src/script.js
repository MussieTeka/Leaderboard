import './style.css';

const getScoresButton = document.querySelector('.column-top button');
const submitForm = document.querySelector('form');
const tableBody = document.querySelector('tbody');

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameId = 'JNpem9Nk2cN6NkOU8kz3';

// Get scores for the game with the specified ID
const getScores = async (gameId) => {
  const response = await fetch(`${baseURL}/games/${gameId}/scores/`);
  const data = await response.json();
  const scores = data.result.sort((a, b) => b.score - a.score);
  return scores;
};

// Submit a new score for the game with the specified ID
const submitScore = async (gameId, user, score) => {
  const response = await fetch(`${baseURL}/games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      score,
    }),
  });
  const data = await response.json();
  return data.result;
};

// Display the scores in the table
const displayScores = async () => {
  const scores = await getScores(gameId);
  tableBody.innerHTML = '';
  scores.forEach((score) => {
    const row = document.createElement('tr');
    const userCell = document.createElement('td');
    userCell.textContent = score.user;
    const scoreCell = document.createElement('td');
    scoreCell.textContent = score.score;
    row.appendChild(userCell);
    row.appendChild(scoreCell);
    tableBody.appendChild(row);
  });
};

// Load scores when the page is first opened
displayScores();

// Handle form submit event to submit a new score
submitForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.querySelector('#name');
  const scoreInput = document.querySelector('#score');
  const name = nameInput.value;
  const score = scoreInput.value;
  await submitScore(gameId, name, score);
  nameInput.value = '';
  scoreInput.value = '';
  await displayScores();
});

// Handle "Refresh" button click to get scores for the game
getScoresButton.addEventListener('click', async () => {
  await displayScores();
});
