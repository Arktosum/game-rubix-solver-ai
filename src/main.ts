
import { Brain, Softmax } from './genetic';
import Matrix from './matrix';
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


const color_to_text: Record<Color, string> = {
    [Color.WHITE]: 'white',
    [Color.RED]: 'red',
    [Color.BLUE]: 'blue',
    [Color.GREEN]: 'green',
    [Color.ORANGE]: 'orange',
    [Color.YELLOW]: 'yellow',
}









function swap(face: number[], i: number, j: number) {
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
    [Orientation.TOP]: [2, 1, 0],
    [Orientation.BOTTOM]: [6, 7, 8],
    [Orientation.LEFT]: [0, 3, 6],
    [Orientation.RIGHT]: [8, 5, 2],
}
function swap3(cube: Color[][], from: [Color, Orientation], to: [Color, Orientation]) {
    let [from_color, from_orientation] = from;
    let [to_color, to_orientation] = to;
    let from_face = cube[from_color];
    let to_face = cube[to_color];

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




function display_cube(cube: Color[][]) {
    let row1 = document.createElement('div');
    let row2 = document.createElement('div');
    let row3 = document.createElement('div');

    row1.id = 'row-1'
    row2.id = 'row-2'
    row3.id = 'row-3'

    container.appendChild(row1)
    container.appendChild(row2)
    container.appendChild(row3)
    root.appendChild(container)


    let face = document.createElement('div');
    face.id = 'face'
    for (let j = 0; j < 9; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell')
        if (j == 4) {
            cell.innerText = '^'
        }
        cell.classList.add(color_to_text[cube[0][j]]);
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
            cell.classList.add(color_to_text[cube[i][j]]);
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
        cell.classList.add(color_to_text[cube[5][j]]);
        face.appendChild(cell)
    }
    row3.appendChild(face)
}






function random_choice<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}
const colors = [Color.WHITE, Color.BLUE, Color.GREEN, Color.YELLOW, Color.ORANGE, Color.YELLOW]
const directions = [true, false];









class Cube {
    cube: Color[][];
    constructor() {
        this.cube = [
            [Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN],
            [Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED],
            [Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW],
            [Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE],
            [Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE],
            [Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE],
        ]
    }
    compareSolved() {
        const solved_cube = [
            [Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN, Color.GREEN],
            [Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED, Color.RED],
            [Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW, Color.YELLOW],
            [Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE, Color.ORANGE],
            [Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE],
            [Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE, Color.BLUE],
        ]
        let grid_counts = 0;
        for (let i = 0; i < 6; i++) {
            let grid_count = 0;
            for (let j = 0; j < 9; j++) {
                grid_count += (solved_cube[i][j] == this.cube[i][j]) ? 1 : 0
            }
            grid_counts += (grid_count / 9);
        }
        return grid_counts / 6;

    }
    copy() {
        return this.cube.map(row => [...row]);
    }
    scramble(move_count: number) {
        let moves = [];
        for (let i = 0; i < move_count; i++) {
            const random_face = random_choice(colors);
            const random_direction = random_choice(directions);
            moves.push([color_to_text[random_face], random_direction ? 'clockwise' : 'counter-clockwise'])
            this.rotateFace(random_face, random_direction);
        }
        return moves;
    }
    flatten() {
        let flattened_cube: Color[] = [];
        for (let face of this.cube) {
            for (let cell of face) {
                flattened_cube.push(cell);
            }
        }
        return flattened_cube;
    }
    makeMove(index: number) {
        if (index == 12) {
            // Do nothing!
            return
        }
        const face_color = colors[Math.floor(index / 2)];
        const direction = directions[index % 2];
        // console.log(color_to_text[face_color], direction ? 'cw' : 'ccw');
        this.rotateFace(face_color, direction);
    }
    rotateFace(face_color: Color, clockwise: boolean) {
        let face = this.cube[face_color];
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

        order = [1, 2, 3];
        if (!clockwise) order.reverse()
        swap3(this.cube, adj_faces[0], adj_faces[order[0]]);
        swap3(this.cube, adj_faces[0], adj_faces[order[1]]);
        swap3(this.cube, adj_faces[0], adj_faces[order[2]]);
    }
}

let common_cube = new Cube();
common_cube.scramble(20);

let population_scores = []
for (let child of POPULATION) {
    let child_cube = new Cube();
    child_cube.cube = common_cube.copy();

    for (let i = 0; i < 100; i++) {
        // Try making 100 moves!
        const scrambled_cube_vector = Matrix.fromArray(child_cube.flatten());
        const probs = child.forward(scrambled_cube_vector);
        const move_index = Softmax.argmax(probs);
        child_cube.makeMove(move_index);
    }
    let fitness_score = child_cube.compareSolved();
    population_scores.push(fitness_score);
}

class Agent {

}

class GeneticAlgorithm {
    population_size: number;
    constructor(population_size: number, agent: Agent) {
        const POPULATION = [];
        this.population_size = population_size;
        for (let i = 0; i < this.population_size; i++) {
            POPULATION.push(new Agent());
        }
    }
}