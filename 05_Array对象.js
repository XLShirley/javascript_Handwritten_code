/*
 * @Author: 肖玲
 * @Date: 2024-08-30 10:25:44
 * @LastEditTime: 2024-10-31 09:40:46
 * @LastEditors: 肖玲
 * @Description:
 * @FilePath: /javascript_Handwritten_code/05_Array对象.js
 * 文件备注
 */
// 1、sort()方法
// 定义和用法：用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序。默认排序顺序为按字母升序。
// 注意：当数字是按字母顺序排列时“40”将排在“5”前面。使用数字排序，你必须通过一个函数作为参数来调用。函数指定数字是按照升序还是降序排列。
// ！！！这种方法会改变原数组。
// 语法：Array.sort(sortFunction)
// 参数：sortFunction--可选。规定排序顺序。必须是函数。
// 返回值：Array--对数组的引用。请注意，数组在原数组上进行排序，不生成副本。
// 实例1:数组排序
var fruits = ["Banana", "Orange", "Apple", "Mango"]
const number = ["5", "40", "116", "3"]
fruits.sort()  //[ 'Apple', 'Banana', 'Mango', 'Orange' ] 
// number.sort(function (a, b) { return a - b })
// number.sort()  //[ '116', '3', '40', '5' ]
console.log(fruits, number);

// 实例2:数字排序（数字和升序）
var points = [40, 100, 1, 5, 25, 10]
points.sort(function (a, b) { return a - b })
console.log(points);

// 实例3: 数字排序（数字和降序）
var points = [40, 100, 1, 5, 25, 10]
points.sort(function (a, b) { return b - a })
console.log(points);

// 实例4:数字排序（字母和降序）
var fruits = ["Banana", "Orange", "Apple", "Mango"]
fruits.sort()
fruits.reverse()
console.log(fruits);


// 最后看看sort的源码：JavaScript() 方法在不同引擎中的实现可能有所不同，以下是V8引擎中一个简化的示例：  

function compareNumbers (a, b) {
    return a - b;
}

function v8ArraySort (array) {
    let len = array.length;
    for (let i = 0; i < len; i++) {
        console.log('stepi' + i);
        for (let j = 0; j < len; j++) {
            console.log('stepj' + j);
            if (array[i] < array[j]) {
                console.log('stepj' + 'stepi');
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}

// 使用示例：  
const array = [5, 2, 4, 6, 1, 3];
console.log(v8ArraySort(array)); // 输出排序后的数组  




[
    {
        "key": "label-1",
        "value": "label-1",
        "title": "风险属性",
        "isLeaf": false,
        "children": [
            {
                "key": "label-2",
                "value": "label-2",
                "title": "风险子类1",
                "isLeaf": false,
                "children": []
            }
        ]
    },
    {
        "key": "label-28",
        "value": "label-28",
        "title": "风险属性",
        "isLeaf": false,
        "children": [
            {
                "key": "label-34",
                "value": "label-34",
                "title": "二级分类",
                "isLeaf": false,
                "children": [
                    {
                        "key": "label-37",
                        "value": "label-37",
                        "title": "三级分类",
                        "isLeaf": false,
                        "children": [
                            {
                                "key": "8",
                                "value": "8",
                                "title": "1",
                                "isLeaf": true
                            },
                            {
                                "key": "12",
                                "value": "12",
                                "title": "的芳芳芳芳",
                                "isLeaf": true
                            }
                        ]
                    },
                    {
                        "key": "9",
                        "value": "9",
                        "title": "测试",
                        "isLeaf": true
                    },
                    {
                        "key": "10",
                        "value": "10",
                        "title": "啦啦啦啦",
                        "isLeaf": true
                    }
                ]
            }
        ]
    },
    {
        "key": "label-33",
        "value": "label-33",
        "title": "是的是对方会死鹅回复色回复iu回复是的护发素回复发",
        "isLeaf": false
    },
    {
        "key": "1",
        "value": "1",
        "title": "代发工资",
        "isLeaf": true
    },
    {
        "key": "3",
        "value": "3",
        "title": "外呼结果",
        "isLeaf": true
    },
    {
        "key": "4",
        "value": "4",
        "title": "转化商机",
        "isLeaf": true
    },
    {
        "key": "5",
        "value": "5",
        "title": "财富产品购买",
        "isLeaf": true
    },
    {
        "key": "6",
        "value": "6",
        "title": "大额动账",
        "isLeaf": true
    },
    {
        "key": "11",
        "value": "11",
        "title": "111",
        "isLeaf": true
    }
]