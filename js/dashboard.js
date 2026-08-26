/* =========================================================
   CyberSafe — dashboard.js
   Personal Learning Dashboard — aggregates data from
   Local Storage written by quiz.js, threats.js, tips.js,
   and phishing.js
   ========================================================= */

function renderDashboard() {
  const totalTopics = (CyberSafe.get("threats", null) || THREAT_DEFAULTS_FALLBACK).length;
  const completed = CyberSafe.get("topicsCompleted", []);
  const quiz = CyberSafe.get("quizResults", null);
  const tipsViewed = CyberSafe.get("tipsViewed", []);
  const phishing = CyberSafe.get("phishingScore", null);
  const user = CyberSafe.get("user", null);

  document.getElementById("dash-user").textContent = user ? user.name : "Guest Learner";

  // Topics completed
  const topicPct = Math.round((completed.length / totalTopics) * 100) || 0;
  document.getElementById("dash-topics-num").textContent = `${completed.length}/${totalTopics}`;
  document.getElementById("dash-topics-bar").style.width = topicPct + "%";

  // Quiz
  if (quiz && quiz.attempted) {
    document.getElementById("dash-quiz-num").textContent = `${quiz.score}/${quiz.total}`;
    document.getElementById("dash-quiz-bar").style.width = Math.round((quiz.score / quiz.total) * 100) + "%";
  } else {
    document.getElementById("dash-quiz-num").textContent = "Not attempted";
    document.getElementById("dash-quiz-bar").style.width = "0%";
  }

  // Tips
  const tipTotal = 12;
  document.getElementById("dash-tips-num").textContent = `${tipsViewed.length}/${tipTotal}`;
  document.getElementById("dash-tips-bar").style.width = Math.round((tipsViewed.length / tipTotal) * 100) + "%";

  // Phishing
  if (phishing) {
    document.getElementById("dash-phish-num").textContent = `${phishing.correct}/${phishing.total}`;
    document.getElementById("dash-phish-bar").style.width = Math.round((phishing.correct / phishing.total) * 100) + "%";
  } else {
    document.getElementById("dash-phish-num").textContent = "Not attempted";
    document.getElementById("dash-phish-bar").style.width = "0%";
  }

  // Overall progress (average of the four areas, capped 0-100)
  const quizScorePct = quiz && quiz.attempted ? (quiz.score / quiz.total) * 100 : 0;
  const phishPct = phishing ? (phishing.correct / phishing.total) * 100 : 0;
  const tipsPct = (tipsViewed.length / tipTotal) * 100;
  const overall = Math.round((topicPct + quizScorePct + phishPct + tipsPct) / 4);
  document.getElementById("dash-overall-num").textContent = overall + "%";
  document.getElementById("dash-overall-bar").style.width = overall + "%";
}

// fallback list length if threats.js somehow isn't loaded first
const THREAT_DEFAULTS_FALLBACK = new Array(8).fill(0);

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("dash-overall-num")) renderDashboard();
});
