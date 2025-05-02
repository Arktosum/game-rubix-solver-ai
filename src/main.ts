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
enum Direction {
    CLOCKWISE,
    ANTICLOCKWISE,
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


function swap(array: any[], i: number, j: number) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function makeMove(cube: Record<Color, Color[]>, faceColor: Color, direction: Direction) {
    let face = cube[faceColor];
    let swapOrder = [1, 2, 5, 8, 7, 6, 3];
    if (direction == Direction.ANTICLOCKWISE) swapOrder.reverse();
    for (let i = 0; i < 2; i++) {
        for (let index of swapOrder) {
            swap(face, 0, index);
        }
    }
}

let cube = createCube();
cube[Color.WHITE][0] = Color.RED;
cube[Color.WHITE][1] = Color.BLUE;
cube[Color.WHITE][2] = Color.GREEN;

cube[Color.WHITE][3] = Color.ORANGE;
cube[Color.WHITE][4] = Color.WHITE;
cube[Color.WHITE][5] = Color.YELLOW;

cube[Color.WHITE][6] = Color.GREEN;
cube[Color.WHITE][7] = Color.RED;
cube[Color.WHITE][8] = Color.BLUE;

displayCube(cube);

makeMove(cube, Color.WHITE, Direction.CLOCKWISE);

displayCube(cube);
