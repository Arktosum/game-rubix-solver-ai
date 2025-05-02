import './style.css'
const root = document.getElementById('root')!;

enum Color {
    ORANGE,
    GREEN,
    WHITE,
    BLUE,
    YELLOW,
    RED
}
enum Rotation {
    CLOCKWISE,
    ANTICLOCKWISE,
}

enum Direction {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
}

function createCube() {
    const cube: Record<Color, Color[]> = {
        [Color.ORANGE]: new Array<Color>(9).fill(Color.ORANGE),
        [Color.GREEN]: new Array<Color>(9).fill(Color.GREEN),
        [Color.WHITE]: new Array<Color>(9).fill(Color.WHITE),
        [Color.BLUE]: new Array<Color>(9).fill(Color.BLUE),
        [Color.YELLOW]: new Array<Color>(9).fill(Color.YELLOW),
        [Color.RED]: new Array<Color>(9).fill(Color.RED),
    }
    return cube;
}


const COLOR_TO_STRING = {
    [Color.ORANGE]: 'orange',
    [Color.GREEN]: 'green',
    [Color.WHITE]: 'white',
    [Color.BLUE]: 'blue',
    [Color.YELLOW]: 'yellow',
    [Color.RED]: 'red',
}

// TOP, RIGHT, BOTTOM, LEFT
const ADJACENT_MAP: Record<Color, [Color, Direction][]> = {
    [Color.ORANGE]: [[Color.WHITE, Direction.TOP], [Color.GREEN, Direction.LEFT], [Color.YELLOW, Direction.BOTTOM], [Color.BLUE, Direction.RIGHT]],
    [Color.GREEN]: [[Color.WHITE, Direction.LEFT], [Color.RED, Direction.LEFT], [Color.YELLOW, Direction.LEFT], [Color.ORANGE, Direction.RIGHT]],
    [Color.WHITE]: [[Color.ORANGE, Direction.TOP], [Color.BLUE, Direction.TOP], [Color.RED, Direction.TOP], [Color.GREEN, Direction.TOP]],
    [Color.BLUE]: [[Color.WHITE, Direction.RIGHT], [Color.ORANGE, Direction.LEFT], [Color.YELLOW, Direction.TOP], [Color.RED, Direction.RIGHT]],
    [Color.YELLOW]: [[Color.RED, Direction.BOTTOM], [Color.BLUE, Direction.BOTTOM], [Color.ORANGE, Direction.BOTTOM], [Color.GREEN, Direction.BOTTOM]],
    [Color.RED]: [[Color.WHITE, Direction.BOTTOM], [Color.BLUE, Direction.LEFT], [Color.YELLOW, Direction.TOP], [Color.GREEN, Direction.RIGHT]],
}

const DIRECTION_MAP = {
    [Direction.TOP]: [0, 1, 2],
    [Direction.RIGHT]: [2, 5, 8],
    [Direction.BOTTOM]: [6, 7, 8],
    [Direction.LEFT]: [0, 3, 6]
}

function createFace(cube: Record<Color, Color[]>, color: Color) {
    const face = document.createElement('div');
    face.classList.add('face');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        let cellColor = cube[color][i];
        cell.classList.add(COLOR_TO_STRING[cellColor]);
        face.appendChild(cell);
    }
    return face;
}

function displayCube(cube: Record<Color, Color[]>) {

    const cubeContainer = document.createElement('div');

    const row1 = document.createElement('div');
    const row2 = document.createElement('div');
    const row3 = document.createElement('div');

    row1.classList.add('flex');
    row2.classList.add('flex');
    row3.classList.add('flex');

    const redFace = createFace(cube, Color.RED);
    const blueFace = createFace(cube, Color.BLUE);
    const greenFace = createFace(cube, Color.GREEN);
    const whiteFace = createFace(cube, Color.WHITE);
    const yellowFace = createFace(cube, Color.YELLOW);
    const orangeFace = createFace(cube, Color.ORANGE);

    row1.appendChild(orangeFace);

    orangeFace.style.marginLeft = '305px'
    redFace.style.marginLeft = '305px'
    row2.appendChild(greenFace);
    row2.appendChild(whiteFace);
    row2.appendChild(blueFace);
    row2.appendChild(yellowFace);

    row3.appendChild(redFace);

    cubeContainer.appendChild(row1);
    cubeContainer.appendChild(row2);
    cubeContainer.appendChild(row3);
    cubeContainer.style.margin = '50px';
    root.appendChild(cubeContainer);
}


function swap(array1: any[], array2: any[], i: number, j: number) {
    let temp = array1[i];
    array1[i] = array2[j];
    array2[j] = temp;
}

function swap3(fromFace: Color[], toFace: Color[], fromIndices: number[], toIndices: number[]) {
    swap(fromFace, toFace, fromIndices[0], toIndices[2]);
    swap(fromFace, toFace, fromIndices[1], toIndices[1]);
    swap(fromFace, toFace, fromIndices[2], toIndices[0]);
}

function makeMove(cube: Record<Color, Color[]>, faceColor: Color, rotation: Rotation) {
    let face = cube[faceColor];
    // Rotate the face
    let swapOrder = [1, 2, 5, 8, 7, 6, 3];
    if (rotation == Rotation.ANTICLOCKWISE) swapOrder.reverse();
    for (let i = 0; i < 2; i++) {
        for (let index of swapOrder) {
            swap(face, face, 0, index);
        }
    }

    let adjacent_faces = ADJACENT_MAP[faceColor];

    let [top_face_color, top_direction] = adjacent_faces[0];
    let [left_face_color, left_direction] = adjacent_faces[1];
    let [bottom_face_color, bottom_direction] = adjacent_faces[2];
    let [right_face_color, right_direction] = adjacent_faces[3];

    let top_indices = DIRECTION_MAP[top_direction];
    let left_indices = DIRECTION_MAP[left_direction];
    let bottom_indices = DIRECTION_MAP[bottom_direction];
    let right_indices = DIRECTION_MAP[right_direction];

    let top_face = cube[top_face_color];
    let left_face = cube[left_face_color];
    let bottom_face = cube[bottom_face_color];
    let right_face = cube[right_face_color];

    swap3(top_face, left_face, top_indices, left_indices)
}

let cube = createCube();


displayCube(cube);

makeMove(cube, Color.WHITE, Rotation.CLOCKWISE);

displayCube(cube);
