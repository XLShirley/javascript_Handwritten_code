/*
 * @Author: 肖玲
 * @Date: 2024-04-26 11:07:51
 * @LastEditTime: 2025-03-14 11:53:44
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/test.js
 *测试文件
//  */
// function Dog (name) {
//     this.name = name
// }
// Dog.prototype.callName = function () {
//     console.log(this.name, 'WangWang')
// }
// let dog1 = new Dog('Three mountain')
// dog1.printName = function () {
//     console.log(this.name)
// }
// dog1.callName() //Three mountain WangWang
// dog1.printName() //Three mountain



// function a () {
//     var n = 0
//     this.fun = function () {
//         n++
//         console.log(n)
//     }
// }
// var c = new a()
// c.fun() // 1
// c.fun() // 2

// console.log("start");
// setTimeout(function () {
//     console.log("medium");
// }, 1000);
// setTimeout(function () {
//     console.log("before");
// }, 100);
// console.log("end");

// const list = [
//     {
//         businessEntityCode: "entity_agent",
//         name: "test",
//         orderNum: 1,
//         projectId: "Jevf4ghaKT091r5E",
//     }, {
//         businessEntityCode: "entity_agent",
//         isDefault: false,
//         name: "test",
//         orderNum: 3,
//         projectId: "Jevf4ghaKT091r5E",
//     }, {
//         businessEntityCode: "entity_agent",
//         orderNum: 4,
//         projectId: "Jevf4ghaKT091r5E",
//     }, {
//         businessEntityCode: "entity_agent",

//         name: "test",
//         orderNum: 1,
//         projectId: "Jevf4ghaKT091r5E",
//     }, {
//         businessEntityCode: "entity_agent",
//         name: "test",
//         orderNum: 3,
//         projectId: "Jevf4ghaKT091r5E",
//     }, {
//         businessEntityCode: "entity_agent",
//         name: "test",
//         orderNum: 2,
//         projectId: "Jevf4ghaKT091r5E",
//     }
// ]

// // 实现list列表按照orderNum排序
// let result = list.sort((a, b) => a.orderNum - b.orderNum)
// console.log(result);






// // let result = list.reduce((prev, cur) => {
// //     if (prev[cur.orderNum]) {
// //         prev[cur.orderNum].push(cur)
// //     } else {
// //         prev[cur.orderNum] = [cur]
// //     }
// //     return prev
// // }, {})
// // console.log(result);

// // 实现result列表按照orderNum排序

// // let result1 = Object.keys(result).sort((a, b) => a - b).reduce((prev, cur) => {
// //     return prev.concat(result[cur])
// // }, [])
// // console.log(result1, 'result1');


// [
//     {
//         "createTime": 1718094369000,
//         "updateTime": 1718094369000,
//         "createUserId": 2,
//         "updateUserId": 2,
//         "projectId": "Jevf4ghaKT091r5E",
//         "id": 921,
//         "strategyId": 179,
//         "flowId": 3430,
//         "batchId": 269005,
//         "nodeId": 1,
//         "segmentId": 1,
//         "nodeCounter": 1,
//         "strategyRule": "CALC_NUM",
//         "ruleType": "LC",
//         "ruleDetail": "[{\"value\":\"11\",\"fieldType\":\"k.prod_name\",\"operator\":\"=\"}]",
//         "batchStartTime": 1717484004000,
//         "result": "0",
//         "remark": "",
//         "uniqueCode": "59cbe48f263935c41ffe3be6ce099337",
//         "calcStatus": "INITIALIZE",
//         "force": false,
//         "timeRange": [
//             {
//                 "type": "NODETIME",
//                 "times": 0,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             },
//             {
//                 "type": "NOW",
//                 "times": 0,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             }
//         ],
//         "ruleDetailList": [],
//         "value": "11",
//         "fieldType": "k.prod_name",
//         "operator": "="
//     },
//     {
//         "ruleDetailList": [
//             {
//                 "id": 23,
//                 "field": "operator_string",
//                 "numOperator": "",
//                 "value": "77",
//                 "fieldType": "k.prod_small_cate",
//                 "operator": "!="
//             }
//         ]
//     }
// ]

// [
//     {
//         "nodeId": 1,
//         "strategyRule": "CALC_NUM",
//         "ruleType": "LC",
//         "fieldType": "k.prod_name",
//         "operator": "=",
//         "value": "11",
//         "timeRange": [
//             {
//                 "type": "NODETIME",
//                 "times": 0,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             },
//             {
//                 "type": "NOW",
//                 "times": 0,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             }
//         ]
//     },
//     {
//         "nodeId": 3,
//         "strategyRule": "CALC_NUM",
//         "ruleType": "DF",
//         "fieldType": "cast(round(k.samount,2) as double)",
//         "operator": "<",
//         "value": "33",
//         "timeRange": [
//             {
//                 "type": "NODETIME",
//                 "times": 0,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             },
//             {
//                 "type": "NOW",
//                 "times": 0,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             }
//         ]
//     }
// ]





