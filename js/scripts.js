// =======================================
// ASCEND-STYLE SCRIPT TRACKER (scripts.js)
// =======================================

// Google Sheets CSV URL (published)
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTU4yNw1NlyydNT5CH3XZrGYyS27yZXuK6JKfID416K2nFSwtAznHjlYYySULRP7i8ktOIM54bxl2sn/pub?gid=0&single=true&output=csv";

// Channel list
const channels = [
  "Ender Vij",
  "I'm Gurey",
  "CRUST",
  "Zone-out History",
  "Touristico"
];

// ---------------- SAFE CSV PARSER ----------------
function parseCSV(text) {
  const lines = text.split("\n").filter(l => l.trim() !== "");
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    if (!cols) continue;

    rows.push(cols.map(c => c.replace(/^"|"$/g, "").trim()));
  }
  return rows;
}

// ---------------- WEEK RANGE ----------------
function getWeekRange(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return null;

  const day = d.getDay() || 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 1);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return (
    monday.toISOString().slice(0, 10) +
    " → " +
    sunday.toISOString().slice(0, 10)
  );
}

// ---------------- FETCH & RENDER ----------------
fetch(sheetURL)
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch Google Sheet");
    return res.text();
  })
  .then(text => {
    const rows = parseCSV(text);
    const container = document.getElementById("tables");

    if (!container) return;

    container.innerHTML = "";

    const weeklyGroups = {};

    // Group by week
    rows.forEach(r => {
      if (!r[4]) return;

      const week = getWeekRange(r[4]);
      if (!week) return;

      if (!weeklyGroups[week]) weeklyGroups[week] = [];
      weeklyGroups[week].push(r);
    });

    // Render weeks (latest first)
    Object.keys(weeklyGroups)
      .sort()
      .reverse()
      .forEach(week => {
        const weekTitle = document.createElement("h2");
        weekTitle.textContent = "Week: " + week;
        weekTitle.style.marginTop = "40px";
        container.appendChild(weekTitle);

        channels.forEach(channel => {
          const channelRows = weeklyGroups[week].filter(
            r => r[1] === channel
          );

          if (channelRows.length === 0) return;

          const completed = channelRows.filter(
            r => r[2] === "Ready"
          ).length;

          const percent = Math.round(
            (completed / channelRows.length) * 100
          );

          const card = document.createElement("div");
          card.className = "channel-card";

          card.innerHTML =
            '<div class="channel-header">' +
              '<h3>' + channel + '</h3>' +
              '<div>' + percent + '% Ready</div>' +
            '</div>' +

            '<div class="progress-bar">' +
              '<div class="progress-bar-inner" style="width:' + percent + '%"></div>' +
            '</div>' +

            '<table>' +
              '<tr>' +
                '<th>Title</th>' +
                '<th>Status</th>' +
                '<th>Words</th>' +
                '<th>Date</th>' +
              '</tr>' +

              channelRows.map(r =>
                '<tr>' +
                  '<td class="title-cell">' +
                    (r[0].length > 120 ? r[0].slice(0, 120) + "…" : r[0]) +
                  '</td>' +
                  '<td><span class="badge ' + r[2] + '">' + r[2] + '</span></td>' +
                  '<td>' + r[3] + '</td>' +
                  '<td>' + r[4] + '</td>' +
                '</tr>'
              ).join("") +

            '</table>';

          container.appendChild(card);
        });
      });
  })
  .catch(err => {
    const container = document.getElementById("tables");
    if (container) {
      container.innerHTML =
        "<p style='color:red;font-weight:bold'>❌ Error loading scripts</p>";
    }
    console.error("Script Tracker Error:", err);
  });
