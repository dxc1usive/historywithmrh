// Helper to parse a CSV row with optional quoted fields
function parseCSVRow(row) {
  row = row.trim();
  const cells = row.match(/("[^"]*"|[^,]+)/g) || [];
  return cells.map(c => c.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
}

// Load and display all future assignments
async function loadAllUpcoming() {
  const list = document.getElementById('upcomingList');
  if (!list) return;
  list.innerHTML = '';

  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvXvy8Y8j4SKTGmgOTnuPNfKf2ZR0UThzEQ5LcUXw6HHtdvnY3JQdMxFmvyU0MjjF84O_i7hZ4Btf1/pub?output=csv';

  try {
    let text = '';
    try {
      const res = await fetch(sheetURL);
      if (!res.ok) throw new Error('Request failed');
      text = await res.text();
    } catch (_e) {
      const local = await fetch('../assignments.csv');
      text = await local.text();
    }
    const rows = text.split('\n').slice(1);
    const now = new Date();
    const upcoming = [];
    rows.forEach(row => {
      const [title,, dueDate, dueTime] = parseCSVRow(row);
      if (title && dueDate && dueTime) {
        const time = dueTime.replace(/(am|pm)$/i, ' $1');
        let dt = new Date(`${dueDate} ${time}`);
        if (isNaN(dt)) dt = new Date(`${dueDate}T${time}`);
        if (!isNaN(dt) && dt > now) upcoming.push({title, dt});
      }
    });
    upcoming.sort((a,b) => a.dt - b.dt);
    if (!upcoming.length) {
      list.innerHTML = '<li>No upcoming assignments</li>';
    } else {
      upcoming.forEach(item => {
        const li = document.createElement('li');
        const date = item.dt.toLocaleDateString();
        const time = item.dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        li.textContent = `${item.title} - Due ${date} ${time}`;
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error('Failed to load upcoming assignments', err);
    list.innerHTML = '<li>Error loading assignments</li>';
  }
}

document.addEventListener('DOMContentLoaded', loadAllUpcoming);