// const delFilterRuleList = (index) => {
//     // 更新选项
//     const newBranchOptionsList = _.cloneDeep(branchOptionsList);
//     newBranchOptionsList.splice(index, 1);
//     setBranchOptionsList(newBranchOptionsList);
//     const newRuleTypeOptionsList = _.cloneDeep(ruleTypeOptionsList);
//     newRuleTypeOptionsList.splice(index, 1);
//     setRuleTypeOptionsList(newRuleTypeOptionsList);
//     const newNumOperatorOptionsList = _.cloneDeep(numOperatorOptionsList);
//     newNumOperatorOptionsList.splice(index, 1);
//     setNumOperatorOptionsList(newNumOperatorOptionsList);
//     const newOperatorOptionsList = _.cloneDeep(operatorOptionsList);
//     newOperatorOptionsList.splice(index, 1);
//     setOperatorOptionsList(newOperatorOptionsList);
//     const newShowValueFormItems = _.cloneDeep(showValueFormItems);
//     delete newShowValueFormItems[index];
//     setShowValueFormItems(newShowValueFormItems);
//     const newValueHidden = _.cloneDeep(valueHidden);
//     delete newValueHidden[index];
//     setValueHidden(newValueHidden);

//     // 克隆当前的状态列表
//     const updatedList = _.cloneDeep(firstLastConfigList);
//     // 删除指定索引的元素
//     updatedList.splice(index, 1);
//     // 更新状态
//     setFirstLastConfigList(updatedList);

//     // 更新表单值
//     const formValues = form.getFieldsValue();
//     formValues.rules.splice(index, 1);
//     console.log(formValues.rules, 'formValues.rules', updatedList);
//     // 重置表单
//     form.resetFields();
//     // 重新设置表单值
//     form.setFieldsValue({ rules: formValues.rules });

//     // 更新其他相关的状态，如果有
//     setRuleDetailList(updatedList);
//     dispatch({ type: 'UPDATE_RULE', payload: updatedList });
// };



// // 原型链知识点测试
// function Person (name) {
//     this.name = name;
// }

// Person.prototype.greet = function () {
//     console.log("Hello, my name is " + this.name);
// };

// const alice = new Person("Alice");
// alice.greet();  //

// console.log(Person.__proto__ === Function.prototype, '111');
// console.log(Person.__proto__ === Object.prototype, '222');



// {
//     "currStep": 2,
//     "status": "RUNNING",
//     "createUserName": "马林",
//     "approvalProcessRules": [
//       {
//         "createTime": 1713088884000,
//         "updateTime": 1733278374000,
//         "createUserId": 1,
//         "updateUserId": 1,
//         "projectId": "i34RZCnGMaqgw5ip",
//         "id": 1,
//         "proDefId": "1",
//         "step": 1,
//         "totalStep": 2,
//         "approvalType": "CAMPAIGN",
//         "processType": "CUSTOM",
//         "deptId": "",
//         "operRule2": "OR",
//         "channelType": "SHRCBPUSH,SHRCBVXBANK,PHONEBANKPOPUP,",
//         "channelDeptId": "21135"
//       },
//       {
//         "createTime": 1713088884000,
//         "updateTime": 1728639081000,
//         "createUserId": 1,
//         "updateUserId": 1,
//         "projectId": "i34RZCnGMaqgw5ip",
//         "id": 2,
//         "proDefId": "1",
//         "step": 2,
//         "totalStep": 2,
//         "approvalType": "CAMPAIGN",
//         "processType": "CUSTOM",
//         "deptId": "",
//         "roleId": "1003",
//         "operRule1": "AND",
//         "operRule2": "",
//         "channelType": "",
//         "channelDeptId": "",
//         "approverVOList": [
//           {
//             "jobNo": "123456",
//             "userName": "张洲"
//           }
//         ]
//       }
//     ]
//   }



// var a = {
//     name: 'A',
//     fn: function () {
//         console.log(this.name);
//     }
//     fn()
// };
// var a = {
//     name: 'A',
//     init: (function () {
//         console.log('对象创建时执行逻辑:', this.name); // this 是 window 或 global
//         return '执行完毕';
//     })()
// };


// function baz() {
//     // 当前调用栈是：baz
//     // 因此，当前调用位置是全局作用域

//     console.log( "baz" );
//     bar(); // <-- bar的调用位置
// }

