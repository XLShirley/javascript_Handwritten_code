/*
 * @Author: 肖玲
 * @Date: 2024-09-23 15:44:50
 * @LastEditTime: 2024-09-25 10:11:12
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
// function selectionSort (arr) {
//     for(let)
// }





