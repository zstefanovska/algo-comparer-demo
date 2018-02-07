export interface Graph {
    [key: string]: { [key: string]: number };
}

/**
 * Determines whether the given graph is a valid representation
 * 
 * @export
 * @param {Graph} graph 
 * @returns 
 */
export function isValid(graph: Graph) {
    const nodes = Object.keys(graph);
    // get names of the nodes connected to the key nodes via edges;
    let edgeNodes = nodes.map(n => Object.keys(graph[n]))
        // flatten array
        .reduce((acc, item) => [...acc, ...item], []);
    // get distinct values;
    edgeNodes = Array.from(new Set(edgeNodes));
    // all edge nodes must be listed as nodes
    return edgeNodes.every(item => nodes.includes(item));
}

/**
 * Determines whether the given graph is connected, i.e. there is a path from any node to any node.
 * Uses a breadth-first search to determine the number of disconnected groups, and return true if the number of such groups is 1.
 * 
 * @export
 * @param {Graph} graph 
 */
export function isConnected(graph: Graph) {
    const groups = [];
    const nodes = Object.keys(graph);
    const edges = nodes.map(n1 => Object.keys(graph[n1]).map(n2 => [n1, n2])).reduce((acc, item) => [...acc, ...item], []);
    console.log(edges);
    if (nodes.length === 0)
        return true;

    groups.push(nodes[0]);




}

export function generateGraph() {

}

let g: Graph = { 
    a: { b: 3, c: 1 }, 
    b: { a: 2, c: 1 }, 
    c: { a: 4, b: 1 } 
};

console.log(isConnected(g));