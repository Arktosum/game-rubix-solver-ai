export default class Matrix {
    num_rows: number;
    num_cols: number;
    data: number[][];
    constructor(num_rows: number, num_cols: number, randomize = true, fill = 0.0) {
        this.num_rows = num_rows;
        this.num_cols = num_cols;
        this.data = Array.from({ length: this.num_rows }, () => Array(this.num_cols).fill(fill));
        if (randomize) {
            this.apply((x, i, j) => Math.random());
        }
    }
    print() {
        console.log(`Shape : (${this.num_rows},${this.num_cols})`);
        console.table(this.data)
    }
    apply(callback: (x: number, row_index: number, col_index: number) => number) {
        for (let i = 0; i < this.num_rows; i++) {
            for (let j = 0; j < this.num_cols; j++) {
                this.data[i][j] = callback(this.data[i][j], i, j);
            }
        }
    }
    static isSameShape(A: Matrix, B: Matrix) {
        return (A.num_rows == B.num_rows) && (A.num_cols == B.num_cols)
    }
    add(other: Matrix) {
        /* Inplace operation  */
        if (!Matrix.isSameShape(this, other)) {
            throw new Error('Invalid shapes for Matrix Addition!');
        }
        let new_matrix = new Matrix(this.num_rows, this.num_cols)
        new_matrix.apply((x, i, j) => this.data[i][j] + other.data[i][j])
        return new_matrix;
    }
    addValue(value: number) {
        let new_matrix = new Matrix(this.num_rows, this.num_cols)
        new_matrix.apply((x, i, j) => this.data[i][j] + value);
        return new_matrix;
    }
    multiplyValue(value: number) {
        /* Inplace operation  */
        let new_matrix = new Matrix(this.num_rows, this.num_cols)
        new_matrix.apply((x, i, j) => this.data[i][j] * value);
        return new_matrix;
    }
    matmul(other: Matrix) {
        if (!Matrix.isMultipliable(this, other)) {
            throw new Error('Invalid shapes for Matrix Multiplication!');
        }
        let new_matrix = new Matrix(this.num_rows, other.num_cols);
        for (let i = 0; i < this.num_rows; i++) {
            for (let j = 0; j < other.num_cols; j++) {
                let SUM = 0;

                for (let k = 0; k < this.num_cols; k++) {
                    SUM += this.data[i][k] * other.data[k][j];
                }
                new_matrix.data[i][j] = SUM;
            }
        }
        return new_matrix;
    }
    static isMultipliable(A: Matrix, B: Matrix) {
        return (A.num_cols = B.num_rows);
    }
    copy() {
        let clone_matrix = new Matrix(this.num_rows, this.num_cols);
        clone_matrix.apply((x, i, j) => this.data[i][j]);
        return clone_matrix;
    }
    transpose() {
        let clone_matrix = new Matrix(this.num_cols, this.num_rows);
        clone_matrix.apply((x, i, j) => this.data[j][i]);
        return clone_matrix;
    }
    static fromArray(data: number[]) {
        let new_matrix = new Matrix(data.length, 1, false, 0);
        for (let i = 0; i < data.length; i++) {
            new_matrix.data[i][0] = data[i];
        }
        return new_matrix;
    }
};
