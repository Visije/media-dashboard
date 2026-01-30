// ==================================================
// GLOBAL FETCH CACHE (FAST LOAD)
// ==================================================
async function fetchWithCache(url, key, ttl = 60000) {
  const cached = localStorage.getItem(key);
  const time = localStorage.getItem(key + "_time");

  if (cached && time && Date.now() - time < ttl) {
    return cached;
  }

  const res = await fetch(url);
  const text = await res.text();

  localStorage.setItem(key, text);
  localStorage.setItem(key + "_time", Date.now());

  return text;
}

// ==================================================
// PAGE DETECTION
// ==================================================
const page = document.querySelector('meta[name="page"]')?.content || null;

// ==================================================
// ROLE INIT (DECLARE ONCE SAFELY)
// ==================================================
if (!window.appRole) {
  window.appRole = localStorage.getItem("role");

  if (!window.appRole) {
    window.appRole = prompt("Enter role: admin / writer / editor");
    localStorage.setItem("role", window.appRole);
  }
}

const role = window.appRole;

// ==================================================
// ROLE BASED REDIRECT (ADMIN ONLY)
// ==================================================
if (page === "admin") {
  if (role === "writer") {
    window.location.replace("scripts.html");
  } else if (role === "editor") {
    window.location.replace("calendar.html");
  }
}

// ==================================================
// ADMIN DASHBOARD STATS (CACHED + FAST)
// ==================================================
if (page === "admin") {

  const weeklyEl = document.getElementById("weeklyUploads");
  const monthlyEl = document.getElementById("monthlyUploads");
  const pendingEl = document.getElementById("pendingScripts");

  if (!weeklyEl || !monthlyEl || !pendingEl) {
    console.warn("Admin stats elements not found");
  } else {

    const STATS_CSV_URL =
      "https://docs.google.com/spreadsheets/d/e/1fbeWgceLfW_9Nxa7yRQwak-Zuu8q0kw8HOLqIFFfFP4/pub?gid=2143528718&single=true&output=csv";

    fetchWithCache(STATS_CSV_URL, "admin_stats", 300000) // 5 min cache
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
      .catch(err => console.error("Admin stats sheet error:", err));
  }
}

function getStreak(row) {
  let streak = 0;
  for (let i = 7; i >= 1; i--) {
    if (row[i] === "TRUE") streak++;
    else break;
  }
  return streak;
}

function streakCoin(streak) {
  if (streak >= 21) return `<span class="coin gold">21</span>`;
  if (streak >= 7)  return `<span class="coin silver">7</span>`;
  if (streak >= 3)  return `<span class="coin bronze">3</span>`;
  return "";
}
