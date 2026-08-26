/* =========================================================
   CyberSafe — admin.js
   Admin Threat Management Panel (CRUD)
   Create / Read / Update / Delete cybersecurity threats,
   persisted to Local Storage under 'cybersafe_threats'.
   ========================================================= */

let editingId = null;

function loadThreats() {
  let threats = CyberSafe.get("threats", null);
  if (!threats || !threats.length) {
    threats = JSON.parse(JSON.stringify(THREAT_DEFAULTS));
    CyberSafe.set("threats", threats);
  }
  return threats;
}

function saveThreats(threats) {
  CyberSafe.set("threats", threats);
}

function renderAdminTable() {
  const threats = loadThreats();
  const tbody = document.getElementById("admin-tbody");
  tbody.innerHTML = threats
    .map(
      (t) => `
      <tr>
        <td class="mono">${t.code}</td>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td><span class="badge ${t.risk === "high" ? "badge-high" : t.risk === "low" ? "badge-low" : "badge-medium"}">${t.risk}</span></td>
        <td class="table-actions">
          <button class="btn btn-outline btn-sm" data-edit="${t.id}">Edit</button>
          <button class="btn btn-red btn-sm" data-delete="${t.id}">Delete</button>
        </td>
      </tr>`
    )
    .join("");

  tbody.querySelectorAll("[data-edit]").forEach((btn) =>
    btn.addEventListener("click", () => startEdit(btn.dataset.edit))
  );
  tbody.querySelectorAll("[data-delete]").forEach((btn) =>
    btn.addEventListener("click", () => deleteThreat(btn.dataset.delete))
  );

  document.getElementById("admin-count").textContent = `${threats.length} threat record(s)`;
}

function startEdit(id) {
  const threats = loadThreats();
  const t = threats.find((x) => x.id === id);
  if (!t) return;
  editingId = id;

  document.getElementById("f-code").value = t.code;
  document.getElementById("f-name").value = t.name;
  document.getElementById("f-category").value = t.category;
  document.getElementById("f-risk").value = t.risk;
  document.getElementById("f-what").value = t.what;
  document.getElementById("f-prevention").value = t.prevention.join("\n");

  document.getElementById("admin-form-title").textContent = `Edit Threat — ${t.name}`;
  document.getElementById("admin-submit-btn").textContent = "Update Threat";
  document.getElementById("admin-cancel-btn").style.display = "inline-flex";
  window.scrollTo({ top: document.getElementById("admin-form").offsetTop - 100, behavior: "smooth" });
}

function resetForm() {
  editingId = null;
  document.getElementById("admin-form").reset();
  document.getElementById("admin-form-title").textContent = "Add New Threat";
  document.getElementById("admin-submit-btn").textContent = "Add Threat";
  document.getElementById("admin-cancel-btn").style.display = "none";
}

function deleteThreat(id) {
  if (!confirm("Delete this threat record? This cannot be undone.")) return;
  let threats = loadThreats();
  threats = threats.filter((t) => t.id !== id);
  saveThreats(threats);
  renderAdminTable();
  CyberSafe.toast("Threat deleted");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-form");
  if (!form) return;

  renderAdminTable();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("f-code").value.trim().toUpperCase();
    const name = document.getElementById("f-name").value.trim();
    const category = document.getElementById("f-category").value.trim();
    const risk = document.getElementById("f-risk").value;
    const what = document.getElementById("f-what").value.trim();
    const prevention = document
      .getElementById("f-prevention")
      .value.split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!code || !name || !category || !what || prevention.length === 0) {
      CyberSafe.toast("Please fill in all required fields");
      return;
    }

    let threats = loadThreats();

    if (editingId) {
      threats = threats.map((t) =>
        t.id === editingId ? { ...t, code, name, category, risk, what, prevention } : t
      );
      CyberSafe.toast("Threat updated");
    } else {
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36);
      threats.push({
        id,
        code,
        name,
        category,
        risk,
        what,
        how: "Details to be added by an administrator.",
        warningSigns: ["Refer to related resources for warning signs."],
        prevention,
        example: "Example not yet documented."
      });
      CyberSafe.toast("Threat added");
    }

    saveThreats(threats);
    renderAdminTable();
    resetForm();
  });

  document.getElementById("admin-cancel-btn").addEventListener("click", resetForm);

  document.getElementById("admin-reset-data").addEventListener("click", () => {
    if (!confirm("Reset all threat records back to the default dataset?")) return;
    CyberSafe.remove("threats");
    renderAdminTable();
    CyberSafe.toast("Reset to default threats");
  });
});
