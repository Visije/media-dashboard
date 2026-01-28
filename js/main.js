// -----------------------------
// PAGE DETECTION (NO URL LOGIC)
// -----------------------------

const page = document.querySelector('meta[name="page"]')?.content;
const role = localStorage.getItem("role");

// -----------------------------
// ROLE BASED REDIRECT
// -----------------------------

if (page === "admin") {
  if (role === "writer") {
    window.location.replace("writer.html");
  }
  else if (role === "editor") {
    window.location.replace("editor.html");
  }
}

// -----------------------------
// ADMIN DASHBOARD STATS ONLY
// -----------------------------

if (page === "admin") {

  const weeklyEl = document.getElementById("weeklyUploads");
  const monthlyEl = document.getElementById("monthlyUploads");
  const pendingEl = document.getElementById("pendingScripts");

  if (!weeklyEl || !monthlyEl || !pendingEl) return;

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
    .catch(err => console.error("Sheet error:", err));
}
