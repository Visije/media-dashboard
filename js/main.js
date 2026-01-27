fetch("https://docs.google.com/spreadsheets/d/e/1fbeWgceLfW_9Nxa7yRQwak-Zuu8q0kw8HOLqIFFfFP4/pub?gid=2143528718&single=true&output=csv")
  .then(res => res.text())
  .then(data => {

    const rows = data.trim().split("\n").slice(1);
    let stats = {};

    rows.forEach(row => {
      const [key, value] = row.split(",");
      stats[key.trim()] = value.trim();
    });

    document.getElementById("weeklyUploads").innerText =
      stats.weekly_uploads || 0;

    document.getElementById("monthlyUploads").innerText =
      stats.monthly_uploads || 0;

    document.getElementById("pendingScripts").innerText =
      stats.pending_scripts || 0;

  })
  .catch(error => {
    console.error("Sheet fetch error:", error);
  });
