const sounds = document.querySelectorAll("audio");
const main = document.querySelector('.main');
const buttonsampleNames = ['Cymbal', 'Hi-Hat', 'Kick Drum', 'Snare Drum'];
for (let i = 0; i < 4; i++) {
    const rowName = document.createElement('div');
    rowName.classList.add('row-name');
    rowName.innerHTML = "<p>" + buttonsampleNames[i] + "</p>";
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
const cells = document.querySelectorAll('.cell');

const cursorPos = {
    row: 0,
    col: 0
}

function setCursor() {
    const index = cursorPos.row * 16 + cursorPos.col;
    cells[index].classList.add('cursor');
}

function unsetCursor() {
    const index = cursorPos.row * 16 + cursorPos.col;
    cells[index].classList.remove('cursor');
}

setCursor();

let intervalID;

document.onkeydown = (e) => {
    if (e.key === ' ') {
        if (intervalID) {
            clearInterval(intervalID);
            intervalID = null;
            return;
        }
        e.preventDefault();
        let counter = 2;
        intervalID = setInterval(() => {
    
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
    }
    else if (e.key === 'ArrowRight' || e.key === 'd') {
        unsetCursor();
        cursorPos.col = (cursorPos.col + 1) % 16;
        setCursor();
    }
    else if (e.key === 'ArrowLeft' || e.key === 'a') {
        unsetCursor();
        cursorPos.col = (cursorPos.col - 1 + 16) % 16;
        setCursor();
    }
    else if (e.key === 'ArrowDown' || e.key === 's') {
        unsetCursor();
        cursorPos.row = (cursorPos.row + 1) % 4;
        setCursor();
    }
    else if (e.key === 'ArrowUp' || e.key === 'w') {
        unsetCursor();
        cursorPos.row = (cursorPos.row - 1 + 4) % 4;
        setCursor();
    }
    else if (e.key === 'z') {
        const index = cursorPos.row * 16 + cursorPos.col;
        cells[index].classList.toggle('active');
    }
}

// since column 1 is reserved for row names, we start the counter at 2
