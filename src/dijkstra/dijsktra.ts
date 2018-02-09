import { Algorithm } from "algo-comparer/dist";
import { Graph } from "dijkstra/graph-generator";

export class Dijkstra implements Algorithm {
    name: string = "Dijkstra's algorithm";
    problemName: string = "Minimal path in graph";
    metrics: { [key: string]: () => number; } = {
        nodeAccess: () => this.nodeAccessCount,
    }

    private nodeAccessCount: number = 0;

    log(message: string) {
        const logging = false;
        if (logging) {
            console.log(message);
        }
    }

    lowestCostNode(costs: { [key: string]: string }, processed: string[]) {
        return Object.keys(costs).reduce((lowest: string | null, node) => {
            if (lowest === null || costs[node] < costs[lowest]) {
                if (!processed.includes(node)) {
                    lowest = node;
                }
            }
            return lowest;
        }, null);
    };

    // function that returns the minimum cost and path to reach Finish
    dijkstra(graph: Graph, startNodeName: string, endNodeName: string) {

        // track the lowest cost to reach each node
        let costs: { [key: string]: string } = {};
        costs[endNodeName] = "Infinity";
        this.nodeAccessCount++;
        costs = Object.assign(costs, graph[startNodeName]);

        // track paths
        const parents: { [key: string]: any } = { endNodeName: null };
        for (let child in graph[startNodeName]) {
            parents[child] = startNodeName;
        }

        // track nodes that have already been processed
        const processed: string[] = [];

        let node = this.lowestCostNode(costs, processed);

        while (node) {
            let cost = costs[node];
            let children = graph[node];
            for (let n in children) {
                if (String(n) === String(startNodeName)) {
                    this.log("WE DON'T GO BACK TO START");
                } else {
                    this.log("StartNodeName: " + startNodeName);
                    this.log("Evaluating cost to node " + n + " (looking from node " + node + ")");
                    this.log("Last Cost: " + costs[n]);
                    let newCost = cost + children[n];
                    this.log("New Cost: " + newCost);
                    if (!costs[n] || costs[n] > newCost) {
                        costs[n] = newCost;
                        parents[n] = node;
                        this.log("Updated cost und parents");
                    } else {
                        this.log("A shorter path already exists");
                    }
                }
            }
            processed.push(node);
            node = this.lowestCostNode(costs, processed);
        }

        let optimalPath = [endNodeName];
        let parent = parents[endNodeName];
        while (parent) {
            optimalPath.push(parent);
            parent = parents[parent];
        }
        optimalPath.reverse();

        const results = {
            distance: costs[endNodeName],
            path: optimalPath
        };

        return results;
    };

    run(input: Graph) {
        //return dijkstra("")
    }

    reset(): void {
        this.nodeAccessCount = 0;
    }

}