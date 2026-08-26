/* =========================================================
   CyberSafe — app.js
   Shared utilities used across every page:
   - localStorage helpers (namespaced)
   - mobile nav toggle
   - toast notifications
   - footer year
   ========================================================= */

const CyberSafe = (function () {
  const NS = "cybersafe_";

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error("CyberSafe storage error:", e);
      return false;
    }
  }

  function remove(key) {
    localStorage.removeItem(NS + key);
  }

  function toast(message) {
    let el = document.getElementById("cs-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "cs-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  return { get, set, remove, toast };
})();

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Highlight active nav tab
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-tabs a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const tabs = document.querySelector(".nav-tabs");
  if (toggle && tabs) {
    toggle.addEventListener("click", () => tabs.classList.toggle("open"));
  }
});
