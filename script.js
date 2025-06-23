const quotes = [
    { text: "History is written by the victors.", author: "Winston Churchill" },
    { text: "Those who do not learn history are doomed to repeat it.", author: "George Santayana" },
    { text: "History will be kind to me for I intend to write it.", author: "Winston Churchill" },
    { text: "The more you know about the past, the better prepared you are for the future.", author: "Theodore Roosevelt" },
    "We are not makers of history. We are made by history. — Martin Luther King Jr."
];

function setDailyQuote() {
    const today = new Date().getDate();
    const q = quotes[today % quotes.length];
    const el = document.getElementById("dailyQuote");
    if (el) {
        el.innerHTML = `<p class="quote-text">&ldquo;${q.text}&rdquo;</p>` +
                       `<p class="quote-author">&mdash; ${q.author}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", setDailyQuote);

function checkSession() {
    if (typeof updateLoginUI === 'function') {
        updateLoginUI();
    }
}

document.addEventListener('DOMContentLoaded', checkSession);


// Simple slideshow functionality for the home page with fade effect
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    let index = 0;

    slides.forEach((s, i) => {
        s.classList.toggle('active', i === 0);
    });

    function next() {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }

    setInterval(next, 5000);
}

document.addEventListener('DOMContentLoaded', initSlideshow);

// Load a short list of upcoming assignments on the home page
async function loadUpcomingAssignments() {
    const list = document.getElementById('upcomingAssignments');
    if (!list) return;

    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvXvy8Y8j4SKTGmgOTnuPNfKf2ZR0UThzEQ5LcUXw6HHtdvnY3JQdMxFmvyU0MjjF84O_i7hZ4Btf1/pub?output=csv';

    try {
        const res = await fetch(sheetURL);
        const text = await res.text();
        const rows = text.split('\n').slice(1);
        const now = new Date();
        const upcoming = [];

        rows.forEach(row => {
            const [title,, dueDate, dueTime] = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            if (title && dueDate && dueTime) {
                let dt = new Date(`${dueDate} ${dueTime}`);
                if (isNaN(dt)) dt = new Date(`${dueDate}T${dueTime}`);
                if (!isNaN(dt) && dt > now) {
                    upcoming.push({ title, dt });
                }
            }
        });

        upcoming.sort((a,b) => a.dt - b.dt);
        list.innerHTML = '';
        const shown = upcoming.slice(0,3);
        if (!shown.length) {
            list.innerHTML = '<li>No upcoming assignments</li>';
        } else {
            shown.forEach(item => {
                const li = document.createElement('li');
                const date = item.dt.toLocaleDateString();
                const time = item.dt.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
                li.textContent = `${item.title} - Due ${date} ${time}`;
                list.appendChild(li);
            });
        }
    } catch (e) {
        list.innerHTML = '<li>Error loading assignments</li>';
    }
}

document.addEventListener('DOMContentLoaded', loadUpcomingAssignments);