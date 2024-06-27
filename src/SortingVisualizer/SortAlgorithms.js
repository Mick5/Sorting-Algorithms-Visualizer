export async function bubbleSort(array, animationSpeed) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Visualize comparison
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            // If current element is greater than next element, swap them
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                // Visualize swap
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
    }
}

export async function quickSort(array, animationSpeed) {
    async function partition(low, high) {
        let pivot = array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            // Visualize comparison
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            if (array[j] < pivot) {
                i++;
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                // Visualize swap
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
        let temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        // Visualize swap
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        return i + 1;
    }

    async function quickSortHelper(low, high) {
        if (low < high) {
            let pi = await partition(low, high);
            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        }
    }

    await quickSortHelper(0, array.length - 1);
}


export async function heapSort(array, animationSpeed) {
    async function maxHeapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        // Visualize comparison
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        if (left < n && array[left] > array[largest]) {
            largest = left;
        }

        // Visualize comparison
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        if (right < n && array[right] > array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            let temp = array[i];
            array[i] = array[largest];
            array[largest] = temp;
            // Visualize swap
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            await maxHeapify(n, largest);
        }
    }

    async function heapSortHelper() {
        let n = array.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await maxHeapify(n, i);
        }

        for (let i = n - 1; i >= 0; i--) {
            let temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            // Visualize swap
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            await maxHeapify(i, 0);
        }
    }

    await heapSortHelper();
}


export async function mergeSort(array, animationSpeed) {
    async function merge(start, mid, end) {
        let n1 = mid - start + 1;
        let n2 = end - mid;

        let leftArray = array.slice(start, mid + 1);
        let rightArray = array.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        while (i < n1 && j < n2) {
            // Visualize comparison
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
            } else {
                array[k] = rightArray[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            array[k] = leftArray[i];
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = rightArray[j];
            j++;
            k++;
        }
    }

    async function mergeSortHelper(start, end) {
        if (start < end) {
            let mid = Math.floor((start + end) / 2);
            await mergeSortHelper(start, mid);
            await mergeSortHelper(mid + 1, end);
            await merge(start, mid, end);
        }
    }

    await mergeSortHelper(0, array.length - 1);
}