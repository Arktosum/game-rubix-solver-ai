
import './style.css'
const root = document.querySelector('#root')!;

const container = document.createElement('div')

container.id = 'container';


enum Color {
    GREEN,
    RED,
    YELLOW,
    ORANGE,
    WHITE,
    BLUE,
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



function one_to_two(i) {
    return [Math.floor(i / 3), i % 3]
}

function two_to_one(i, j) {
    return 3 * i + j;
}



function swap(face, i, j) {
    let temp = face[j];
    face[j] = face[i];
    face[i] = temp;
}
function swap3(face1, face2) {
    let temp = [face2[0], face2[1], face2[2]];
    face2[0], face2[1], face2[2] = face1[0], face1[1], face1[2]
    face1[0], face1[1], face1[2] = temp;
}

const OPP_FACE_MAP = {
    [Color.WHITE]: [Color.ORANGE, Color.BLUE, Color.RED, Color.GREEN],
    [Color.RED]: [Color.WHITE, Color.BLUE, Color.YELLOW, Color.GREEN],
    [Color.BLUE]: [Color.WHITE, Color.ORANGE, Color.YELLOW, Color.RED],
    [Color.ORANGE]: [Color.WHITE, Color.GREEN, Color.YELLOW, Color.BLUE],
    [Color.GREEN]: [Color.WHITE, Color.RED, Color.YELLOW, Color.ORANGE],
    [Color.YELLOW]: [Color.RED, Color.BLUE, Color.ORANGE, Color.GREEN]
}
function rotateFace(face_index, clockwise = true) {
    let face = CUBE[face_index];
    // Rotate face!
    let order = [1, 2, 5, 8, 7, 6, 3];
    if (!clockwise) order.reverse()
    for (let i = 0; i < 2; i++) {
        for (let ord of order) {
            swap(face, 0, ord);
        }
    }
    let faces: number[] = OPP_FACE_MAP[face_index];

    let orange = CUBE[faces[0]]
    let blue = CUBE[faces[1]]
    let orange_three = [orange[0],orange[1],orange[2]];
    let blue_three = [blue[0],blue[1],blue[2]];
    console.log(orange_three.map((item)=>color_to_text[item]))
    console.log(blue_three.map((item)=>color_to_text[item]))

    blue[0],blue[1],blue[2] = orange[0],orange[1],orange[2]
    // Rotate sides 
}


rotateFace(Color.WHITE, true)

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


