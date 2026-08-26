/* =========================================================
   CyberSafe — threats.js
   Threat data + accordion rendering for threats.html
   ========================================================= */

const THREAT_DEFAULTS = [
  {
    id: "phishing",
    code: "PHI",
    name: "Phishing",
    category: "Email Attack",
    risk: "high",
    what: "Phishing is a deception technique where attackers pose as a trustworthy source (a bank, employer, or service) to trick you into revealing sensitive information.",
    how: "Attackers send emails, texts, or messages that look legitimate and contain a link to a fake login page or a malicious attachment. Once you enter your details or open the file, the attacker captures your credentials or installs malware.",
    warningSigns: [
      "Urgent or threatening language demanding immediate action",
      "Sender address that looks almost right but is slightly off",
      "Generic greetings like 'Dear Customer'",
      "Links that don't match the real company domain",
      "Unexpected attachments"
    ],
    prevention: [
      "Verify the sender's email address carefully",
      "Hover over links before clicking to check the real URL",
      "Never enter credentials from a link in an email",
      "Enable two-factor authentication",
      "Report suspicious emails to IT or your provider"
    ],
    example: "\"Your account will be suspended in 24 hours. Click here to verify your identity immediately.\""
  },
  {
    id: "malware",
    code: "MAL",
    name: "Malware",
    category: "Software Attack",
    risk: "high",
    what: "Malware is any software intentionally designed to damage, disrupt, or gain unauthorized access to a computer system.",
    how: "It spreads through infected downloads, email attachments, malicious ads, or compromised websites. Once installed, it can steal data, monitor activity, or give attackers remote control of the device.",
    warningSigns: [
      "Sudden slowdowns or crashes",
      "Unfamiliar programs or browser toolbars appearing",
      "Pop-ups appearing outside the browser",
      "Antivirus software being disabled unexpectedly",
      "Unusually high network or CPU activity"
    ],
    prevention: [
      "Only download software from official sources",
      "Keep your operating system and apps updated",
      "Run a reputable antivirus / anti-malware tool",
      "Avoid clicking pop-up ads or unknown attachments",
      "Back up important files regularly"
    ],
    example: "A free 'PDF converter' downloaded from a random site silently installs a keylogger in the background."
  },
  {
    id: "ransomware",
    code: "RAN",
    name: "Ransomware",
    category: "Extortion Attack",
    risk: "high",
    what: "Ransomware is malware that encrypts your files and demands payment, usually in cryptocurrency, in exchange for the decryption key.",
    how: "It typically enters through phishing emails, infected downloads, or unpatched software vulnerabilities. Once active, it encrypts documents, photos, and system files, then displays a ransom note.",
    warningSigns: [
      "Files suddenly become inaccessible or renamed with strange extensions",
      "A ransom note appears on the desktop or in every folder",
      "Antivirus alerts about encryption activity",
      "Inability to open previously normal files"
    ],
    prevention: [
      "Maintain offline or cloud backups of important files",
      "Keep software and operating systems patched",
      "Avoid opening attachments from unknown senders",
      "Disable macros in office documents by default",
      "Segment networks to limit how far an infection can spread"
    ],
    example: "An employee opens an invoice attachment; overnight, every file on the shared drive is encrypted with a '.locked' extension."
  },
  {
    id: "social-engineering",
    code: "SOC",
    name: "Social Engineering",
    category: "Human-Layer Attack",
    risk: "medium",
    what: "Social engineering manipulates people, rather than systems, into breaking normal security procedures or handing over confidential information.",
    how: "Attackers impersonate coworkers, vendors, or authority figures over phone, email, or in person, using urgency, trust, or fear to bypass a target's better judgement.",
    warningSigns: [
      "Unusual requests for passwords, access, or money transfers",
      "Pressure to bypass normal verification steps",
      "Callers claiming to be IT or a senior executive",
      "Requests that create a false sense of urgency"
    ],
    prevention: [
      "Verify identity through a separate, known channel before acting",
      "Follow official procedures even when pressured",
      "Never share credentials over phone or chat",
      "Train staff to recognize manipulation tactics",
      "Report suspicious requests to a supervisor or security team"
    ],
    example: "A caller claiming to be from 'IT support' asks an employee to read out their one-time password to 'fix an issue'."
  },
  {
    id: "password-attacks",
    code: "PWD",
    name: "Password Attacks",
    category: "Credential Attack",
    risk: "high",
    what: "Password attacks are attempts to guess, steal, or crack your login credentials to gain unauthorized account access.",
    how: "Common methods include brute-force guessing, credential stuffing (reusing leaked passwords from other breaches), and dictionary attacks against weak or common passwords.",
    warningSigns: [
      "Login alerts or notifications from unfamiliar locations",
      "Account lockouts you didn't trigger",
      "Password reset emails you didn't request",
      "Being logged out of an account unexpectedly"
    ],
    prevention: [
      "Use long, unique passwords for every account",
      "Enable two-factor authentication everywhere possible",
      "Use a password manager instead of reusing passwords",
      "Change passwords immediately after a known data breach",
      "Avoid predictable patterns like names or birthdates"
    ],
    example: "An attacker uses a leaked password list from an old breach to log into a victim's email, since they reused the same password."
  },
  {
    id: "identity-theft",
    code: "IDT",
    name: "Identity Theft",
    category: "Data Exploitation",
    risk: "high",
    what: "Identity theft occurs when someone steals your personal information — such as ID numbers, banking details, or documents — to impersonate you for fraud.",
    how: "Personal data is harvested through data breaches, phishing, stolen documents, or oversharing on social media, then used to open accounts, take loans, or make purchases in your name.",
    warningSigns: [
      "Unexpected bills or accounts you never opened",
      "Missing mail or bank statements",
      "Unfamiliar charges on financial statements",
      "Being denied credit for no clear reason"
    ],
    prevention: [
      "Limit how much personal information you share publicly",
      "Shred documents containing personal or financial details",
      "Monitor bank and credit statements regularly",
      "Use strong, unique passwords and 2FA on financial accounts",
      "Freeze credit reports if identity theft is suspected"
    ],
    example: "A fraudster uses a leaked ID number and address to open a credit card in the victim's name."
  },
  {
    id: "online-scams",
    code: "SCM",
    name: "Online Scams",
    category: "Fraud",
    risk: "medium",
    what: "Online scams are fraudulent schemes designed to trick people into sending money or personal information, often through fake offers or opportunities.",
    how: "Scammers create fake shopping sites, lottery notifications, romance profiles, or investment schemes that appear legitimate to lure victims into paying or sharing details.",
    warningSigns: [
      "Deals that seem too good to be true",
      "Requests for payment via gift cards or crypto only",
      "Pressure to act fast before an 'offer expires'",
      "Poor grammar or inconsistent branding on a site"
    ],
    prevention: [
      "Research a seller or platform before purchasing",
      "Avoid unusual payment methods for online purchases",
      "Never send money to someone you've only met online",
      "Check for secure checkout (https) and verified reviews",
      "Report scam listings to the platform"
    ],
    example: "A shopping ad promises a premium laptop at 80% off; after payment, the item never arrives and the site disappears."
  },
  {
    id: "public-wifi",
    code: "WFI",
    name: "Public Wi-Fi Risks",
    category: "Network Attack",
    risk: "medium",
    what: "Public Wi-Fi networks are often unencrypted or poorly secured, making it easier for attackers on the same network to intercept your traffic.",
    how: "Attackers use techniques like packet sniffing or fake 'evil twin' hotspots that mimic a legitimate network name to capture data sent by unsuspecting users.",
    warningSigns: [
      "Duplicate network names in the same location",
      "Being asked to install a certificate to 'connect'",
      "Browser warnings about invalid certificates",
      "A network with no password on a login-required site"
    ],
    prevention: [
      "Avoid logging into sensitive accounts on public Wi-Fi",
      "Use a trusted VPN when on public networks",
      "Confirm the exact network name with staff before connecting",
      "Turn off auto-connect to open networks",
      "Ensure sites use HTTPS before entering any information"
    ],
    example: "An attacker sets up a hotspot named 'Free_Airport_WiFi' next to the real one and intercepts everyone who connects to it by mistake."
  }
];

