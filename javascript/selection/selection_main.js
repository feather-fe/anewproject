async function loadGimmicks() {
currentGimmicks = window.gimmicks;
const gimmickDisplay = document.getElementById("file-list");
for (const gimmick of currentGimmicks) {
    const nextGimmick = document.createElement("li");
    nextGimmick.innerHTML = `<img src="${gimmick.image}" alt="${gimmick.text1}">`;
    gimmickDisplay.appendChild(nextGimmick);
    
    const text1 = document.createElement("li");
    text1.innerHTML = `<p>${gimmick.text1}</p>`;
    gimmickDisplay.appendChild(text1);
    
    const text2 = document.createElement("li");
    text2.innerHTML = `<p>${gimmick.text2}</p>`;
    gimmickDisplay.appendChild(text2);
    
    const hr = document.createElement("li");
    hr.innerHTML = `<hr>`;
    gimmickDisplay.appendChild(hr);
}
alert("Gimmicks loaded" + currentGimmicks);
}
window.loadGimmicks = loadGimmicks;

