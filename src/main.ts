
import './style.css'
const root = document.querySelector('#root');

const container = document.createElement('div')

container.id = 'container';


enum Color {
    WHITE,
    RED,
    BLUE,
    GREEN,
    ORANGE,
    YELLOW,
}


const color_to_text = {
    [Color.WHITE]: 'white',
    [Color.RED]: 'red',
    [Color.BLUE]: 'blue',
    [Color.GREEN]: 'green',
    [Color.ORANGE]: 'orange',
    [Color.YELLOW]: 'yellow',
}
let CUBE = [
    [Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN],
    [Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED],
    [Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW],
    [Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE],
    [Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE],
    [Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE],

];

let row1 = document.createElement('div');
let row2 = document.createElement('div');
let row3 = document.createElement('div');

row1.id = 'row-1'
row2.id = 'row-2'
row3.id = 'row-3'
container.appendChild(row1)
container.appendChild(row2)
container.appendChild(row3)
root?.appendChild(container)


let face = document.createElement('div');
face.id = 'face'
for (let j = 0; j < 9; j++) {
    let cell = document.createElement('div');
    cell.classList.add('cell')
    cell.classList.add(color_to_text[CUBE[0][j]]);
    face.appendChild(cell)
}
row1.appendChild(face)


for (let i = 1; i <= 4; i++) {
    let face = document.createElement('div');
    face.id = 'face'
    for (let j = 0; j < 9; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell')
        cell.classList.add(color_to_text[CUBE[i][j]]);
        face.appendChild(cell)
    }
    row2.appendChild(face)
}


face = document.createElement('div');
face.id = 'face'
for (let j = 0; j < 9; j++) {
    let cell = document.createElement('div');
    cell.classList.add('cell')
    cell.classList.add(color_to_text[CUBE[5][j]]);
    face.appendChild(cell)
}
row3.appendChild(face)