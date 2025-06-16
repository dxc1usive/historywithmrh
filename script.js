const quotes = [
    "History is written by the victors. — Winston Churchill",
    "Those who do not learn history are doomed to repeat it. — George Santayana",
    "History will be kind to me for I intend to write it. — Winston Churchill",
    "The more you know about the past, the better prepared you are for the future. — Theodore Roosevelt",
    "We are not makers of history. We are made by history. — Martin Luther King Jr."
];

function setDailyQuote() {
    const today = new Date().getDate();
    const quote = quotes[today % quotes.length];
    document.getElementById("dailyQuote").innerText = quote;
}

document.addEventListener("DOMContentLoaded", setDailyQuote);

async function checkSession() {
    try {
        const response = await fetch('/session');
        const data = await response.json();
        const link = document.getElementById('loginLink');
        const messageEl = document.getElementById('loginMessage');
        if (data.loggedIn) {
            if (link) {
                link.textContent = 'Logout';
                link.href = '/logout';
            }
            if (messageEl) messageEl.textContent = '';
        } else {
            if (link) {
                link.textContent = 'Login';
                link.href = '/login';
            }
            if (messageEl) messageEl.textContent = "This is for Hizzy's students only";
        }
    } catch (e) {
        console.error('Session check failed', e);
    }
}

document.addEventListener('DOMContentLoaded', checkSession);
