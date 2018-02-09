import { Algorithm } from "algo-comparer/dist";
import { MatrixSize } from "matrices/defs";

export class DynamicLinearMatrixMultiplication implements Algorithm {
    name: string = "Dynamic implementation of chain matrix multiplication";
    problemName: string = "Linear matrix multiplication";
    metrics: { [key: string]: () => number; } = {
        multiplications: () => this.multiplications,
    }

    private multiplications: number = 0;

    getPermutations<T>(input: T[]): T[][] {
        if (input.length < 2)
            return [input];
    
        return [].concat(...input.map((char, index) => this.getPermutations([...input.slice(0, index), ...input.slice(index + 1)]).map(perm => [char].concat(perm))));
    
    }
    run(input: MatrixSize[]) {
        const dimensions = input.map(matrix => matrix.width);
        dimensions.push(input[input.length-1].height);
        const permutations = this.getPermutations(dimensions);
    }

    reset(): void {
        this.multiplications = 0;
    }

}