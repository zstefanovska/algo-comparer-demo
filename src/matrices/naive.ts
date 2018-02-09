import { Algorithm } from "algo-comparer/dist";
import { MatrixSize } from "matrices/defs";

export class NaiveLinearMatrixMultiplication implements Algorithm {
    name: string = "Naive implementation of linear matrix multiplication";
    problemName: string = "Linear matrix multiplication";
    metrics: { [key: string]: () => number; } = {
        multiplications: () => this.multiplications,
    }

    private multiplications: number = 0;

    generatePermutations(size) {

    }

    run(input: MatrixSize[]) {
        const permutations = generatePermutations(input.length - 1);
    }

    reset(): void {
        this.multiplications = 0;
    }

}