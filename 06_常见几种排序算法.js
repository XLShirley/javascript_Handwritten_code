/*
 * @Author: 肖玲
 * @Date: 2024-09-23 15:44:50
 * @LastEditTime: 2025-03-26 15:20:46
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/06_常见几种排序算法.js
 * 10种常见前端排序算法
 */
// 在前端开发中，排序算法是常见的知识点。下面列举10种常用的前端排序算法，并简单描述它们的实现原理和应用场景。
let arr = [64, 34, 25, 12, 22, 11, 90]

// 1、冒泡排序：通过重复的遍历待排序的序列，比较相邻两个元素，若它们的顺序错误则交换它们，直到没有需要交换的元素为止。冒泡排序的时间复杂度为O(n^2)，适用于小规模数据的排序。
function bubbleSort (arr) {
    // 外层循环：控制遍历的次数。每次遍历完之后，最大的元素会被"冒泡"到最后，所以外层循环的次数是n-1,n是数组的长度。
    for (let i = 0; i < arr.length - 1; i++) {
        // 内层循环：用于比较和交换相邻元素，确保每次遍历时，最大元素"冒泡"到最后。
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}
// 可优化：当某一轮比较过程中没有发生任何元素的交换，说明数组已经有序，可以提前退出排序，减少不必要的遍历，用swapped变量记录是否发生了元素交换，一下是优化后的代码
function optimizedBubbleSort (arr) {
    let swapped  //记录相邻元素是否发生交换
    for (let i = 0; i < arr.length - 1; i++) {
        swapped = false //每次遍历前都进行重置
        // 内层循环进行相邻元素的比较和交换
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                swapped = true  //发生了交换
            }
        }
        // 如果在某一轮遍历中没有发生交换，说明数组已排序好，提前退出遍历
        if (!swapped) {
            break;
        }
    }
    return arr
}




// 2、选择排序：每一次从待排序的数据元素中选出最小（或最大）的一个元素将其与未排序部分的第一个元素交换位置，直到全部待排序的数据元素排完。选择排序的时间复杂度是O(n^2)。
function selectionSort (arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i; //假设当前索引的元素是最小值
        // 内层循环：从当前索引的下一个元素开始，找到最小值的索引
        for (let j = i + 1; j < arr.length; j++) {
            if (ar[j] < arr[minIndex]) {
                minIndex = j //更新最小值的索引
            }
        }
        if (minIndex !== i) {
            // let temp = arr[i]F
            // arr[i] = arr[minIndex]
            // arr[minIndex] = temp    
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]] //可优化成ES6解构赋值
        }
        return arr;
    }
}

// 可优化：双向选择排序在每一轮遍历中，不仅要找到最小值，还要找到最大值。这样可以减少遍历的次数，提高效率。
function bidirectionalSelectionSort (arr) {
    let n = arr.length;
    let left = 0;
    let right = n - 1;
    while (left < right) {
        let minIndex = left;
        let maxIndex = right;
        for (let i = left; i <= right; i++) {
            if (arr[i] < arr[minIndex]) {
                minIndex = i;
            }
            if (arr[i] > arr[maxIndex]) {
                maxIndex = i;
            }
        }
    }
    // 交换最小值到最左边
    if (minIndex !== left) {
        [arr[left], arr[minIndex]] = [arr[minIndex], arr[left]]
    }
    // 处理特殊情况:如果最大值正好被交换到minIndex位置
    if (maxIndex === left) {
        maxIndex = minIndex;
    }

    // 交换最大值到最右边
    if (maxIndex !== right) {
        [arr[right], arr[maxIndex]] = [arr[maxIndex], arr[right]]
    }
    left++;
    right--;
}


// 3、插入排序：通过构建有序序列，对于未排序数据在已排序的序列中从后向前扫描，找到相应位置并插入。插入排序的时间复杂度是O(n^2)。
function insertionSort (arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]; // 假设当前元素是要插入的元素
        let j = i - 1;
        // 从已排序部分的末尾开始，将大于key的元素向后移动
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]; // 将元素向后移动
            j--;
        }
        // 将key插入到正确的位置
        arr[j + 1] = key;
        return arr;
    }
}

// 可优化：(1)二分插入排序是对插入排序的一种改进，通过二分查找来确定插入位置，减少比较次数。时间复杂度为O(nlogn)。

function binaryInsertionSort (arr) {
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let left = 0, right = i - 1;

        // 使用二分查找找到插入位置
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] > key) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // 右移元素，为 key 腾出位置
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }

        // 插入元素
        arr[left] = key;
    }

    return arr;
}

// (2)希尔排序是对插入排序的一种改进，通过将整个序列分成若干个子序列，分别进行插入排序，最后再对整个序列进行一次插入排序。时间复杂度为O(nlogn)。
function shellSort (arr) {
    let n = arr.length;
    let gap = Math.floor(n / 2); // 初始增量设为数组长度的一半

    while (gap > 0) {
        // 对每个子序列执行插入排序
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;

            // 对当前子序列进行插入排序
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap]; // 后移元素
                j -= gap;
            }

            arr[j] = temp; // 插入元素
        }

        gap = Math.floor(gap / 2); // 逐步缩小增量
    }

    return arr;
}



