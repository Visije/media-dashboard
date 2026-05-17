// =====================================
// CONTENT CALENDAR
// =====================================

// Run only on calendar page
if (document.querySelector('meta[name="page"][content="calendar"]')) {

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  // Instagram-only accounts
  // 2 reels daily
  const dailyIGAccounts = [
    "Meer Rana",
    "Topography",
    "Mixing Masti"
  ];

  // YouTube + Instagram accounts
  // 4 reels weekly
  const weeklyAccounts = [
    "Ender Vij",
    "I'm Gurey",
    "CRUST",
    "Zone-out History",
    "Touristico"
  ];

  // Upload days for weekly accounts
  const weeklyDays = [
    "Monday",
    "Wednesday",
    "Friday",
    "Sunday"
  ];

  const calendar = document.getElementById("calendar");

  if (!calendar) {
    console.error("Calendar container not found");
  } else {

    function uploadCard(name, type, count = 1) {

      return `
        <div class="upload ${type}">

          <strong>${name}</strong>

          <div class="muted">
            ${
              type === "ig"
                ? "Instagram Reels"
                : "YouTube + Instagram"
            }
          </div>

          <div class="status">
            ${
              count > 1
                ? `${count} Reels Planned`
                : "1 Reel Planned"
            }
          </div>

        </div>
      `;
    }

    // Clear calendar first
    calendar.innerHTML = "";

    // Create each day
    days.forEach(day => {

      let html = `
        <div class="day">
          <h3>${day}</h3>
      `;

      // =====================================
      // DAILY INSTAGRAM PAGES
      // =====================================

      dailyIGAccounts.forEach(account => {
        html += uploadCard(account, "ig", 2);
      });

      // =====================================
      // WEEKLY YOUTUBE + INSTAGRAM PAGES
      // =====================================

      if (weeklyDays.includes(day)) {

        weeklyAccounts.forEach(account => {
          html += uploadCard(account, "yt", 1);
        });

      }

      html += `</div>`;

      calendar.innerHTML += html;

    });

  }

}
