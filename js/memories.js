
// DREAMSPACE - MEMORY LANE

const memoryTimeline = document.getElementById("memoryTimeline");
const emptyMemories = document.getElementById("emptyMemories");


// DISPLAY SAVED MEMORIES
function displayMemories() {

    const entries = JSON.parse(
        localStorage.getItem("dreamEntries")
    ) || [];

    memoryTimeline.innerHTML = "";

    // Check whether memories exist
    if (entries.length === 0) {

        emptyMemories.style.display = "block";

        return;
    }

    emptyMemories.style.display = "none";


    // Create a card for each memory
    entries.forEach(entry => {

        const card = document.createElement("article");

        card.className = "memory-card";


        // Memory date
        const date = document.createElement("div");

        date.className = "memory-date";

        date.textContent = entry.date || "Date unavailable";


        // Memory content
        const content = document.createElement("p");

        content.className = "memory-content";

        content.textContent = entry.content;


        // Action buttons
        const actions = document.createElement("div");

        actions.className = "memory-actions";


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-memory-btn";

        deleteButton.type = "button";

        deleteButton.textContent = "Delete memory";


        deleteButton.addEventListener("click", () => {

            const confirmed = confirm(
                "Are you sure you want to delete this memory?"
            );

            if (!confirmed) return;


            const updatedEntries = (
                JSON.parse(localStorage.getItem("dreamEntries")) || []
            ).filter(item => item.id !== entry.id);


            localStorage.setItem(
                "dreamEntries",
                JSON.stringify(updatedEntries)
            );


            // Refresh Memory Lane
            displayMemories();


            // Update dashboard statistics
            if (typeof updateStats === "function") {

                updateStats();

            }

        });


        // Build memory card
        actions.appendChild(deleteButton);

        card.appendChild(date);

        card.appendChild(content);

        card.appendChild(actions);

        memoryTimeline.appendChild(card);

    });

}


// Display memories when the page loads
displayMemories();


// Listen for newly saved journal entries
window.addEventListener("journalUpdated", displayMemories);
