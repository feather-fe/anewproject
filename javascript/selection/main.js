document.addEventListener("DOMContentLoaded",() => {
    currentGimmicks = global.gimmicks.items;
    const gimmickDisplay = document.getElementById("file-list");
    const nextGimmick = document.createElement("li");
    for (const gimmick of currentGimmicks) {
        nextGimmick.innerHTML = currentGimmicks[gimmick];
    }
});
