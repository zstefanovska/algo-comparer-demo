import { AlgorithmComparer, Algorithm, ProblemOptions } from "algo-comparer/dist";

let options: ProblemOptions = {
    name: "Sorting",
    metricNames: ["comparisons", "swaps"],
    inputs: (index) => Array(index).fill(null).map((_, index) => index),
    inputLength: 100
}

let comparer = new AlgorithmComparer(options);

let bubbleSort: Algorithm = (() => {
    let comparisons = 0;
    let swaps = 0;

    /**
 * Swaps two values in the heap
 *
 * @param {int} findex Index of the first item to be swapped
 * @param {int} sindex Index of the second item to be swapped
 */
    function swap(array: number[], findex: number, sindex: number) {
        swaps++;
        var temp = array[findex];
        array[findex] = array[sindex];
        array[sindex] = temp;
    }

    function sort(items: number[]) {
        var length = items.length;
        for (var i = (length - 1); i >= 0; i--) {
            //Number of passes
            for (var j = (length - i); j > 0; j--) {
                //Compare the adjacent positions
                comparisons++;
                if (items[j] < items[j - 1]) {
                    //Swap the numbers
                    swap(items, j, j - 1);
                    swaps++;
                    var tmp = items[j];
                    items[j] = items[j - 1];
                    items[j - 1] = tmp;
                }
            }
        }
    }

    return {
        name: "Bubble sort",
        problemName: "Sorting",
        metrics: {
            comparisons: () => comparisons,
            swaps: () => swaps
        },
        reset: () => { },
        run: sort
    }
})();

let quicksort: Algorithm = (() => {
    let comparisons = 0;
    let swaps = 0;

    /**
     * Swaps two values in the heap
     *
     * @param {int} findex Index of the first item to be swapped
     * @param {int} sindex Index of the second item to be swapped
     */
    function swap(array: number[], findex: number, sindex: number) {
        swaps++;
        var temp = array[findex];
        array[findex] = array[sindex];
        array[sindex] = temp;
    }

    /**
     * Partitions the (sub)array into values less than and greater
     * than the pivot value
     *
     * @param {Array} array The target array
     * @param {int} pivot The index of the pivot
     * @param {int} left The index of the leftmost element
     * @param {int} left The index of the rightmost element
     */
    function partition(array: number[], pivot: number, left: number, right: number) {

        var storeIndex = left, pivotValue = array[pivot];

        // put the pivot on the right
        swap(array, pivot, right);

        // go through the rest
        for (var v = left; v < right; v++) {
            comparisons++;
            // if the value is less than the pivot's
            // value put it to the left of the pivot
            // point and move the pivot point along one
            if (array[v] < pivotValue) {
                swap(array, v, storeIndex);
                storeIndex++;
            }
        }

        // finally put the pivot in the correct place
        swap(array, right, storeIndex);

        return storeIndex;
    }

    /**
     * Sorts the (sub-)array
     *
     * @param {Array} array The target array
     * @param {int} left The index of the leftmost element, defaults 0
     * @param {int} left The index of the rightmost element,
     defaults array.length-1
     */
    function sort(array: number[], left?: number, right?: number) {

        var pivot = null;

        if (typeof left !== 'number') {
            left = 0;
        }

        if (typeof right !== 'number') {
            right = array.length - 1;
        }

        // effectively set our base
        // case here. When left == right
        // we'll stop
        if (left < right) {

            // pick a pivot between left and right
            // and update it once we've partitioned
            // the array to values < than or > than
            // the pivot value
            pivot = left;
            let newPivot = partition(array, pivot, left, right);

            // recursively sort to the left and right
            sort(array, left, newPivot - 1);
            sort(array, newPivot + 1, right);
        }

    }

    return {
        name: "Quick Sort",
        problemName: "Sorting",
        metrics: {
            comparisons: () => comparisons,
            swaps: () => swaps
        },
        reset: () => { },
        run: sort
    };
})();

let mergeSort: Algorithm = (() => {
    let comparisons = 0;
    let swaps = 0;

    /**
     * Swaps two values in the heap
     *
     * @param {int} findex Index of the first item to be swapped
     * @param {int} sindex Index of the second item to be swapped
     */
    function swap(array: number[], findex: number, sindex: number) {
        swaps++;
        var temp = array[findex];
        array[findex] = array[sindex];
        array[sindex] = temp;
    }

    /**
     * Partitions the (sub)array into values less than and greater
     * than the pivot value
     *
     * @param {Array} array The target array
     * @param {int} pivot The index of the pivot
     * @param {int} left The index of the leftmost element
     * @param {int} left The index of the rightmost element
     */
    function partition(array: number[], pivot: number, left: number, right: number) {

        var storeIndex = left, pivotValue = array[pivot];

        // put the pivot on the right
        swap(array, pivot, right);

        // go through the rest
        for (var v = left; v < right; v++) {
            comparisons++;
            // if the value is less than the pivot's
            // value put it to the left of the pivot
            // point and move the pivot point along one
            if (array[v] < pivotValue) {
                swap(array, v, storeIndex);
                storeIndex++;
            }
        }

        // finally put the pivot in the correct place
        swap(array, right, storeIndex);

        return storeIndex;
    }

    /**
     * Sorts the (sub-)array
     *
     * @param {Array} array The target array
     * @param {int} left The index of the leftmost element, defaults 0
     * @param {int} left The index of the rightmost element,
     defaults array.length-1
     */
    function sort(array: number[], left?: number, right?: number) {

        var pivot = null;

        if (typeof left !== 'number') {
            left = 0;
        }

        if (typeof right !== 'number') {
            right = array.length - 1;
        }

        // effectively set our base
        // case here. When left == right
        // we'll stop
        if (left < right) {

            // pick a pivot between left and right
            // and update it once we've partitioned
            // the array to values < than or > than
            // the pivot value
            pivot = left + Math.ceil((right - left) * 0.5);
            let newPivot = partition(array, pivot, left, right);

            // recursively sort to the left and right
            sort(array, left, newPivot - 1);
            sort(array, newPivot + 1, right);
        }

    }

    return {
        name: "Quick Sort",
        problemName: "Sorting",
        metrics: {
            comparisons: () => comparisons,
            swaps: () => swaps
        },
        reset: () => { },
        run: sort
    };
})();

comparer.registerAlgorithm(bubbleSort);
comparer.registerAlgorithm(quicksort);

export { comparer as OrderedSortComparer };