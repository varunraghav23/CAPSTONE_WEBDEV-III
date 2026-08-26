/* =========================================================
   CyberSafe — register.js
   User Registration form validation
   ========================================================= */

function setInvalid(fieldId, message) {
  const field = document.getElementById(fieldId).closest(".field");
  field.classList.add("invalid");
  field.querySelector(".field-error").textContent = message;
}

function setValid(fieldId) {
  const field = document.getElementById(fieldId).closest(".field");
  field.classList.remove("invalid");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pw = document.getElementById("reg-password").value;
    const pw2 = document.getElementById("reg-confirm").value;

    if (!name) {
      setInvalid("reg-name", "Full name is required.");
      valid = false;
    } else setValid("reg-name");

    if (!email) {
      setInvalid("reg-email", "Email is required.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setInvalid("reg-email", "Enter a valid email address.");
      valid = false;
    } else setValid("reg-email");

    const strength = evaluatePassword(pw);
    if (!pw) {
      setInvalid("reg-password", "Password is required.");
      valid = false;
    } else if (strength.passed < 3) {
      setInvalid("reg-password", "Password is too weak. Add uppercase, numbers, or symbols.");
      valid = false;
    } else setValid("reg-password");

    if (!pw2) {
      setInvalid("reg-confirm", "Please confirm your password.");
      valid = false;
    } else if (pw !== pw2) {
      setInvalid("reg-confirm", "Passwords do not match.");
      valid = false;
    } else setValid("reg-confirm");

    if (!valid) return;

    CyberSafe.set("user", { name, email, registeredAt: new Date().toISOString() });
    document.getElementById("register-success").style.display = "block";
    form.reset();
    document.getElementById("pw-reg-meter-fill") && (document.getElementById("pw-reg-meter-fill").style.width = "0%");
    CyberSafe.toast("Registration successful");
  });

  // live password strength on the registration password field (reuses evaluatePassword from password.js)
  const pwInput = document.getElementById("reg-password");
  const fill = document.getElementById("pw-reg-meter-fill");
  if (pwInput && fill) {
    const colorMap = { weak: "#E5484D", fair: "#F2B705", good: "#35C9C9", strong: "#2ECC71" };
    pwInput.addEventListener("input", () => {
      const r = evaluatePassword(pwInput.value);
      fill.style.width = r.percent + "%";
      fill.style.background = colorMap[r.colorClass] || "#E5484D";
    });
  }
});
