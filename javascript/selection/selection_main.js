async function loadGimmicks() {
currentGimmicks = window.gimmicks;
const gimmickDisplay = document.getElementById("file-list");
const nextGimmick = document.createElement("li");
for (const gimmick of currentGimmicks) {
    nextGimmick.innerHTML = `<img src="${gimmick.image}" alt="${gimmick.text1}">`;
    gimmickDisplay.appendChild(nextGimmick);
    nextGimmick.innerHTML = `<p>${gimmick.text1}</p>`;
    gimmickDisplay.appendChild(nextGimmick);
    nextGimmick.innerHTML = `<p>${gimmick.text2}</p>`;
    gimmickDisplay.appendChild(nextGimmick);
    nextGimmick.innerHTML = `<hr>`;
    gimmickDisplay.appendChild(nextGimmick);
}
}

window.loadGimmicks = loadGimmicks;

