/* =========================================================
   CyberSafe — tips.js
   Daily Security Tips carousel
   ========================================================= */

const SECURITY_TIPS = [
  "Use strong and unique passwords for every account.",
  "Enable two-factor authentication wherever it's offered.",
  "Never click suspicious or unexpected links.",
  "Keep your software and operating system updated.",
  "Avoid sharing one-time passwords (OTPs) with anyone.",
  "Verify unknown senders before responding or clicking.",
  "Back up important files regularly, offline and in the cloud.",
  "Avoid logging into sensitive accounts on public Wi-Fi.",
  "Check for HTTPS before entering payment information.",
  "Log out of accounts on shared or public devices.",
  "Review app permissions periodically and revoke unused ones.",
  "Be cautious of deals or offers that feel too good to be true."
];

let tipIndex = 0;

function showTip(index) {
  document.getElementById("tip-text").textContent = SECURITY_TIPS[index];
  document.getElementById("tip-index").textContent = `Tip ${index + 1} of ${SECURITY_TIPS.length}`;

  const viewed = CyberSafe.get("tipsViewed", []);
  if (!viewed.includes(index)) {
    viewed.push(index);
    CyberSafe.set("tipsViewed", viewed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("next-tip-btn");
  if (!nextBtn) return;

  tipIndex = Math.floor(Math.random() * SECURITY_TIPS.length);
  showTip(tipIndex);

  nextBtn.addEventListener("click", () => {
    tipIndex = (tipIndex + 1) % SECURITY_TIPS.length;
    showTip(tipIndex);
  });
});
