// DREAMSPACE - DREAM JOURNAL

const journalInput = document.getElementById("journalInput");
const saveJournalButton = document.getElementById("saveJournal");

saveJournalButton.addEventListener("click", () => {

    const text = journalInput.value.trim();

    if (text === "") {
        alert("Write something before saving your thoughts!");
        return;
    }

    const entries = JSON.parse(localStorage.getItem("dreamEntries")) || [];

    const newEntry = {
        id: Date.now(),
        content: text,
        date: new Date().toLocaleString()
    };

    entries.unshift(newEntry);

    localStorage.setItem("dreamEntries", JSON.stringify(entries));

    let stars = Number(localStorage.getItem("dreamStars")) || 0;

    stars += 5;

    localStorage.setItem("dreamStars", stars);

    journalInput.value = "";

    alert("Your thoughts have been saved! You earned 5 stars!");

    updateStats();

});