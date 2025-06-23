const data = [
  { word: 'Pandemic', prompt: 'The COVID-19 ___ changed life worldwide.', answer: 'Pandemic', hint: 'A global outbreak of a disease.' },
  { word: 'Isolation', prompt: 'Remote work increased social ___.', answer: 'Isolation', hint: 'Being separated from others, often leading to loneliness.' },
  { word: 'Overpopulation', prompt: '___ in cities causes housing shortages.', answer: 'Overpopulation', hint: 'Too many people in an area, straining resources.' },
  { word: 'Unemployment', prompt: 'High ___ rates lead to economic crises.', answer: 'Unemployment', hint: 'The state of not having a job.' },
  { word: 'Riots', prompt: '___ broke out after the controversial court decision.', answer: 'Riots', hint: 'Violent public disturbances.' },
  { word: 'Materialism', prompt: 'Modern ___ leads to excessive consumerism.', answer: 'Materialism', hint: 'Valuing possessions over spiritual or ethical values.' },
  { word: 'Epidemic', prompt: 'Obesity has become a global ___.', answer: 'Epidemic', hint: 'Rapid spread of disease.' },
  { word: 'Stigmatized', prompt: 'To have another religion is still ___ in some cultures.', answer: 'Stigmatized', hint: 'Viewed negatively by society.' },
  { word: 'Equality', prompt: 'Gender ___ in the workplace is still a challenge.', answer: 'Equality', hint: 'The state of being equal in rights and opportunities.' },
  { word: 'boost', prompt: 'Education ___ economic opportunities.', answer: 'boosts', hint: 'To improve or increase something.' }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);













