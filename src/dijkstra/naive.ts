import { Algorithm } from "algo-comparer/dist";
import { Graph } from "dijkstra/graph-generator";

export class NaivePath implements Algorithm {
    name: string = "Naive implementation";
    problemName: string = "Minimal path in graph";
    metrics: { [key: string]: () => number; } = {
        nodeAccess: () => this.nodeAccessCount,
    }

    private nodeAccessCount: number = 0;
    
    run(input: Graph) {
        const maxPath = [];
        
        
    }

    reset(): void {
        this.nodeAccessCount = 0;
    }

}