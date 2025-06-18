const quotes = [
    { text: "History is written by the victors.", author: "Winston Churchill" },
    { text: "Those who do not learn history are doomed to repeat it.", author: "George Santayana" },
    { text: "History will be kind to me for I intend to write it.", author: "Winston Churchill" },
    { text: "The more you know about the past, the better prepared you are for the future.", author: "Theodore Roosevelt" },
    "We are not makers of history. We are made by history. — Martin Luther King Jr."
];

function setDailyQuote() {
    const today = new Date().getDate();
    const quote = quotes[today % quotes.length];
    document.getElementById("dailyQuote").innerText = quote;
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

// Fetch upcoming assignments and show them in the reminder box on the home page
async function loadReminders() {
    const box = document.getElementById('reminder-list');
    if (!box) return;

    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvXvy8Y8j4SKTGmgOTnuPNfKf2ZR0UThzEQ5LcUXw6HHtdvnY3JQdMxFmvyU0MjjF84O_i7hZ4Btf1/pub?output=csv";
    let rows = [];

    try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        rows = data.split("\n").slice(1);
    } catch (err) {
        box.innerHTML = '<li class="error">Unable to load reminders.</li>';
        return;
    }

    const now = new Date();
    const events = [];

    rows.forEach(row => {
        const [title, description, dueDate, dueTime] = row.split(',');
        if (title && dueDate && dueTime) {
            const dueDateTime = new Date(`${dueDate}T${dueTime}:00`);
            if (dueDateTime >= now) {
                events.push({title, dueDate, dueTime, dueDateTime});
            }
        }
    });

    events.sort((a, b) => a.dueDateTime - b.dueDateTime);

    box.innerHTML = '';
    if (!events.length) {
        box.innerHTML = '<li>No upcoming assignments.</li>';
        return;
    }

    events.slice(0, 5).forEach(ev => {
        const li = document.createElement('li');
        li.textContent = `${ev.title} – ${ev.dueDate} ${ev.dueTime}`;
        box.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadReminders);