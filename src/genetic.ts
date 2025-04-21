

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
        output.apply((value) => this.relu(value));
        return output;
    }
}


export class Softmax implements Layer {

    // Compute the softmax of a column vector matrix
    softmax(x: Matrix): Matrix {
        if (x.numCols !== 1) {
            throw new Error('Softmax can only be applied to column vectors');
        }
        const maxVal = x.max();
        const expMatrix = new Matrix(x.numRows, 1, false);
        expMatrix.apply((_, i) => Math.exp(x.data[i][0] - maxVal));
        const sumExp = expMatrix.sum();
        return expMatrix.divideValue(sumExp);
    }
    forward(x: Matrix) {
        return this.softmax(x);
    }
    // Return the index of the maximum value in a column vector
    static argmax(x: Matrix): number {
        if (x.numCols !== 1) {
            throw new Error('Argmax can only be applied to column vectors');
        }
        let maxIndex = 0;
        let maxValue = x.data[0][0];
        for (let i = 1; i < x.numRows; i++) {
            if (x.data[i][0] > maxValue) {
                maxValue = x.data[i][0];
                maxIndex = i;
            }
        }
        return maxIndex;
    }
}


export class Brain {
    layers: Layer[];
    constructor() {
        this.layers = [
            new Dense(6 * 9, 10),
            new ReLU(),
            new Dense(10, 10),
            new ReLU(),
            new Dense(10, (6 * 2) + 1), // 6 colors and 2 orientations + 1 no move state
            new Softmax()
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






