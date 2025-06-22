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
  { word: 'To boost', prompt: 'Education ___ economic opportunities.', answer: 'To boost', hint: 'To improve or increase something.' }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);


  const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isMobile) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp) return;

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  if (user === correct) {
    fb.textContent = '✓ Correct!';
    fb.className   = 'feedback correct';
    score++;
  } else {
    fb.textContent = `✗ ${data[current].answer}`;
    fb.className   = 'feedback incorrect';
  }

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

/* ---------- MOBILE HINT TOGGLE ---------- */
const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (isMobile) {
  document.addEventListener('click', e => {
    const tips = document.querySelectorAll('.qmark');
    tips.forEach(t => {
      if (t !== e.target) t.classList.remove('active');
    });

    if (e.target.classList.contains('qmark')) {
      e.target.classList.toggle('active');
    }
  });
}

/* ---------- INIT ---------- */
renderCard(current);













