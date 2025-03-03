/*
 * @Author: 肖玲
 * @Date: 2022-12-04 22:19:24
 * @LastEditTime: 2024-04-24 15:53:32
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/01_数组升序排列.js
 * 数组升序排列
 */
// let a = 'java';
// a = a + 'script';
// console.log(a);

// let colors = []; // 创建一个数组
// let count = colors.push("red", "green"); // 推入两项
// console.log(count,colors) // 2

// let colors = ["red", "green", "blue"];
// let removed = colors.splice(1, 1, "yellow", "orange")
// console.log(colors) // red,yellow,orange,green,blue
// console.log(removed) // []

// function compare (value1, value2) {
//     if (value1 < value2) {
//         return -1;
//     } else if (value1 > value2) {
//         return 1;
//     } else {
//         return 0;
//     }
// }
let values = [3, 1, 5, 4, 2];
// values.sort(compare);
// console.log(values); 
values.sort((a, b) => a - b)
console.log(values);



// sort() 方法用于对数组的元素进行排序。它可以根据您提供的排序规则对数组进行升序或降序排列。
arr.sort([compareFunction])
// compareFunction（可选）：用于定义排序顺序的比较函数。如果省略此参数，则元素按照将其转换为的字符串的Unicode位点进行排序。如果指定了 compareFunction，则数组将根据调用该函数的返回值进行排序。比较函数应该具有两个参数 a 和 b，表示要比较的两个元素，返回值为：
// 若 compareFunction(a, b) 返回小于 0 的值，则 a 排在 b 前面。
// 若 compareFunction(a, b) 返回大于 0 的值，则 b 排在 a 前面。
// 若 compareFunction(a, b) 返回 0，则 a 和 b 的相对位置不变。
// 返回值:
// 排序后的数组。注意，sort() 方法会直接修改原始数组，并返回对原数组的引用（即返回排序后的原数组），而不是返回新的数组。




[
    {
        "createTime": 1734412720000,
        "updateTime": 1735196354000,
        "createUserId": 3,
        "updateUserId": 3,
        "projectId": "i34RZCnGMaqgw5ip",
        "id": 8,
        "name": "1",
        "eventNameValue": "1",
        "specialPropertyMappingList": [
            {
                "displayName": "2",
                "propertySchema": "2",
                "dataType": "LONG",
                "index": 0
            },
            {
                "displayName": "3",
                "propertySchema": "3",
                "dataType": "LONG",
                "index": 1
            }
        ],
        "eventType": "BURIED_POINT_EVENT",
        "categoryId": 37,
        "remark": "1",
        "eventCategories": "/风险属性/二级分类/三级分类/"
    },
    {
        "createTime": 1735125174000,
        "updateTime": 1735199733000,
        "createUserId": 3,
        "updateUserId": 3,
        "projectId": "i34RZCnGMaqgw5ip",
        "id": 11,
        "name": "111",
        "eventNameValue": "ffff",
        "specialPropertyMappingList": [
            {
                "displayName": "ff",
                "propertySchema": "ff",
                "dataType": "STRING",
                "index": 0
            }
        ],
        "eventType": "BURIED_POINT_EVENT",
        "categoryId": 0,
        "remark": "22",
        "eventCategories": "未分类"
    }
]

[
    {
        "title": "风险属性",
        "isLeaf": false,
        "children": [
            {
                "title": "二级分类",
                "isLeaf": false,
                "children": [
                    {
                        "title": "三级分类",
                        "isLeaf": false,
                        "children": [
                            {
                                "key": "8",
                                "value": "8",
                                "title": "1",
                                "isLeaf": true
                            },
                            
                        ]
                    },
                ]
            }
        ]
    },
    {
        "key": "11",
        "value": "11",
        "title": "111",
        "isLeaf": true
    }
]

