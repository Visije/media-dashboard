// Run only on calendar page
if (document.querySelector('meta[name="page"][content="calendar"]')) {

  const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTU4yNw1NlyydNT5CH3XZrGYyS27yZXuK6JKfID416K2nFSwtAznHjlYYySULRP7i8ktOIM54bxl2sn/pub?gid=0&single=true&output=csv";

  function parseCSV(text) {
    return text
      .trim()
      .split("\n")
      .slice(1)
      .map(row => row.split(","));
  }

  fetch(sheetURL)
    .then(res => res.text())
    .then(text => {
      const rows = parseCSV(text);
      const byDate = {};

      rows.forEach(r => {
        const date = r[4];
        if (!date) return;

        if (!byDate[date]) byDate[date] = [];
        byDate[date].push(r);
      });

      const container = document.getElementById("calendar");
      if (!container) return;

      container.innerHTML = "";

      Object.keys(byDate)
        .sort()
        .forEach(date => {
          container.innerHTML += `
            <div class="day">
              <strong>${date}</strong>
              <ul>
                ${byDate[date]
                  .map(r => `<li>${r[0]} – ${r[1]}</li>`)
                  .join("")}
              </ul>
            </div>
          `;
        });
    })
    .catch(err => {
      console.error("Calendar load failed:", err);
    });

}

// =============================
// CONTENT CALENDAR
// =============================

if (document.querySelector('meta[name="page"]')?.content === 'calendar') {

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const dailyIGAccounts = [
    "Meer Rana",
    "Topography",
    "Mixing Masti"
  ];

  const weeklyAccounts = [
    "Ender Vij",
    "I'm Gurey",
    "CRUST",
    "Zone-out History",
    "Touristico"
  ];

  const weeklyDays = [
    "Monday",
    "Wednesday",
    "Friday",
    "Sunday"
  ];

 const calendar = document.getElementById("calendar");

  function uploadCard(name, type, count = 1) {
    return `
      <div class="upload ${type}">
        <strong>${name}</strong>

        <div class="muted">
          ${type === 'ig'
            ? 'Instagram Reels'
            : 'YouTube + Instagram'}
        </div>

        <div class="status">
          ${count > 1
            ? `${count} Reels Planned`
            : '1 Reel Planned'}
        </div>
      </div>
    `;
  }

  days.forEach(day => {

    let html = `
      <div class="day">
        <h3>${day}</h3>
    `;
 // DAILY INSTAGRAM PAGES
    dailyIGAccounts.forEach(acc => {
      html += uploadCard(acc, 'ig', 2);
    });

    // WEEKLY BRAND ACCOUNTS
    if (weeklyDays.includes(day)) {
      weeklyAccounts.forEach(acc => {
        html += uploadCard(acc, 'yt');
      });
    }

    html += `</div>`;

    calendar.innerHTML += html;
  });
}

