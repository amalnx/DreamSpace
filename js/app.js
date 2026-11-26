// DREAMSPACE - MAIN APPLICATION

// Display current date
const dateElement = document.getElementById("currentDate");

const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});

// Daily inspirational quotes
const quotes = [
    "Even the darkest night gives way to a sky full of stars.",
    "You are allowed to grow at your own pace.",
    "Somewhere in the universe, beautiful things are waiting for you.",
    "Your dreams deserve a place in your reality.",
    "Small steps can take you to extraordinary places.",
    "Be gentle with yourself. You are still becoming.",
    "The universe is full of possibilities.",
    "You are made of stardust and endless possibilities."
];

// Display random quote
const quoteElement = document.getElementById("dailyQuote");
const quoteButton = document.getElementById("newQuote");

quoteButton.addEventListener("click", () => {

    let randomQuote;

    do {
        randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote === quoteElement.textContent);

    quoteElement.textContent = randomQuote;

});

// Update dashboard statistics
function updateStats() {

    const entries = JSON.parse(localStorage.getItem("dreamEntries")) || [];
    const moods = JSON.parse(localStorage.getItem("moodEntries")) || [];

    const stars = Number(localStorage.getItem("dreamStars")) || 0;

    document.getElementById("starCount").textContent = stars;
    document.getElementById("entryCount").textContent = entries.length;
    document.getElementById("moodCount").textContent = moods.length;

}

// Load dashboard data
updateStats();