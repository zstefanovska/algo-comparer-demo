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
    let groups: string[] = [];
    const nodes = Object.keys(graph);
    let edges = nodes.map(n1 => Object.keys(graph[n1]).map(n2 => [n1, n2])).reduce((acc, item) => [...acc, ...item], []);
    if (nodes.length === 0)
        return true;

    groups.push(nodes[0]);
    let index = 0;
    while (true) {
        const node = groups[index];
        const nodeEdges = edges.filter(edge => edge[0] === node);
        edges = edges.filter(edge => edge[0] !== node);
        if (nodeEdges.length === 0) {
            return (edges.length === 0);
        }
        for (let index = 0; index < nodeEdges.length; index++) {
            const nodeEdge = nodeEdges[index][1];
            if (!groups.includes(nodeEdge)) {
                groups.push(nodeEdge)
            }
        }

        index += 1;
    }
}

export function generateGraph(size: number) {
    const graph: Graph = {};
    const nodeNames = Array(size).fill(null).map((_, i) => String.fromCharCode(i + 97));
    nodeNames.forEach(node => {
        graph[node] = {}
        const connections = Math.ceil(Math.random() * (size - 1));
        const forbidden = [node];
        for (let index = 0; index < connections; index++) {
            let edgeNode = node;
            while (forbidden.includes(edgeNode)) {
                edgeNode = nodeNames[Math.floor(Math.random() * size)];
            }
            let weigth = Math.ceil(Math.random() * 100);
            graph[node][edgeNode] = weigth;
        }
    });
    return graph;
}

export function generateConnectedGraph(size: number) {
    let graph = generateGraph(size);
    while (!isConnected(graph)) {
        graph = generateGraph(size);
    }
    return graph;
}