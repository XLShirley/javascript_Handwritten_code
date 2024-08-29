/*
 * @Author: 肖玲
 * @Date: 2024-04-26 11:07:51
 * @LastEditTime: 2024-06-21 18:18:14
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


[
    {
        "createTime": 1718094369000,
        "updateTime": 1718094369000,
        "createUserId": 2,
        "updateUserId": 2,
        "projectId": "Jevf4ghaKT091r5E",
        "id": 921,
        "strategyId": 179,
        "flowId": 3430,
        "batchId": 269005,
        "nodeId": 1,
        "segmentId": 1,
        "nodeCounter": 1,
        "strategyRule": "CALC_NUM",
        "ruleType": "LC",
        "ruleDetail": "[{\"value\":\"11\",\"fieldType\":\"k.prod_name\",\"operator\":\"=\"}]",
        "batchStartTime": 1717484004000,
        "result": "0",
        "remark": "",
        "uniqueCode": "59cbe48f263935c41ffe3be6ce099337",
        "calcStatus": "INITIALIZE",
        "force": false,
        "timeRange": [
            {
                "type": "NODETIME",
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            },
            {
                "type": "NOW",
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            }
        ],
        "ruleDetailList": [],
        "value": "11",
        "fieldType": "k.prod_name",
        "operator": "="
    },
    {
        "ruleDetailList": [
            {
                "id": 23,
                "field": "operator_string",
                "numOperator": "",
                "value": "77",
                "fieldType": "k.prod_small_cate",
                "operator": "!="
            }
        ]
    }
]

[
    {
        "nodeId": 1,
        "strategyRule": "CALC_NUM",
        "ruleType": "LC",
        "fieldType": "k.prod_name",
        "operator": "=",
        "value": "11",
        "timeRange": [
            {
                "type": "NODETIME",
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            },
            {
                "type": "NOW",
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            }
        ]
    },
    {
        "nodeId": 3,
        "strategyRule": "CALC_NUM",
        "ruleType": "DF",
        "fieldType": "cast(round(k.samount,2) as double)",
        "operator": "<",
        "value": "33",
        "timeRange": [
            {
                "type": "NODETIME",
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            },
            {
                "type": "NOW",
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            }
        ]
    }
]





const delFilterRuleList = (index) => {
    // 更新选项
    const newBranchOptionsList = _.cloneDeep(branchOptionsList);
    newBranchOptionsList.splice(index, 1);
    setBranchOptionsList(newBranchOptionsList);
    const newRuleTypeOptionsList = _.cloneDeep(ruleTypeOptionsList);
    newRuleTypeOptionsList.splice(index, 1);
    setRuleTypeOptionsList(newRuleTypeOptionsList);
    const newNumOperatorOptionsList = _.cloneDeep(numOperatorOptionsList);
    newNumOperatorOptionsList.splice(index, 1);
    setNumOperatorOptionsList(newNumOperatorOptionsList);
    const newOperatorOptionsList = _.cloneDeep(operatorOptionsList);
    newOperatorOptionsList.splice(index, 1);
    setOperatorOptionsList(newOperatorOptionsList);
    const newShowValueFormItems = _.cloneDeep(showValueFormItems);
    delete newShowValueFormItems[index];
    setShowValueFormItems(newShowValueFormItems);
    const newValueHidden = _.cloneDeep(valueHidden);
    delete newValueHidden[index];
    setValueHidden(newValueHidden);

    // 克隆当前的状态列表
    const updatedList = _.cloneDeep(firstLastConfigList);
    // 删除指定索引的元素
    updatedList.splice(index, 1);
    // 更新状态
    setFirstLastConfigList(updatedList);

    // 更新表单值
    const formValues = form.getFieldsValue();
    formValues.rules.splice(index, 1);
    console.log(formValues.rules, 'formValues.rules', updatedList);
    // 重置表单
    form.resetFields();
    // 重新设置表单值
    form.setFieldsValue({ rules: formValues.rules });

    // 更新其他相关的状态，如果有
    setRuleDetailList(updatedList);
    dispatch({ type: 'UPDATE_RULE', payload: updatedList });
};



// 原型链知识点测试
function Person (name) {
    this.name = name;
}

Person.prototype.greet = function () {
    console.log("Hello, my name is " + this.name);
};

const alice = new Person("Alice");
alice.greet();  //

console.log(Person.__proto__ === Function.prototype, '111');
console.log(Person.__proto__ === Object.prototype, '222');
