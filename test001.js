/*
 * @Author: 肖玲
 * @Date: 2024-06-22 14:31:02
 * @LastEditTime: 2024-07-17 14:55:36
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/test001.js
 * 文件备注
 */
let listOne = [
    {
        "ruleDetailList": [
            {
                "id": 55,
                "field": "operator_string",
                "numOperator": "",
                "value": "5",
                "fieldType": "ACCNAME",
                "operator": "="
            }
        ]
    }
]

let listTwo = [
    {
        "nodeId": 1,
        "strategyRule": "CALC_NUM",
        "ruleType": "DF",
        "fieldType": "count",
        "operator": "!=",
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
                "type": "ABSOLUTE",
                "timestamp": 1718639999999,
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            }
        ],
        "value": "3"
    }
]

let result = [
    ...Array(Math.max(restOfValues.length, ruleDetailList?.length))
]





const flows = [
    {
        "id": 1,
        "name": "用户分群",
        "displayName": "用户分群",
        "busiType": "UserEntryNode",
        "editorWidth": 0,
        "fakeable": true,
        "displayInBox": true,
        "color": "#1EC78B",
        "icon": "#iconicon_yonghu_",
        "shape": "CIRCLE",
        "orders": 1,
        "joinType": "ENTRY",
        "status": "NORMAL",
        "nodeId": 1,
        "fatherIds": [],
        "childrenIds": [
            3
        ],
        "branchIndex": 0,
        "x": 0,
        "y": 0,
        "retryTime": 0,
        "inCounts": 500586,
        "holdupCounts": 0,
        "detail": {
            "busiType": "UserEntryNode",
            "segmentList": [
                {
                    "projectId": "Jevf4ghaKT091r5E",
                    "id": 2408,
                    "name": "我名下参与3月开门红活动的用户的客户号",
                    "lastCalcTime": 1714370540000,
                    "scenario": {
                        "createTime": 1603869765000,
                        "updateTime": 1717052092000,
                        "createUserId": 1,
                        "updateUserId": 2,
                        "projectId": "Jevf4ghaKT091r5E",
                        "id": 14,
                        "businessEntityCode": "entity_user",
                        "name": "phone_md5男1",
                        "code": "0",
                        "joinEventColumnName": "userId",
                        "joinOrderColumnName": "user_id"
                    },
                    "customerCount": 500586,
                    "checkSegment": false,
                    "checkDuration": 1,
                    "timeTerm": "HOUR",
                    "valid": true
                }
            ],
            "sql": "SELECT  DISTINCT(_771.dt_id) as dt_id FROM (SELECT  _768.dt_id as dt_id, _768.scenario_code as scenario_code FROM (SELECT  DISTINCT(dt_segment_766.dt_id) as dt_id, '0' as scenario_code FROM (SELECT  DISTINCT(dt_segment.dt_id) as dt_id FROM wolf.dt_segment as dt_segment WHERE dt_segment.project_id = 'Jevf4ghaKT091r5E' AND dt_segment.segment_id = 2408 AND dt_segment.stat_date = 1714370540000 AND dt_segment.scenario_code = '0') as dt_segment_766  JOIN  (SELECT  DISTINCT(zx_userinfo.device_id) as dt_id FROM wolf.zx_userinfo as zx_userinfo) as zx_userinfo_767  ON dt_segment_766.dt_id = zx_userinfo_767.dt_id) as _768  LEFT OUTER JOIN  (SELECT  bl.dt_id as dt_id, bl.scenario_code as scenario_code, bl.project_id as project_id FROM wolf.dt_black_list as bl WHERE bl.project_id = 'Jevf4ghaKT091r5E') as bl_770  ON _768.dt_id = bl_770.dt_id WHERE bl_770.dt_id is null AND _768.scenario_code = '0') as _771",
            "all": false,
            "isValid": true,
            "isInit": true,
            "hasData": true
        },
        "segmentIds": [
            2408
        ]
    },
    {
        "id": 12,
        "name": "退出节点",
        "displayName": "退出节点",
        "busiType": "ExitHelperNode",
        "editorWidth": 0,
        "fakeable": false,
        "displayInBox": false,
        "color": "#1EC78B",
        "icon": "#iconyonghuzhongxin-1",
        "shape": "CIRCLE",
        "orders": 2,
        "joinType": "END",
        "status": "NORMAL",
        "nodeId": 2,
        "fatherIds": [
            3
        ],
        "childrenIds": [],
        "branchIndex": 0,
        "x": 2,
        "y": 0,
        "retryTime": 0,
        "inCounts": 500586,
        "holdupCounts": 0,
        "detail": {
            "busiType": "ExitHelperNode",
            "isValid": false,
            "isInit": false,
            "hasData": false
        },
        "segmentIds": []
    },
    {
        "id": 982,
        "name": "广发运营栏位1206-触达",
        "displayName": "广发运营栏位1206-触达",
        "busiType": "IFrameNode",
        "editorWidth": 0,
        "fakeable": false,
        "displayInBox": true,
        "color": "#57DDBF",
        "icon": "#icontag",
        "shape": "SQUARE",
        "orders": 1,
        "joinType": "FUNCTION",
        "status": "NORMAL",
        "nodeId": 3,
        "fatherIds": [
            1
        ],
        "childrenIds": [
            2
        ],
        "branchIndex": 0,
        "x": 1,
        "y": 0,
        "retryTime": 0,
        "inCounts": 500586,
        "holdupCounts": 0,
        "detail": {
            "busiType": "IFrameNode",
            "data": "{\"business\":127,\"module\":114,\"type\":151,\"products\":[{\"effective_time\":\"2022-05-13 12:01:19\",\"image\":\"https://img2.baidu.com/it/u=948156715,2918592890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281\",\"bubble_effective_time\":\"2022-05-13 12:01:19\",\"link\":\"https://img2.baidu.com/it/u=948156715,2918592890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281\",\"bubble_invalid_time\":\"2024-03-14 12:30:21\",\"created_at\":\"2022-05-13 12:01:36\",\"display_seq\":3,\"only_news\":false,\"updated_at\":\"2022-06-30 10:44:10\",\"menu_title\":\"banner保底数据1\",\"invalid_time\":\"2024-03-14 12:30:21\",\"_id\":\"b899\",\"show_bubble\":false,\"status\":\"5\",\"\":null,\"cIndex\":1,\"charge\":false,\"isLogin\":false}],\"markStatus\":\"大幅度\",\"businessCode\":\"1554\",\"max\":15,\"resetIndexOrder\":false,\"resetIndexName\":\"\",\"pushTime\":false,\"sourceId\":342,\"pushPolicy\":\"default\",\"cleanPolicy\":\"batchFinished\",\"pushType\":\"CMS\",\"pushChoice\":\"GF\",\"operateType\":\"PUSH\",\"channelId\":342,\"isFlage\":true}",
            "isValid": true,
            "isInit": true,
            "hasData": true
        },
        "segmentIds": []
    }
]


// const restOfValues = [
//     {
//         "nodeId": 1,
//         "strategyRule": "CALC_NUM",
//         "ruleType": "JJ",
//         "fieldType": "cast(round(k.cfm_amt,2) as double)",
//         "operator": "<",
//         "timeRange": [
//             {
//                 "type": "NODETIME",
//                 "timestamp": 1719218257000,
//                 "times": 0,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             },
//             {
//                 "type": "ABSOLUTE",
//                 "timestamp": 1719590399999,
//                 "times": 3,
//                 "timeTerm": "DAY",
//                 "truncateAsDay": false,
//                 "endTime": false,
//                 "isPast": true
//             }
//         ]
//     },
//     {
//         "nodeId": 3,
//         "strategyRule": "CALC_AMOUNT",
//         "ruleType": "JJ",
//         "fieldType": "cast(round(k.cfm_amt,2) as double)",
//         "numOperator": "max",
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

// 已知上面两个数组，希望通过遍历数组从flows中找到restOfValues中nodeId对应相等的项提取出inCounts然后按索引组成对象，比如上面最终要得到{
//     0:500586,
//     1:500586
// }