function getThreats() {
  const stored = CyberSafe.get("threats", null);
  return stored && stored.length ? stored : THREAT_DEFAULTS;
}

function riskBadgeClass(risk) {
  return risk === "high" ? "badge-high" : risk === "low" ? "badge-low" : "badge-medium";
}

function renderThreatList() {
  const list = document.getElementById("threat-list");
  if (!list) return;
  const threats = getThreats();
  const completed = CyberSafe.get("topicsCompleted", []);

  list.innerHTML = threats
    .map((t) => {
      const isDone = completed.includes(t.id);
      return `
      <div class="threat-item" data-id="${t.id}">
        <button class="threat-item-head" aria-expanded="false">
          <span class="threat-title">
            <span class="threat-icon">${t.code}</span>
            <span>
              <strong>${t.name}</strong>
              <div><span class="badge ${riskBadgeClass(t.risk)}">${t.risk} risk</span> <span class="badge">${t.category}</span></div>
            </span>
          </span>
          <span class="threat-chevron">&#9656;</span>
        </button>
        <div class="threat-item-body">
          <div class="threat-item-body-inner">
            <h4>What is it?</h4>
            <p>${t.what}</p>
            <h4>How does it work?</h4>
            <p>${t.how}</p>
            <h4>Warning signs</h4>
            <ul>${t.warningSigns.map((w) => `<li>${w}</li>`).join("")}</ul>
            <h4>Prevention</h4>
            <ul>${t.prevention.map((p) => `<li>${p}</li>`).join("")}</ul>
            <h4>Real-world example</h4>
            <div class="example-box">${t.example}</div>
            ${
              isDone
                ? `<span class="completed-tag">&#10003; Marked as completed</span>`
                : `<button class="btn btn-outline btn-sm mark-done-btn" data-mark="${t.id}">Mark topic as completed</button>`
            }
          </div>
        </div>
      </div>`;
    })
    .join("");

  list.querySelectorAll(".threat-item-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".threat-item");
      const open = item.classList.toggle("open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  list.querySelectorAll("[data-mark]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-mark");
      const done = CyberSafe.get("topicsCompleted", []);
      if (!done.includes(id)) {
        done.push(id);
        CyberSafe.set("topicsCompleted", done);
        CyberSafe.toast("Topic marked as completed");
        renderThreatList();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", renderThreatList);
