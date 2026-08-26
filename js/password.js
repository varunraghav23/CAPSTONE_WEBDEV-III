/* =========================================================
   CyberSafe — password.js
   Password Strength Checker
   ========================================================= */

function evaluatePassword(pw) {
  const checks = {
    length: pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw)
  };
  const passed = Object.values(checks).filter(Boolean).length;

  let label, colorClass, percent;
  if (pw.length === 0) {
    label = "—"; colorClass = ""; percent = 0;
  } else if (passed <= 2) {
    label = "Weak"; colorClass = "weak"; percent = 20;
  } else if (passed === 3) {
    label = "Fair"; colorClass = "fair"; percent = 45;
  } else if (passed === 4) {
    label = "Good"; colorClass = "good"; percent = 70;
  } else {
    label = "Strong"; colorClass = "strong"; percent = 100;
  }
  return { checks, passed, label, colorClass, percent };
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("pw-input");
  if (!input) return;

  const toggleBtn = document.getElementById("pw-toggle");
  const fill = document.getElementById("pw-meter-fill");
  const label = document.getElementById("pw-strength-label");
  const checkEls = {
    length: document.getElementById("check-length"),
    uppercase: document.getElementById("check-uppercase"),
    lowercase: document.getElementById("check-lowercase"),
    number: document.getElementById("check-number"),
    special: document.getElementById("check-special")
  };

  const colorMap = { weak: "#E5484D", fair: "#F2B705", good: "#35C9C9", strong: "#2ECC71" };

  function update() {
    const result = evaluatePassword(input.value);
    fill.style.width = result.percent + "%";
    fill.style.background = colorMap[result.colorClass] || "#E5484D";
    label.textContent = result.label;
    label.style.color = colorMap[result.colorClass] || "var(--text-dim)";

    Object.keys(checkEls).forEach((key) => {
      checkEls[key].classList.toggle("pass", result.checks[key]);
    });
  }

  input.addEventListener("input", update);
  toggleBtn.addEventListener("click", () => {
    const isPw = input.type === "password";
    input.type = isPw ? "text" : "password";
    toggleBtn.textContent = isPw ? "Hide" : "Show";
  });

  update();
});
