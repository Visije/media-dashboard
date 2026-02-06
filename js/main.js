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
