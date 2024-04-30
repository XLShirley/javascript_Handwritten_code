/*
 * @Author: 肖玲
 * @Date: 2024-04-26 11:07:51
 * @LastEditTime: 2024-04-28 17:00:27
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/test.js
 *测试文件
 */
function Dog (name) {
    this.name = name
}
Dog.prototype.callName = function () {
    console.log(this.name, 'WangWang')
}
let dog1 = new Dog('Three mountain')
dog1.printName = function () {
    console.log(this.name)
}
dog1.callName() //Three mountain WangWang
dog1.printName() //Three mountain



function a () {
    var n = 0
    this.fun = function () {
        n++
        console.log(n)
    }
}
var c = new a()
c.fun() // 1
c.fun() // 2

console.log("start");
setTimeout(function () {
    console.log("medium");
}, 1000);
setTimeout(function () {
    console.log("before");
}, 100);
console.log("end");

const list = [
    {
        businessEntityCode: "entity_agent",
        name: "test",
        orderNum: 1,
        projectId: "Jevf4ghaKT091r5E",
    }, {
        businessEntityCode: "entity_agent",
        isDefault: false,
        name: "test",
        orderNum: 3,
        projectId: "Jevf4ghaKT091r5E",
    }, {
        businessEntityCode: "entity_agent",
        orderNum: 4,
        projectId: "Jevf4ghaKT091r5E",
    }, {
        businessEntityCode: "entity_agent",

        name: "test",
        orderNum: 1,
        projectId: "Jevf4ghaKT091r5E",
    }, {
        businessEntityCode: "entity_agent",
        name: "test",
        orderNum: 3,
        projectId: "Jevf4ghaKT091r5E",
    }, {
        businessEntityCode: "entity_agent",
        name: "test",
        orderNum: 2,
        projectId: "Jevf4ghaKT091r5E",
    }
]

// 实现list列表按照orderNum排序
let result = list.sort((a, b) => a.orderNum - b.orderNum)
console.log(result);






// let result = list.reduce((prev, cur) => {
//     if (prev[cur.orderNum]) {
//         prev[cur.orderNum].push(cur)
//     } else {
//         prev[cur.orderNum] = [cur]
//     }
//     return prev
// }, {})
// console.log(result);

// 实现result列表按照orderNum排序

// let result1 = Object.keys(result).sort((a, b) => a - b).reduce((prev, cur) => {
//     return prev.concat(result[cur])
// }, [])
// console.log(result1, 'result1');

