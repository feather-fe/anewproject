async function loadGimmicks() {
currentGimmicks = window.gimmicks;
const gimmickDisplay = document.getElementById("file-list");
const nextGimmick = document.createElement("li");
for (const gimmick of currentGimmicks) {
	// Add your logic here
}
}

window.loadGimmicks = loadGimmicks;

