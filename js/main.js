// -----------------------------
// READ ROLE FROM LOCAL STORAGE
// -----------------------------

const role = localStorage.getItem("role");

// Redirect based on role
if (role === "writer") {
  window.location.href = "writer.html";
}
else if (role === "editor") {
  window.location.href = "editor.html";
}

// -----------------------------
// ADMIN DASHBOARD ONLY
// (Google Sheets Stats Fetch)
// -----------------------------

const weeklyEl = document.getElementById("weeklyUploads");
const monthlyEl = document.getElementById("monthlyUploads");
const pendingEl = document.getElementById("pendingScripts");

if (weeklyEl && monthlyEl && pendingEl) {

  fetch("https://docs.google.com/spreadsheets/d/e/1fbeWgceLfW_9Nxa7yRQwak-Zuu8q0kw8HOLqIFFfFP4/pub?gid=2143528718&single=true&output=csv")
    .then(res => res.text())
    .then(data => {

      const rows = data.trim().split("\n").slice(1);
      let stats = {};

      rows.forEach(row => {
        const [key, value] = row.split(",");
        stats[key.trim()] = value.trim();
      });

      weeklyEl.innerText = stats.weekly_uploads || 0;
      monthlyEl.innerText = stats.monthly_uploads || 0;
      pendingEl.innerText = stats.pending_scripts || 0;

    })
    .catch(error => {
      console.error("Sheet fetch error:", error);
    });

}

