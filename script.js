const sounds = document.querySelectorAll("audio");
const main = document.querySelector('.main');
const buttonsampleNames = ['Cymbal', 'Hi-Hat', 'Kick Drum', 'Snare Drum'];
for (let i = 0; i < 4; i++) {
    const rowName = document.createElement('div');
    rowName.classList.add('row-name');
    rowName.textContent = buttonsampleNames[i];
    rowName.style.gridColumn = 1;
    rowName.style.gridRow = i + 1;
    main.appendChild(rowName);
    for (let j = 0; j < 16; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.gridColumn = j + 2;
        cell.style.gridRow = i + 1;
        cell.onclick = (e) => {
            e.target.classList.toggle('active');
        }
        main.appendChild(cell);
    }
}
// since column 1 is reserved for row names, we start the counter at 2
let counter = 2;
setInterval(() => {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.style.gridColumn == counter) {
            cell.classList.add('active-column');
            if (cell.classList.contains('active')) {
                const soundIndex = Math.floor(i / 16);
                sounds[soundIndex].currentTime = 0;
                sounds[soundIndex].play();
            }
        } else {
            cell.classList.remove('active-column');
        }
    }
    counter++;
    if (counter > 17) {
        counter = 2;
    }
}, 125);