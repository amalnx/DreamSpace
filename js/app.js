
// DREAMSPACE - MAIN APPLICATION


// ==============================
// DISPLAY CURRENT DATE
// ==============================

const dateElement = document.getElementById("currentDate");

const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});


// ==============================
// DAILY INSPIRATIONAL QUOTES
// ==============================

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

const quoteElement = document.getElementById("dailyQuote");
const quoteButton = document.getElementById("newQuote");

quoteButton.addEventListener("click", () => {

    let randomQuote;

    do {
        randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote === quoteElement.textContent);

    quoteElement.textContent = randomQuote;

});


// ==============================
// PERSONAL GALAXY
// ==============================

function updateGalaxy() {

    const stars = Number(localStorage.getItem("dreamStars")) || 0;

    const galaxy = document.getElementById("personalGalaxy");
    const galaxyMessage = document.getElementById("galaxyMessage");
    const galaxyProgress = document.getElementById("galaxyProgress");
    const galaxyStarCount = document.getElementById("galaxyStarCount");

    // Update star count
    galaxyStarCount.textContent = stars;


    // Remove previously generated stars
    galaxy.querySelectorAll(".galaxy-star").forEach(star => star.remove());


    // Create glowing stars
    for (let i = 0; i < stars; i++) {

        const star = document.createElement("span");

        star.classList.add("galaxy-star");

        const size = Math.random() * 4 + 2;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random() * 96 + "%";
        star.style.top = Math.random() * 90 + "%";

        star.style.animationDelay = Math.random() * 2 + "s";

        galaxy.appendChild(star);
    }


    // ==============================
    // PLANET UNLOCKING SYSTEM
    // ==============================

    const planets = [
        {
            id: "moon",
            required: 20
        },
        {
            id: "purplePlanet",
            required: 50
        },
        {
            id: "goldenPlanet",
            required: 100
        }
    ];

    planets.forEach(planetData => {

        const planet = document.getElementById(planetData.id);

        if (!planet) return;

        const status = planet.querySelector(".planet-status");

        if (!status) return;

        if (stars >= planetData.required) {

            planet.classList.remove("locked");
            planet.classList.add("unlocked");

            status.textContent = "Unlocked ✦";

        } else {

            planet.classList.remove("unlocked");
            planet.classList.add("locked");

            status.textContent = `Unlock at ${planetData.required} stars`;
        }

    });


    // ==============================
    // GALAXY MESSAGES & MILESTONES
    // ==============================

    if (stars === 0) {

        galaxyMessage.textContent = "✦ Your universe is waiting to shine ✦";

        galaxyProgress.textContent =
            "Start collecting stars to grow your galaxy!";

    } else if (stars < 20) {

        galaxyMessage.textContent =
            "✨ Your little universe is beginning to shine!";

        galaxyProgress.textContent =
            "Reach 20 stars to unlock the Moon!";

    } else if (stars < 50) {

        galaxyMessage.textContent =
            "☾ Your galaxy is getting brighter!";

        galaxyProgress.textContent =
            "Reach 50 stars to unlock the Dream Planet!";

    } else if (stars < 100) {

        galaxyMessage.textContent =
            "✦ Your universe is full of possibilities!";

        galaxyProgress.textContent =
            "Reach 100 stars to unlock the Golden Planet!";

    } else {

        galaxyMessage.textContent =
            "🌌 Welcome to your beautiful universe!";

        galaxyProgress.textContent =
            "You've unlocked all three planets!";

    }
}


// ==============================
// UPDATE DASHBOARD STATISTICS
// ==============================

function updateStats() {

    const entries =
        JSON.parse(localStorage.getItem("dreamEntries")) || [];

    const moods =
        JSON.parse(localStorage.getItem("moodEntries")) || [];

    const stars =
        Number(localStorage.getItem("dreamStars")) || 0;


    // Update dashboard cards
    document.getElementById("starCount").textContent = stars;

    document.getElementById("entryCount").textContent =
        entries.length;

    document.getElementById("moodCount").textContent =
        moods.length;


    // Update Personal Galaxy
    updateGalaxy();
}


// ==============================
// LOAD DASHBOARD DATA
// ==============================

updateStats();
