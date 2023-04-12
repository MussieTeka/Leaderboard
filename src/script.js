import './style.css';

const getScoresButton = document.querySelector('.column-top button');
const submitForm = document.querySelector('form');

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameId = '5Wo68C2OZONvrxYYkjF7';

// Get scores for the game with the specified ID
async function getScores(gameId) {
  const response = await fetch(`${baseURL}/games/${gameId}/scores/`);
  const data = await response.json();
  const scores = data.result.sort((a, b) => b.score - a.score);
  return scores;
}

// Submit a new score for the game with the specified ID
async function submitScore(gameId, user, score) {
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
}

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
});

// Handle "Refresh" button click to get scores for the game
getScoresButton.addEventListener('click', async () => {
  const scores = await getScores(gameId);
  const tableBody = document.querySelector('tbody');
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
});
