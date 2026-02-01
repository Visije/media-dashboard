// ==================================================
// GLOBAL FETCH CACHE (FAST LOAD, SAFE)
// ==================================================
async function fetchWithCache(url, key, ttl = 60000) {
  const cached = localStorage.getItem(key);
  const time = localStorage.getItem(key + "_time");

  if (cached && time && Date.now() - Number(time) < ttl) {
    return cached;
  }

  const res = await fetch(url);
  const text = await res.text();

  localStorage.setItem(key, text);
  localStorage.setItem(key + "_time", Date.now());

  return text;
}

// ==================================================
// PAGE DETECTION (SAFE, NO ERRORS)
// ==================================================
const pageMeta = document.querySelector('meta[name="page"]');
const PAGE = pageMeta ? pageMeta.content : null;

// ==================================================
// ROLE INIT (DECLARE ONCE — NEVER REDECLARE)
// ==================================================
(function initRole() {
  if (!window.appRole) {
    let storedRole = localStorage.getItem("role");

    if (!storedRole) {
      storedRole = prompt("Enter role: admin / writer / editor");
      localStorage.setItem("role", storedRole);
    }

    window.appRole = storedRole;
  }
})();

const role = window.appRole;

// ==================================================
// ROLE-BASED REDIRECT (ADMIN PAGE ONLY)
// ==================================================
if (PAGE === "admin") {
  if (role === "writer") {
    window.location.replace("scripts.html");
  } else if (role === "editor") {
    window.location.replace("calendar.html");
  }
}

// ==================================================
// ADMIN DASHBOARD STATS (CACHED + SAFE)
// ==================================================
if (PAGE === "admin") {

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
        const stats = {};

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

// ==================================================
// HABIT STREAK + COIN SYSTEM (ASCEND STYLE)
// ==================================================
function getStreak(row, startIndex = 1) {
  // row = [habit, Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  let streak = 0;
  for (let i = row.length - 1; i >= startIndex; i--) {
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

// ==================================================
// UTILITIES (OPTIONAL, FUTURE SAFE)
// ==================================================
function isAdmin() {
  return role === "admin";
}

function isWriter() {
  return role === "writer";
}

function isEditor() {
  return role === "editor";
}
