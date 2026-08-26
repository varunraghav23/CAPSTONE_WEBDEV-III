/* =========================================================
   CyberSafe — phishing.js
   Phishing Detection Challenge
   ========================================================= */

const PHISHING_SCENARIOS = [
  {
    text: "\"Your bank account will be blocked today! Click here immediately to verify your account.\"",
    answer: "phishing",
    explain: "Urgent threats plus a demand to click a link immediately are classic phishing tactics."
  },
  {
    text: "\"Hi team, reminder that the sprint review is moved to 3 PM today in Room 204. — Priya\"",
    answer: "safe",
    explain: "A routine, specific internal message with no links, urgency, or requests for information."
  },
  {
    text: "\"Congratulations! You've won a $1,000 gift card. Claim now within 10 minutes: bit.ly/claim-prize\"",
    answer: "phishing",
    explain: "Unexpected prizes, shortened links, and countdown pressure are strong phishing indicators."
  },
  {
    text: "\"Your package could not be delivered. Please confirm your address and pay a small redelivery fee here: [link]\"",
    answer: "phishing",
    explain: "Fake delivery notices asking for payment or personal details via a link are a common scam pattern."
  },
  {
    text: "\"Your monthly statement is now available. Log in at the usual banking app or website to view it.\"",
    answer: "safe",
    explain: "No link is provided and it directs you to access the account through your normal, trusted method."
  },
  {
    text: "\"URGENT: IT has detected a virus on your PC. Call this number now or remote access will be lost.\"",
    answer: "phishing",
    explain: "Fear-based urgency and unsolicited tech-support contact is a well-known scam tactic."
  },
  {
    text: "\"Hey, saw this article and thought you'd like it: [link to a well-known news site]\"",
    answer: "suspicious",
    explain: "Even from a known contact, unexpected links can indicate a compromised account — verify before clicking."
  },
  {
    text: "\"Dear Customer, unusual sign-in activity was detected. If this wasn't you, secure your account: [official-looking but misspelled domain]\"",
    answer: "phishing",
    explain: "Generic greetings combined with a lookalike domain are a strong phishing signal."
  }
];

let phIndex = 0;
let phScore = 0;

function renderScenario() {
  const scenario = PHISHING_SCENARIOS[phIndex];
  document.getElementById("phish-msg").textContent = scenario.text;
  document.getElementById("phish-count").textContent = `Case ${phIndex + 1} of ${PHISHING_SCENARIOS.length}`;
  document.getElementById("phish-feedback").className = "phish-feedback";
  document.getElementById("phish-feedback").textContent = "";
  document.querySelectorAll(".phish-choice").forEach((b) => (b.disabled = false));
  document.getElementById("phish-next").style.display = "none";
}

function submitAnswer(choice) {
  const scenario = PHISHING_SCENARIOS[phIndex];
  const correct = choice === scenario.answer;
  if (correct) phScore++;

  document.querySelectorAll(".phish-choice").forEach((b) => (b.disabled = true));
  const feedback = document.getElementById("phish-feedback");
  feedback.classList.add("show", correct ? "correct" : "incorrect");
  feedback.textContent = (correct ? "Correct. " : `Not quite — the correct answer is "${scenario.answer}". `) + scenario.explain;
  document.getElementById("phish-next").style.display = "inline-flex";
}

function finishChallenge() {
  const container = document.getElementById("phishing-container");
  container.innerHTML = `
    <div class="quiz-result">
      <div class="stat-num">${phScore}/${PHISHING_SCENARIOS.length}</div>
      <div class="stat-label">Cases correctly identified</div>
      <p style="margin-top:1rem;">Recognizing these patterns is your best defense against real phishing attempts.</p>
      <button class="btn btn-outline" id="phish-retry">Try Again</button>
    </div>
  `;
  CyberSafe.set("phishingScore", { correct: phScore, total: PHISHING_SCENARIOS.length, date: new Date().toISOString() });
  document.getElementById("phish-retry").addEventListener("click", () => {
    phIndex = 0;
    phScore = 0;
    buildChallengeUI();
  });
}

function buildChallengeUI() {
  const container = document.getElementById("phishing-container");
  container.innerHTML = `
    <div class="quiz-progress" id="phish-count"></div>
    <div class="phish-msg" id="phish-msg"></div>
    <div class="phish-choices">
      <button class="btn btn-outline phish-choice" data-choice="safe">Safe</button>
      <button class="btn btn-outline phish-choice" data-choice="suspicious">Suspicious</button>
      <button class="btn btn-red phish-choice" data-choice="phishing">Phishing</button>
    </div>
    <div class="phish-feedback" id="phish-feedback"></div>
    <div class="quiz-nav">
      <span></span>
      <button class="btn" id="phish-next" style="display:none;">Next Case</button>
    </div>
  `;

  container.querySelectorAll(".phish-choice").forEach((btn) => {
    btn.addEventListener("click", () => submitAnswer(btn.dataset.choice));
  });
  document.getElementById("phish-next").addEventListener("click", () => {
    if (phIndex < PHISHING_SCENARIOS.length - 1) {
      phIndex++;
      renderScenario();
    } else {
      finishChallenge();
    }
  });

  renderScenario();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("phishing-container")) buildChallengeUI();
});
