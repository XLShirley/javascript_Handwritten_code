/*
 * @Author: 肖玲
 * @Date: 2023-07-09 11:08:37
 * @LastEditTime: 2024-04-24 15:21:00
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/02.js
 * 输出数组中连续出现次数最多的元素
 */
let arr = [1, 1, 2, 2, 2, 1, 3, 1]
// 找到arr中连续出现次数最多的元素
// Method1:循环遍历数组  记录每个元素连续出现的次数  用数组记录   找出现次数最多的元素对应的索引从而找到元素
// 第一种方法：用一个数组记录每个元素连续出现的次数，找到数组中最大值的索引，通过索引找到连续出现次数最多的元素
let count = []
let countCopy = 1
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
        countCopy++
    } else {
        count[i] = countCopy
        countCopy = 1
    }
}
// 寻找数组中最大值的索引
let maxIndex = count.indexOf(Math.max(...count.filter(item => item !== null)))
console.log(arr[maxIndex]);


// Method2: 用两个变量记录当前遍历元素和当前元素出现的次数，再用两个变量记录连续出现最多元素和最多元素出现的次数，当当前元素出现次数大于统计连续出现最多元素时，更新连续出现最多元素和最多元素出现的次数
let currentElement, maxElement
let currentCount = 0, maxCount = 0
for (let i = 0; i < arr.length; i++) {
    if (currentElement === arr[i]) {
        currentCount++
    } else {
        if (currentCount > maxCount) {
            maxCount = currentCount
            maxElement = currentElement
        }
        currentElement = arr[i]
        currentCount = 1
    }
}
console.log(maxElement, maxCount, 'max');


// 找出数组中出现次数最多的元素
// Method3: 用一个对象记录每个元素出现的次数，找到对象中值最大的键
let countMap = {}
let maxElement1
let maxCount1 = 0
// 计算每个元素出现的次数
let arrCopy = [1, 1, 1, 1, 2, 2, 3, 5, 5, 5, 5, 5, 6, 8, 1, 4, 1]
arrCopy.forEach(item => {
    if (countMap[item]) {
        countMap[item]++;
    } else {
        countMap[item] = 1;
    }
})
// 找到对象中值最大的键
for (let key in countMap) {
    if (countMap[key] > maxCount1) {
        maxCount1 = countMap[key]
        maxElement1 = key
    }
}
console.log(maxElement1, maxCount1, 'max1');

