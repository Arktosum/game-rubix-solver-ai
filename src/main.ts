
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

enum Direction {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
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


enum Orientation {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
}

let ORIENTATION_MAP = {
    [Orientation.TOP]: [0, 1, 2],
    [Orientation.BOTTOM]: [6, 7, 8],
    [Orientation.LEFT]: [0, 3, 6],
    [Orientation.RIGHT]: [2, 5, 8],
}
function swap3(from: [Color, Orientation], to: [Color, Orientation]) {
    let [from_color, from_orientation] = from;
    let [to_color, to_orientation] = to;
    let from_face = CUBE[from_color];
    let to_face = CUBE[to_color];

    let from_indices = ORIENTATION_MAP[from_orientation];
    let to_indices = ORIENTATION_MAP[to_orientation];
    let temp = [to_face[to_indices[0]], to_face[to_indices[1]], to_face[to_indices[2]]];
    for (let i = 0; i < 3; i++) {
        to_face[to_indices[i]] = from_face[from_indices[i]];
        from_face[from_indices[i]] = temp[i];
    }
}



const ADJ_FACE_MAP: Record<Color, [Color, Orientation][]> = {
    [Color.WHITE]: [[Color.ORANGE, Orientation.TOP], [Color.BLUE, Orientation.TOP], [Color.RED, Orientation.TOP], [Color.GREEN, Orientation.TOP]],
    [Color.RED]: [[Color.WHITE, Orientation.BOTTOM], [Color.BLUE, Orientation.LEFT], [Color.YELLOW, Orientation.TOP], [Color.GREEN, Orientation.RIGHT]],
    [Color.BLUE]: [[Color.WHITE, Orientation.RIGHT], [Color.ORANGE, Orientation.LEFT], [Color.YELLOW, Orientation.RIGHT], [Color.RED, Orientation.RIGHT]],
    [Color.ORANGE]: [[Color.WHITE, Orientation.TOP], [Color.GREEN, Orientation.LEFT], [Color.YELLOW, Orientation.BOTTOM], [Color.BLUE, Orientation.RIGHT]],
    [Color.GREEN]: [[Color.WHITE, Orientation.LEFT], [Color.RED, Orientation.LEFT], [Color.YELLOW, Orientation.LEFT], [Color.ORANGE, Orientation.RIGHT]],
    [Color.YELLOW]: [[Color.RED, Orientation.BOTTOM], [Color.BLUE, Orientation.BOTTOM], [Color.ORANGE, Orientation.BOTTOM], [Color.GREEN, Orientation.BOTTOM]]
}

function rotateFace(face_color: Color, clockwise: boolean) {
    let face = CUBE[face_color];
    // Rotate face!
    let order = [1, 2, 5, 8, 7, 6, 3];
    if (!clockwise) order.reverse()
    for (let i = 0; i < 2; i++) {
        for (let ord of order) {
            swap(face, 0, ord);
        }
    }
    // Rotate sides 

    let adj_faces = ADJ_FACE_MAP[face_color];
    swap3(adj_faces[0], adj_faces[1]);
    swap3(adj_faces[0], adj_faces[2]);
    swap3(adj_faces[0], adj_faces[3]);

}

rotateFace(Color.WHITE, true);
let face_color = Color.BLUE;
{
    let face = CUBE[face_color];
    // Rotate face!
    let order = [1, 2, 5, 8, 7, 6, 3];
    for (let i = 0; i < 2; i++) {
        for (let ord of order) {
            swap(face, 0, ord);
        }
    }
    // Rotate sides 

    let adj_faces = ADJ_FACE_MAP[face_color];
    swap3(adj_faces[0], adj_faces[1]);
    // swap3(adj_faces[0], adj_faces[2]);
    // swap3(adj_faces[0], adj_faces[3]);
}

let face = document.createElement('div');
face.id = 'face'
for (let j = 0; j < 9; j++) {
    let cell = document.createElement('div');
    cell.classList.add('cell')
    if (j == 4) {
        cell.innerText = '^'
    }
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
        if (j == 4) {
            cell.innerText = '^'
        }
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
    if (j == 4) {
        cell.innerText = '^'
    }
    cell.classList.add(color_to_text[CUBE[5][j]]);
    face.appendChild(cell)
}
row3.appendChild(face)


