<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Content Calendar</title>

  <link rel="stylesheet" href="css/style.css">

  <style>
    body {
      background: #f6f8fc;
      font-family: Segoe UI, sans-serif;
      padding: 20px;
    }

    header {
      margin-bottom: 20px;
    }

    nav {
      margin-bottom: 20px;
      opacity: 0.6;
    }

    nav a {
      text-decoration: none;
      color: inherit;
      font-size: 14px;
    }

    .day {
      background: white;
      padding: 14px;
      border-radius: 12px;
      margin-bottom: 12px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.05);
    }

    .day strong {
      display: block;
      margin-bottom: 6px;
    }

    ul {
      padding-left: 18px;
      margin: 0;
    }
  </style>
</head>

<body>

<header>
  <h1>📅 Content Calendar</h1>
</header>

<nav>
  <a href="index.html">Home</a>
  &nbsp;·&nbsp;
  <a href="weekly-dashboard.html">Weekly</a>
  &nbsp;·&nbsp;
  <a href="scripts.html">Scripts</a>
</nav>

<!-- CALENDAR OUTPUT -->
<div id="calendar"></div>

<script>
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
      if (!byDate[date]) byDate[date] = [];
      byDate[date].push(r);
    });

    const container = document.getElementById("calendar");
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
  });
</script>

</body>
</html>
