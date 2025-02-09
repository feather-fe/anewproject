let selectedGimmicks = [];

export function startFileManager(callback) {
    const terminalContainer = document.getElementById("terminal-container");
    const fileManager = document.getElementById("file-manager");
    const fileList = document.getElementById("file-list");
    const fileItems = fileList.getElementsByClassName("file-item");
    let currentSelection = 0;

    selectedGimmicks = []; // Reset selections

    // Hide terminal, show file manager
    terminalContainer.style.display = "none";
    fileManager.style.display = "block";

    // Remove previous keydown event listener if any
    document.removeEventListener("keydown", keyHandler);

    function updateSelection() {
        for (let i = 0; i < fileItems.length; i++) {
            fileItems[i].classList.remove("selected");
        }
        if (fileItems[currentSelection]) {
            fileItems[currentSelection].classList.add("selected");
        }
    }
    function keyHandler(e) {

    // Handle navigation
    document.addEventListener("keydown", function keyHandler(e) {
        if (fileManager.style.display !== "block") return;

        if (e.key === "ArrowDown") {
            currentSelection = (currentSelection + 1) % fileItems.length;
            updateSelection();
        } else if (e.key === "ArrowUp") {
            currentSelection = (currentSelection - 1 + fileItems.length) % fileItems.length;
            updateSelection();
        } else if (e.key === "Enter") {
            const selected = fileItems[currentSelection].dataset.gimmick;
            if (!selectedGimmicks.includes(selected)) {
                selectedGimmicks.push(selected);
            }
            console.log("Selected Gimmicks:", selectedGimmicks);

            if (selectedGimmicks.length >= 5) {
                document.removeEventListener("keydown", keyHandler);
                fileManager.style.display = "none";
                terminalContainer.style.display = "block";
    }

    document.addEventListener("keydown", keyHandler);
            }
        }
    });
}

export function getSelectedGimmicks() {
    return selectedGimmicks;
}
