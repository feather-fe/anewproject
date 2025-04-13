const grid = document.getElementById('reactor-grid');
const width = 100;
const height = 100;
const materials = ['uranium', 'graphite', 'boron', 'water', 'lead', 'steel', 'air'];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');


    const material = materials[Math.floor(Math.random() * materials.length)];
    tile.classList.add(material);
    grid.appendChild(tile);
  }
}
