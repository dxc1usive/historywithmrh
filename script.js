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