// DREAMSPACE - MOOD TRACKER

const moodButtons = document.querySelectorAll(".mood-btn");
const moodMessage = document.getElementById("moodMessage");

const moodMessages = {
    Amazing: "Your universe is shining brightly today! ☀",
    Happy: "Keep that beautiful energy flowing! 💜",
    Calm: "Enjoy the peaceful moments. ☾",
    Okay: "It's okay to simply be where you are. ✨",
    Sad: "Remember, even stars need darkness to shine. 🌙"
};

// Mood selection
moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedMood = button.dataset.mood;

        const moods = JSON.parse(localStorage.getItem("moodEntries")) || [];

        const today = new Date().toLocaleDateString();

        // Check whether a mood was already saved today
        const existingIndex = moods.findIndex(
            entry => entry.date === today
        );

        if (existingIndex !== -1) {

            moods[existingIndex].mood = selectedMood;

        } else {

            moods.push({
                mood: selectedMood,
                date: today
            });

            let stars = Number(localStorage.getItem("dreamStars")) || 0;

            stars += 2;

            localStorage.setItem("dreamStars", stars);
        }

        localStorage.setItem("moodEntries", JSON.stringify(moods));

        moodButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        moodMessage.textContent = moodMessages[selectedMood];

        updateStats();

    });

});