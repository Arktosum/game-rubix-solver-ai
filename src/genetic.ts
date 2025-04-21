

/* 
Population
Selection
Crossover
Mutation*
*/

import Matrix from "./matrix"


class Layer {
    forward(x: Matrix) { return x }
}

class Dense implements Layer {
    weights: Matrix;
    constructor(n_inputs: number, n_outputs: number) {
        this.weights = new Matrix(n_outputs, n_inputs);
    }
    forward(x: Matrix) {
        return this.weights.matmul(x);
    }
}

class ReLU implements Layer {
    relu(x: number) {
        return Math.max(0, x);
    }
    forward(x: Matrix) {
        let output = x.copy()
        output.apply((value, i, j) => this.relu(value));
        return output;
    }
}


export class Brain {
    layers: Layer[];
    constructor() {
        this.layers = [
            new Dense(4, 10),
            new ReLU(),
            new Dense(10, 10),
            new ReLU(),
            new Dense(10, 2)
        ]
    }
    forward(x: Matrix) {
        let output = x;
        for (let layer of this.layers) {
            output = layer.forward(output);
        }
        return output;
    }
}