// function bar() {
//     // 当前调用栈是：baz --> bar
//     // 因此，当前调用位置在baz中

//     console.log( "bar" );
//     foo(); // <-- foo的调用位置
// }

// function foo() {
//     // 当前调用栈是：baz --> bar --> foo
//     // 因此，当前调用位置在bar中

//     console.log( "foo" );
// }

// baz(); // <-- baz的调用位置

// console.log('start')
// setTimeout(() => {
//     console.log('medium-1000')
//     Promise.resolve().then(() => {
//         console.log('promise-1000')
//     })
// }, 1000)
// setTimeout(() => {
//     console.log('medium-500')
//     Promise.resolve().then(() => {
//         console.log('promise-500')
//     })
// }, 500)
// console.log('end') // start end medium-500 medium-1000 promise-500 promise-1000


// var a = 11;
// var o = {
//     a:10,
//     b:{
//         fn:function(){
//             console.log(this.a); //undefined
//         }
//     }
// }
// o.b.fn();
// function Cat (name) {
//     this.name = name
// }
// Cat.prototype.sayName = function () {
//     // console.log(this === window) //true
//     console.log(this.name);

//     return this.name
// }

// Cat.prototype.sayName = () => {
//     // console.log(this === window) //true
//     console.log(this.name);

//     return this.name
// }
// const cat = new Cat('mm');
// cat.sayName()


// console.log('start');

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('promise');
// });

// console.log('end');



//  场景1:第一次执行同步代码的情况
// console.log('script start');//主线程执行栈  

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0); //宏任务

// Promise.resolve().then(() => {
//   console.log('promise1');//微任务
// }).then(() => {
//   console.log('promise2');//微任务
// }); 

// console.log('script end');//主线程执行栈



// 场景2:宏任务之间的微任务执行
// setTimeout(() => {
//     console.log('宏任务1');//宏任务1

//     Promise.resolve().then(() => {
//       console.log('微任务1');//微任务1
//     });
//   }, 0);

//   setTimeout(() => {
//     console.log('宏任务2');//宏任务2

//     Promise.resolve().then(() => {
//       console.log('微任务2');//微任务2
//     });
//   }, 0);




// console.log(1)

// setTimeout(()=>{
//     console.log(2)
// }, 0)

// new Promise((resolve, reject)=>{
//     console.log('new Promise')
//     resolve()
// }).then(()=>{
//     console.log('then')
// })

// console.log(3)



// async function fn1 (){
//     console.log(1)
//     await fn2()
//     console.log(2) // 阻塞
// }

// async function fn2 (){
//     console.log('fn2')
// }

// fn1()
// console.log(3)// 1 fn2 3 2




// async function async1 () {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }
// async function async2 () {
//     console.log('async2')
// }
// console.log('script start')
// setTimeout(function () {
//     console.log('settimeout')
// })
// async1()
// new Promise(function (resolve) {
//     console.log('promise1')
//     resolve()
// }).then(function () {
//     console.log('promise2')
// })
// console.log('script end') //script start   async1 start   async2    promise1  script end  async1 end  promise2    settimeout



// console.log('script start')
// setTimeout(function () {
//     console.log('settimeout')
// })
// console.log('async1 start')
// await async2()
// console.log('async1 end')
// new Promise(function (resolve) {
//     console.log('promise1')
//     resolve()
// }).then(function () {
//     console.log('promise2')
// })
// console.log('script end') 






function Test(name) {
    this.name = name
    return {age: 25}
  }
  const t = new Test('xxx')
  console.log(t.name) 

//   new关键字的作用：

// 1. 创建一个新的空对象。
// 2. 将新对象的原型指向构造函数的原型。
// 3. 将构造函数的this指向新对象。
// 4. 执行构造函数。
// 5. 如果构造函数返回一个对象，则返回该对象，（基础数据类型忽略）否则返回新对象。
// function Person(name, age){
//     this.name = name;
//     this.age = age;
// }
// Person.prototype.sayName = function () {
//     console.log(this.name)
// }
// const person1 = new Person('Tom', 20)
// console.log(person1)  // Person {name: "Tom", age: 20}
// person1.sayName() // 'Tom'


// 节流：在规定的时间内只执行一次
//方法1:时间戳写法（立即执行，停止触发之后没有办法再执行）
function throttle(fn, delay) {
    let prev = Date.now()
    return function (...args) {
        let now = Date.now()
        if (now - prev > delay) {
            fn.apply(null, args)
            prev = now
        }
    }
}

//方法2:定时器写法（delay毫秒后第一次执行，最后一次触发之后还会再执行一次）
function throttle(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}



// 防抖：在规定的时间内只执行一次
//方法1:定时器写法（停止触发之后delay毫秒后执行）
function debounce(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
