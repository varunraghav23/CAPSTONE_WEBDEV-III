/* =========================================================
   CyberSafe — quiz.js
   Cybersecurity knowledge quiz
   ========================================================= */

const QUIZ_QUESTIONS = [
  {
    q: "Which is a common sign of a phishing email?",
    options: ["Official domain name", "Urgent, threatening language", "Strong encryption notice", "Recently updated software"],
    correct: 1,
    explain: "Phishing emails often create false urgency to pressure you into acting before thinking."
  },
  {
    q: "What does ransomware do to a victim's files?",
    options: ["Deletes them permanently", "Encrypts them and demands payment", "Compresses them to save space", "Automatically backs them up"],
    correct: 1,
    explain: "Ransomware encrypts files and holds the decryption key for ransom."
  },
  {
    q: "Which password is the strongest?",
    options: ["password123", "Tr!p9$qLmZ2", "birthday1990", "qwerty"],
    correct: 1,
    explain: "A strong password mixes upper/lowercase letters, numbers, and symbols, with no predictable pattern."
  },
  {
    q: "What is the safest action when you receive an unexpected attachment from an unknown sender?",
    options: ["Open it to see what it is", "Forward it to a friend", "Avoid opening it and verify the sender first", "Reply asking for more details"],
    correct: 2,
    explain: "Unexpected attachments from unknown senders are a common malware delivery method — verify before opening."
  },
  {
    q: "What is 'social engineering' in cybersecurity?",
    options: ["Building secure networks", "Manipulating people into revealing information", "Writing secure code", "Encrypting social media accounts"],
    correct: 1,
    explain: "Social engineering targets human trust and behavior rather than technical systems."
  },
  {
    q: "Which of these best protects an account even if your password is stolen?",
    options: ["A longer username", "Two-factor authentication (2FA)", "A secret security question", "Logging in less often"],
    correct: 1,
    explain: "2FA requires a second verification step, so a stolen password alone isn't enough to log in."
  },
  {
    q: "Why is public Wi-Fi risky for sensitive logins?",
    options: ["It's usually too slow", "Traffic can be intercepted by others on the network", "It costs money to use", "It blocks all websites"],
    correct: 1,
    explain: "Unsecured public networks make it easier for attackers to intercept data in transit."
  },
  {
    q: "What should you do immediately after a website you use announces a data breach?",
    options: ["Ignore it, it's not your problem", "Change your password on that site and anywhere it was reused", "Delete your device", "Wait a year before doing anything"],
    correct: 1,
    explain: "Reused passwords become vulnerable everywhere once one site is breached, so change them promptly."
  },
  {
    q: "Which is an example of identity theft?",
    options: ["Someone opening a credit card using your stolen ID details", "A website using cookies", "A slow computer", "Receiving spam email"],
    correct: 0,
    explain: "Identity theft is the fraudulent use of someone else's personal or financial identity."
  },
  {
    q: "What is the best first step before clicking a link in a text message claiming to be your bank?",
    options: ["Click it immediately to check", "Verify by contacting the bank directly through official channels", "Forward it to family", "Reply with your account number"],
    correct: 1,
    explain: "Always verify through a known, official channel rather than trusting a link directly."
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const container = document.getElementById("quiz-container");
  const q = QUIZ_QUESTIONS[currentQ];
  answered = false;

  document.getElementById("quiz-progress-text").textContent =
    `Question ${currentQ + 1} of ${QUIZ_QUESTIONS.length}`;
  document.getElementById("quiz-progress-fill").style.width =
    `${(currentQ / QUIZ_QUESTIONS.length) * 100}%`;

  container.innerHTML = `
    <h3>${q.q}</h3>
    <div class="quiz-options">
      ${q.options
        .map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`)
        .join("")}
    </div>
    <div class="quiz-explain" id="quiz-explain"></div>
  `;

  container.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => selectAnswer(parseInt(btn.dataset.i, 10)));
  });

  document.getElementById("next-btn").disabled = true;
  document.getElementById("prev-btn").disabled = currentQ === 0;
}

function selectAnswer(i) {
  if (answered) return;
  answered = true;
  const q = QUIZ_QUESTIONS[currentQ];
  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) btn.classList.add("correct");
    else if (idx === i) btn.classList.add("incorrect");
  });

  if (i === q.correct) score++;
  document.getElementById("quiz-explain").textContent = q.explain;
  document.getElementById("next-btn").disabled = false;
}

function showResult() {
  const container = document.getElementById("quiz-container");
  document.querySelector(".quiz-nav").style.display = "none";
  document.getElementById("quiz-progress-fill").style.width = "100%";
  document.getElementById("quiz-progress-text").textContent = "Quiz complete";

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  let feedback;
  if (pct >= 80) feedback = "Excellent! You have strong cybersecurity awareness.";
  else if (pct >= 50) feedback = "Good effort — review a few threat topics to sharpen your knowledge.";
  else feedback = "Consider revisiting the Threat Awareness section before trying again.";

  container.innerHTML = `
    <div class="quiz-result">
      <div class="stat-num">${score}/${QUIZ_QUESTIONS.length}</div>
      <div class="stat-label">Score (${pct}%)</div>
      <p style="margin-top:1rem;">${feedback}</p>
      <button class="btn btn-outline" id="retry-btn">Retake Quiz</button>
    </div>
  `;

  const result = { attempted: true, score, total: QUIZ_QUESTIONS.length, date: new Date().toISOString() };
  CyberSafe.set("quizResults", result);

  document.getElementById("retry-btn").addEventListener("click", () => {
    currentQ = 0;
    score = 0;
    document.querySelector(".quiz-nav").style.display = "flex";
    renderQuestion();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("quiz-container")) return;
  renderQuestion();

  document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQ > 0) {
      currentQ--;
      renderQuestion();
    }
  });
});
