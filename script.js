const main = document.querySelector('.main');
const buttonsampleNames = ['Kick', 'Snare', 'Hi-Hat', 'Tom'];
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