/*
 * @Author: 肖玲
 * @Date: 2024-05-22 16:34:05
 * @LastEditTime: 2024-06-11 19:45:35
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/short_time.js
 * 文件备注
 */

// 计算人数：strategyRule 
form.setFieldsValue({
    rules: {
        ...form.getFieldValue('rules'),
        [idx]: {
            ...form.getFieldValue(['rules', idx]),
            branchId: undefined,
            ruleType: undefined,
            operator: undefined,
            value: undefined,
            fieldType: undefined,
            advancedDateTimes: undefined
        }
    }
});
setVumOperator([]);
setRuleTypeOptions([]);
setOperatorOptions([]);

// 画布节点: campaignFlows


// 规则类型 理财购买 基金购买 客户  : branchOptions
form.setFieldsValue({
    rules: {
        ...form.getFieldValue('rules'),
        [idx]: {
            ...form.getFieldValue(['rules', idx]),
            branchId: undefined,
            ruleType: undefined,
            operator: undefined,
            value: undefined,
            fieldType: undefined
        }
    }
});
setVumOperator([]);
setRuleTypeOptions([]);
setOperatorOptions([]);

// 行为事件：operatorOptions
form.setFieldsValue({
    rules: {
        ...form.getFieldValue('rules'),
        [idx]: {
            ...form.getFieldValue(['rules', idx]),
            value: undefined,
            fieldType: undefined
        }
    }
});
setVumOperator([]);
setRuleTypeOptions([]);


// 最大值操作符： numOperatorOptions


// 操作符：ruleTypeOptions
form.setFieldsValue({
    rules: {
        ...form.getFieldValue('rules'),
        [idx]: {
            ...form.getFieldValue(['rules', idx]),
            value: undefined
        }
    }
});
setVumOperator([]);



// 下拉框联动逻辑梳理：
// 1、切换计算人数时规则类型下拉框选项改变，且要清空选中的规则类型：即切换计算人数计算金额时要重新调接口获取branchOptions且要清空 name={['rules', idx, 'ruleType']}的ruleType选中值
// 2、切换规则类型时行为事件下拉框选项改变，且要清空选中的行为事件：即切换规则类型要重新调接口获取operatorOptions且要清空  name={['rules', idx, 'fieldType']}的fieldType选中值
// 2、切换行为事件时最大值操作符号和操作符下拉框选项改变，且要清空选中的最大值操作符和操作符：即切换行为事件要重新调接口获取numOperatorOptions和ruleTypeOptions且要清空 name={['rules', idx, 'numOperator']}和name={['rules', idx, 'operator']}的numOperator、operator选中值


const addRuleChange = async () => {
    if (firstLastConfigList.length < 10) {
        const newRule = {
            ruleDetailList: [],
            id: uuidv4() // 使用 UUID 生成一个唯一的 ID
        };

        setFirstLastConfigList((prevList) => [...prevList, newRule]);
        setBranchOptionsList((prev) => [...prev, []]);
        setOperatorOptionsList((prev) => [...prev, []]);
        setNumOperatorOptionsList((prev) => [...prev, []]);
        setRuleTypeOptionsList((prev) => [...prev, []]);
        setShowValueFormItems((prev) => ({ ...prev, [prevList.length]: false }));
        setValueHiddenList((prev) => ({ ...prev, [prevList.length]: true }));
    } else {
        message.warning('最多只能添加10条数据', 1);
    }
};

// 原先DOM
{
    firstLastConfigList.map((val, idx) => {
        return (
            <div className="form-item-statis-rules-contain" key={idx}>
                <div className="form-item-label flex">
                    <div>规则 {idx + 1}</div>
                    <Space className="flex">
                        {count ? (
                            <Statistic
                                valueStyle={{ fontSize: 16 }}
                                value={`${count || 0} 人`}
                            />
                        ) : (
                            ''
                        )}

                        <Button
                            type="link"
                            size="small"
                            style={{ padding: 0 }}
                            loading={countLoading}
                            onClick={() => handleCalculateClick(idx)}
                        >
                            计算
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            style={{ padding: 0 }}
                            onClick={() => {
                                if (form.getFieldValue('nodeId')) {
                                    return message.warning('请先选择流程画布', 1);
                                }
                                setSaveGroupIdx(idx);
                                setSaveGroup(true);
                            }}
                        >
                            结果保存为分群
                        </Button>
                    </Space>
                </div>
                <div
                    className="FilterGroupPanel"
                    style={{ paddingTop: 0, marginLeft: 0 }}
                >
                    <div className="contain-box-left">
                        <div key={val.id} className="rules-contain-content">
                            <div className="form-item-statis-rules">
                                {/* 计算人数 */}
                                <Form.Item
                                    name={['rules', idx, 'strategyRule']}
                                    label=""
                                    initialValue="CALC_NUM"
                                    dependencies={['rules']}
                                >
                                    <Select
                                        allowClear
                                        placeholder="请选择"
                                        style={{
                                            minWidth: 100,
                                            width: 'auto'
                                        }}
                                        onChange={(value, option) => {
                                            handleFormItemChange(
                                                [
                                                    {
                                                        operator: 'EQ',
                                                        propertyName: 'typeCode',
                                                        value
                                                    }
                                                ],
                                                'strategyRule',
                                                idx
                                            );
                                            setShowValueFormItems((prevItems) => ({
                                                ...prevItems,
                                                [idx]: option?.data?.valCode === 'CALC_NUM'
                                            }));
                                        }}
                                    >
                                        {_.map(strategyRule, (item) => (
                                            <Option
                                                key={item.valCode}
                                                value={item.valCode}
                                                data={item}
                                            >
                                                {item.valValue}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {/* 画布节点 */}
                                <Form.Item
                                    label=""
                                    name={['rules', idx, 'nodeId']}
                                    dependencies={['rules']}
                                >
                                    <Select
                                        allowClear
                                        placeholder="请输入"
                                        style={{
                                            minWidth: 160,
                                            width: 'auto'
                                        }}
                                    >
                                        {_.map(campaignFlows?.flows, (item) => {
                                            return (
                                                <Option
                                                    key={item.nodeId}
                                                    value={item.nodeId}
                                                    data={item}
                                                >
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                                {/* 规则类型 理财购买 基金购买 客户 */}
                                <Form.Item
                                    label=""
                                    name={['rules', idx, 'ruleType']}
                                    dependencies={['rules']}
                                >
                                    <Select
                                        allowClear
                                        placeholder="请选择"
                                        style={{
                                            minWidth: 160,
                                            width: 'auto'
                                        }}
                                        onChange={(value) => {
                                            handleFormItemChange(
                                                [
                                                    {
                                                        operator: 'EQ',
                                                        propertyName: 'typeCode',
                                                        value: value || 'CALC_NUM'
                                                    }
                                                ],
                                                'ruleType',
                                                idx
                                            );
                                            setBranchCode(value || 'CALC_NUM');
                                        }}
                                    >
                                        {branchOptions.map((item) => (
                                            <Option
                                                key={item.valCode}
                                                value={item.valCode}
                                                data={item}
                                            >
                                                {item.valValue}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {/* 行为事件 */}
                                <Form.Item
                                    label=""
                                    name={['rules', idx, 'fieldType']}
                                    dependencies={['rules']}
                                >
                                    <Select
                                        allowClear
                                        placeholder="行为事件"
                                        style={{
                                            minWidth: 120,
                                            width: 'auto'
                                        }}
                                        onChange={async (value, option) => {
                                            handleFormItemChange(
                                                [
                                                    {
                                                        operator: 'EQ',
                                                        propertyName: 'typeCode',
                                                        value: option?.data?.remark
                                                    }
                                                ],
                                                'fieldType',
                                                idx
                                            );

                                            setRuleTypeInfo(option?.data);
                                            props.handleRuleTypeInfoChange(option?.data);
                                        }}
                                    >
                                        {operatorOptions
                                            .filter(
                                                (item) =>
                                                    item.remark === 'operator_number' &&
                                                    item.valCode !== 'count'
                                            )
                                            .map((item) => (
                                                <Option
                                                    key={item.valCode}
                                                    value={item.valCode}
                                                    data={item}
                                                >
                                                    {item.valValue}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>

                                {/* 最大值操作符 */}
                                <Form.Item
                                    label=""
                                    name={['rules', idx, 'numOperator']}
                                    dependencies={['rules']}
                                >
                                    <Select
                                        allowClear
                                        placeholder="请选择"
                                        style={{
                                            minWidth: 120,
                                            width: 'auto'
                                        }}
                                        onChange={(value, option) => {
                                            handleFormItemChange(
                                                [
                                                    {
                                                        operator: 'EQ',
                                                        propertyName: 'typeCode',
                                                        value: option?.data?.remark
                                                    }
                                                ],
                                                'numOperator',
                                                idx
                                            );
                                            const valCode = option?.data?.valCode;
                                            const isVisible =
                                                valCode !== 'is not null' &&
                                                valCode !== 'is null';
                                            setRuleTypeInfo(option?.data);
                                            setValueHidden(isVisible);
                                        }}
                                    >
                                        {numOperatorOptions?.map((item) => (
                                            <Option
                                                key={item.valCode}
                                                value={item.valCode}
                                                data={item}
                                            >
                                                {item.valValue}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                {/* 操作符 */}
                                {showValueFormItems[idx] && (
                                    <Form.Item
                                        label=""
                                        name={['rules', idx, 'operator']}
                                        dependencies={['rules']}
                                    >
                                        <Select
                                            allowClear
                                            placeholder="操作符"
                                            style={{
                                                minWidth: 120,
                                                width: 'auto'
                                            }}
                                            onChange={(value, option) => {
                                                handleFormItemChange(
                                                    [
                                                        {
                                                            operator: 'EQ',
                                                            propertyName: 'typeCode',
                                                            value: option?.data?.remark
                                                        }
                                                    ],
                                                    'operator',
                                                    idx
                                                );
                                                const valCode = option?.data?.valCode;
                                                const isVisible =
                                                    valCode !== 'is not null' &&
                                                    valCode !== 'is null';
                                                setRuleTypeInfo(option?.data);
                                                setValueHidden(isVisible);
                                            }}
                                        >
                                            {ruleTypeOptions.map((item) => (
                                                <Option
                                                    key={item.valCode}
                                                    value={item.valCode}
                                                    data={item}
                                                >
                                                    {item.valValue}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                )}
                                {/* 值 */}
                                {showValueFormItems[idx] && valueHidden && (
                                    <Form.Item
                                        label=""
                                        name={['rules', idx, 'value']}
                                        dependencies={['rules']}
                                    >
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                )}
                                {/* 时间控件 */}
                                <Form.Item
                                    label=""
                                    name={['rules', idx, 'advancedDateTimes']}
                                    dependencies={['rules']}
                                >
                                    <RangePicker
                                        value={form.getFieldValue('advancedDateTimes')}
                                        onChange={(value) =>
                                            handleRangePickerChange(value, idx)
                                        }
                                    />
                                </Form.Item>
                                <div
                                    className="add-statis-rules"
                                    // onClick={addRuleDetail}
                                    onClick={() => addFilterList(idx)}
                                >
                                    <PlusCircleOutlined
                                        style={{ paddingTop: 8, marginRight: 4 }}
                                    />
                                    <div style={{ width: 34 }}>条件</div>
                                </div>
                                {firstLastConfigList.length > 1 && (
                                    <CloseCircleOutlined
                                        onClick={() => delFilterRuleList(idx)}
                                        style={{
                                            cursor: 'pointer',
                                            marginLeft: 8,
                                            paddingTop: 1,
                                            lineHeight: '32px'
                                        }}
                                    />
                                )}
                            </div>

                            {/* 筛选条件 */}
                            <RuleDetailList
                                val={val}
                                idx={idx}
                                form={form}
                                ref={ruleDetailRef}
                                delFilterList={delFilterList}
                                branchCode={branchCode}
                                onChange={handleFormChange}
                                fieldTypeOption={fieldTypeOption}
                                dispatch={dispatch}
                                setRuleDetailList={setRuleDetailList}
                                ruleDetailList={val?.ruleDetailList}
                                setFirstLastConfigList={setFirstLastConfigList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    })
}



{
    firstLastConfigList.map((val, idx) => {
        return (
            <div className="form-item-statis-rules-contain" key={idx}>
                {/* 计算人数 */}
                <Form.Item
                    name={['rules', idx, 'strategyRule']}
                    label=""
                    initialValue="CALC_NUM"
                    dependencies={['rules']}
                >
                    <Select
                        allowClear
                        placeholder="请选择"
                        style={{ minWidth: 100, width: 'auto' }}
                        onChange={(value, option) => {
                            handleFormItemChange(
                                [{ operator: 'EQ', propertyName: 'typeCode', value }],
                                'strategyRule',
                                idx
                            );
                            setShowValueFormItems((prevItems) => ({
                                ...prevItems,
                                [idx]: option?.data?.valCode === 'CALC_NUM'
                            }));
                        }}
                    >
                        {_.map(strategyRule, (item) => (
                            <Option
                                key={item.valCode}
                                value={item.valCode}
                                data={item}
                            >
                                {item.valValue}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* 规则类型 */}
                <Form.Item
                    name={['rules', idx, 'ruleType']}
                    label=""
                    dependencies={['rules']}
                >
                    <Select
                        allowClear
                        placeholder="请选择"
                        style={{ minWidth: 160, width: 'auto' }}
                        onChange={(value) => {
                            handleFormItemChange(
                                [
                                    {
                                        operator: 'EQ',
                                        propertyName: 'typeCode',
                                        value: value || 'CALC_NUM'
                                    }
                                ],
                                'ruleType',
                                idx
                            );
                            setBranchCode(value || 'CALC_NUM');
                        }}
                    >
                        {branchOptionsList[idx]?.map((item) => (
                            <Option
                                key={item.valCode}
                                value={item.valCode}
                                data={item}
                            >
                                {item.valValue}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* 行为事件 */}
                <Form.Item
                    name={['rules', idx, 'fieldType']}
                    label=""
                    dependencies={['rules']}
                >
                    <Select
                        allowClear
                        placeholder="行为事件"
                        style={{ minWidth: 120, width: 'auto' }}
                        onChange={async (value, option) => {
                            handleFormItemChange(
                                [
                                    {
                                        operator: 'EQ',
                                        propertyName: 'typeCode',
                                        value: option?.data?.remark
                                    }
                                ],
                                'fieldType',
                                idx
                            );
                            setRuleTypeInfo(option?.data);
                            props.handleRuleTypeInfoChange(option?.data);
                        }}
                    >
                        {operatorOptionsList[idx]
                            ?.filter(
                                (item) =>
                                    item.remark === 'operator_number' &&
                                    item.valCode !== 'count'
                            )
                            .map((item) => (
                                <Option
                                    key={item.valCode}
                                    value={item.valCode}
                                    data={item}
                                >
                                    {item.valValue}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                {/* 最大值操作符 */}
                <Form.Item
                    name={['rules', idx, 'numOperator']}
                    label=""
                    dependencies={['rules']}
                >
                    <Select
                        allowClear
                        placeholder="请选择"
                        style={{ minWidth: 120, width: 'auto' }}
                        onChange={(value, option) => {
                            handleFormItemChange(
                                [
                                    {
                                        operator: 'EQ',
                                        propertyName: 'typeCode',
                                        value: option?.data?.remark
                                    }
                                ],
                                'numOperator',
                                idx
                            );
                            const valCode = option?.data?.valCode;
                            const isVisible =
                                valCode !== 'is not null' && valCode !== 'is null';
                            setRuleTypeInfo(option?.data);
                            setValueHidden((prev) => ({
                                ...prev,
                                [idx]: isVisible
                            }));
                        }}
                    >
                        {numOperatorOptionsList[idx]?.map((item) => (
                            <Option
                                key={item.valCode}
                                value={item.valCode}
                                data={item}
                            >
                                {item.valValue}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* 操作符 */}
                {showValueFormItems[idx] && (
                    <Form.Item
                        name={['rules', idx, 'operator']}
                        label=""
                        dependencies={['rules']}
                    >
                        <Select
                            allowClear
                            placeholder="操作符"
                            style={{ minWidth: 120, width: 'auto' }}
                            onChange={(value, option) => {
                                handleFormItemChange(
                                    [
                                        {
                                            operator: 'EQ',
                                            propertyName: 'typeCode',
                                            value: option?.data?.remark
                                        }
                                    ],
                                    'operator',
                                    idx
                                );
                                const valCode = option?.data?.valCode;
                                const isVisible =
                                    valCode !== 'is not null' && valCode !== 'is null';
                                setRuleTypeInfo(option?.data);
                                setValueHidden((prev) => ({
                                    ...prev,
                                    [idx]: isVisible
                                }));
                            }}
                        >
                            {ruleTypeOptionsList[idx]?.map((item) => (
                                <Option
                                    key={item.valCode}
                                    value={item.valCode}
                                    data={item}
                                >
                                    {item.valValue}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                {/* 值 */}
                {showValueFormItems[idx] && valueHiddenList[idx] && (
                    <Form.Item
                        name={['rules', idx, 'value']}
                        label=""
                        dependencies={['rules']}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                )}

                {/* 时间控件 */}
                <Form.Item
                    name={['rules', idx, 'advancedDateTimes']}
                    label=""
                    dependencies={['rules']}
                >
                    <RangePicker
                        value={form.getFieldValue('advancedDateTimes')}
                        onChange={(value) => handleRangePickerChange(value, idx)}
                    />
                </Form.Item>

                <div
                    className="add-statis-rules"
                    onClick={() => addFilterList(idx)}
                >
                    <PlusCircleOutlined
                        style={{ paddingTop: 8, marginRight: 4 }}
                    />
                    <div style={{ width: 34 }}>条件</div>
                </div>

                {firstLastConfigList.length > 1 && (
                    <CloseCircleOutlined
                        onClick={() => delFilterRuleList(idx)}
                        style={{
                            cursor: 'pointer',
                            marginLeft: 8,
                            paddingTop: 1,
                            lineHeight: '32px'
                        }}
                    />
                )}
            </div>
        );
    })
}

{
    operatorOptionsList[idx]
        .filter(
            (item) =>
                item.remark === 'operator_number' &&
                item.valCode !== 'count'
        )
        .map((item) => (
            <Option
                key={item.valCode}
                value={item.valCode}
                data={item}
            >
                {item.valValue}
            </Option>
        ))
}



operatorOptions: [
    {
        "createTime": 1715136006000,
        "updateTime": 1716283124000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 28,
        "typeCode": "JJ",
        "valCode": "count",
        "valValue": "次数",
        "remark": "operator_number",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 27,
        "typeCode": "JJ",
        "valCode": "k.cfm_amt",
        "valValue": "确认金额",
        "remark": "operator_number",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 24,
        "typeCode": "JJ",
        "valCode": "k.prod_cls",
        "valValue": "产品分类",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 25,
        "typeCode": "JJ",
        "valCode": "k.prod_id",
        "valValue": "产品编号",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 26,
        "typeCode": "JJ",
        "valCode": "k.prod_name",
        "valValue": "产品名称",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 23,
        "typeCode": "JJ",
        "valCode": "k.prod_small_cate",
        "valValue": "产品小类",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 22,
        "typeCode": "JJ",
        "valCode": "k.prod_type",
        "valValue": "产品类型",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 21,
        "typeCode": "JJ",
        "valCode": "k.ta_code",
        "valValue": "TA代码",
        "remark": "operator_string",
        "description": "理财购买-属性"
    }
]

opt: [
    {
        "fieldType": "k.prod_type",
        "operator": "=",
        "value": "5"
    },
    {
        "fieldType": "k.prod_name",
        "operator": "!=",
        "value": "8"
    }
]
// 已知上面两条数据，要获得以下数据结构

[
    {
        "field": "k.prod_type",
        "fieldType": "operator_string",
        "id": 22,
        "numOperator": "",
        "operator": "=",
        "value": "5"
    },
    {
        "field": "k.prod_name",
        "fieldType": "operator_string",
        "id": 26,
        "numOperator": "",
        "operator": "!=",
        "value": "8"
    },
    ]



data：[
    {
        "ruleDetailList": [
            {
                "fieldType": "k.samount",
                "operator": "<",
                "value": "5"
            },
            {
                "fieldType": "k.samount",
                "operator": "<",
                "value": "9"
            }
        ]
    },
    {
        "ruleDetailList": [
            {
                "fieldType": "count",
                "operator": "!=",
                "value": "fdvdfvd"
            },
            {
                "fieldType": "k.samount",
                "operator": "<",
                "value": "66"
            }
        ]
    }
]

已知data，处理数据遍历data, 当data的索引等于idx时，处理data对应的数据全都置为undefined, 比如idx是0, 则获取newData是[
    {
        "ruleDetailList": [
            {
                "fieldType": undefined,
                "operator": undefined,
                "value": undefined
            },
            {
                "fieldType": undefined,
                "operator": undefined,
                "value": undefined
            }
        ]
    },
    {
        "ruleDetailList": [
            {
                "fieldType": "count",
                "operator": "!=",
                "value": "fdvdfvd"
            },
            {
                "fieldType": "k.samount",
                "operator": "<",
                "value": "66"
            }
        ]
    }
]



if (ruleDetailList[idx].ruleDetailList) {
    // 遍历数据
    const newData = ruleDetailList.map((item, index) => {
        if (index === idx) {
            // 当索引等于 idx 时，将该项的 ruleDetailList 全部置为 undefined
            return {
                ruleDetailList: new Array(item.ruleDetailList.length).fill(
                    undefined
                )
            };
        } else {
            // 其他情况不做修改
            return item;
        }
    });
    setRuleDetailList(newData);
}





处理以下数据
detailInfo: {
    "createTime": 1716652419000,
        "updateTime": 1716652419000,
            "createUserId": 2,
                "updateUserId": 2,
                    "createUserName": "analyzer",
                        "updateUserName": "analyzer",
                            "projectId": "Jevf4ghaKT091r5E",
                                "id": 125,
                                    "strategyName": "今天星期6",
                                        "flowId": 3353,
                                            "batchId": 268903,
                                                "strategyStatus": "INITIALIZE",
                                                    "flow": "conlin测试-动了我也没发",
                                                        "rules": [
                                                            {
                                                                "createTime": 1716652419000,
                                                                "updateTime": 1716652419000,
                                                                "createUserId": 2,
                                                                "updateUserId": 2,
                                                                "projectId": "Jevf4ghaKT091r5E",
                                                                "id": 90,
                                                                "strategyId": 125,
                                                                "flowId": 3353,
                                                                "batchId": 268903,
                                                                "nodeId": 1,
                                                                "segmentId": 1,
                                                                "nodeCounter": 10,
                                                                "strategyRule": "CALC_NUM",
                                                                "ruleType": "JJ",
                                                                "ruleDetail": "[{\"value\":\"10\",\"fieldType\":\"k.ta_code\",\"operator\":\"!=\"},{\"id\":27,\"field\":\"k.cfm_amt\",\"numOperator\":\"\",\"value\":\"172\",\"fieldType\":\"operator_number\",\"operator\":\"!=\"},{\"id\":28,\"field\":\"count\",\"numOperator\":\"\",\"value\":\"7\",\"fieldType\":\"operator_number\",\"operator\":\"<\"}]",
                                                                "batchStartTime": 1716430599000,
                                                                "result": "",
                                                                "remark": "",
                                                                "uniqueCode": "b7d37f1b0c2142966c497e6217adb218",
                                                                "calcStatus": "INITIALIZE",
                                                                "force": false,
                                                                "timeRange": [
                                                                    {
                                                                        "type": "ABSOLUTE",
                                                                        "timestamp": 1716566400000,
                                                                        "times": 0,
                                                                        "timeTerm": "DAY",
                                                                        "truncateAsDay": false,
                                                                        "endTime": false,
                                                                        "isPast": true
                                                                    },
                                                                    {
                                                                        "type": "ABSOLUTE",
                                                                        "timestamp": 1716652799999,
                                                                        "times": 0,
                                                                        "timeTerm": "DAY",
                                                                        "truncateAsDay": false,
                                                                        "endTime": false,
                                                                        "isPast": true
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "createTime": 1716652419000,
                                                                "updateTime": 1716652419000,
                                                                "createUserId": 2,
                                                                "updateUserId": 2,
                                                                "projectId": "Jevf4ghaKT091r5E",
                                                                "id": 91,
                                                                "strategyId": 125,
                                                                "flowId": 3353,
                                                                "batchId": 268903,
                                                                "nodeId": 1,
                                                                "segmentId": 1,
                                                                "nodeCounter": 10,
                                                                "strategyRule": "CALC_AMOUNT",
                                                                "ruleType": "LC",
                                                                "ruleDetail": "[{\"numOperator\":\"sum\",\"fieldType\":\"k.cfm_amt_cny\"},{\"id\":8,\"field\":\"k.cfm_amt_cny\",\"numOperator\":\"\",\"value\":\"999\",\"fieldType\":\"operator_number\",\"operator\":\"!=\"}]",
                                                                "batchStartTime": 1716430599000,
                                                                "result": "",
                                                                "remark": "",
                                                                "uniqueCode": "98ed63df8500ac91daedda01f8a75494",
                                                                "calcStatus": "INITIALIZE",
                                                                "force": false,
                                                                "timeRange": [
                                                                    {
                                                                        "type": "ABSOLUTE",
                                                                        "timestamp": 1716912000000,
                                                                        "times": 0,
                                                                        "timeTerm": "DAY",
                                                                        "truncateAsDay": false,
                                                                        "endTime": false,
                                                                        "isPast": true
                                                                    },
                                                                    {
                                                                        "type": "ABSOLUTE",
                                                                        "timestamp": 1716998399999,
                                                                        "times": 0,
                                                                        "timeTerm": "DAY",
                                                                        "truncateAsDay": false,
                                                                        "endTime": false,
                                                                        "isPast": true
                                                                    }
                                                                ]
                                                            }
                                                        ]
}
// 要得到以下数据：
{
    '0': [{
        "id": 27,
        "field": "k.cfm_amt",
        "numOperator": "",
        "value": "172",
        "fieldType": "operator_number",
        "operator": "!="
    },
    {
        "id": 28,
        "field": "count",
        "numOperator": "",
        "value": "7",
        "fieldType": "operator_number",
        "operator": "<"
    }],
        '1': [{
            "id": 8,
            "field": "k.cfm_amt_cny",
            "numOperator": "",
            "value": "999",
            "fieldType": "operator_number",
            "operator": "!="
        }]
}


{
    "ruleDetailList": [
        {
            "fieldType": "k.prod_code",
            "operator": "is null",
            "value": "fdvdfvd"
        }
    ]
}.map((item) => {
    return {
        ...item,
        fieldType: undefined,
        operator: undefined,
        value: undefined
    };
})


[
    {
        "createTime": 1715136006000,
        "updateTime": 1715841348000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 20,
        "typeCode": "numOperator",
        "valCode": "avg",
        "valValue": "平均值",
        "remark": "",
        "description": "数字操作符"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715841341000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 18,
        "typeCode": "numOperator",
        "valCode": "max",
        "valValue": "最大值",
        "remark": "",
        "description": "数字操作符"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715841343000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 19,
        "typeCode": "numOperator",
        "valCode": "min",
        "valValue": "最小值",
        "remark": "",
        "description": "数字操作符"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715841338000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 17,
        "typeCode": "numOperator",
        "valCode": "sum",
        "valValue": "求和",
        "remark": "",
        "description": "数字操作符"
    }
]根据每项的id排序





已知rules:
[
    {
        "fieldType": "k.prod_cls",
        "operator": "is not null",
        "value": "4"
    },
    {
        "fieldType": "k.prod_name",
        "operator": "like",
        "value": "画"
    }
]
options：
[
    {
        "createTime": 1715136006000,
        "updateTime": 1716806141000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 27,
        "typeCode": "JJ",
        "valCode": "cast(round(k.cfm_amt,2) as double)",
        "valValue": "确认金额",
        "remark": "operator_number",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1716283124000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 28,
        "typeCode": "JJ",
        "valCode": "count",
        "valValue": "次数",
        "remark": "operator_number",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 24,
        "typeCode": "JJ",
        "valCode": "k.prod_cls",
        "valValue": "产品分类",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 25,
        "typeCode": "JJ",
        "valCode": "k.prod_id",
        "valValue": "产品编号",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 26,
        "typeCode": "JJ",
        "valCode": "k.prod_name",
        "valValue": "产品名称",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 23,
        "typeCode": "JJ",
        "valCode": "k.prod_small_cate",
        "valValue": "产品小类",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 22,
        "typeCode": "JJ",
        "valCode": "k.prod_type",
        "valValue": "产品类型",
        "remark": "operator_string",
        "description": "理财购买-属性"
    },
    {
        "createTime": 1715136006000,
        "updateTime": 1715676088000,
        "createUserId": 1,
        "updateUserId": 1,
        "createUserName": "admin",
        "updateUserName": "admin",
        "projectId": "Jevf4ghaKT091r5E",
        "id": 21,
        "typeCode": "JJ",
        "valCode": "k.ta_code",
        "valValue": "TA代码",
        "remark": "operator_string",
        "description": "理财购买-属性"
    }
]

处理上面两个数据得到：
[
    {
        "id": 24,
        "fieldType": "k.prod_cls",
        "operator": "is not null",
        "value": "4"
    },
    {
        "id": 26,
        "fieldType": "k.prod_name",
        "operator": "like",
        "value": "画"
    }
]





已知ruleDetailList：
[
    {
        "createTime": 1717079971000,
        "updateTime": 1717079971000,
        "createUserId": 2,
        "updateUserId": 2,
        "projectId": "Jevf4ghaKT091r5E",
        "id": 649,
        "strategyId": 181,
        "flowId": 3392,
        "batchId": 268942,
        "nodeId": 2,
        "segmentId": 1,
        "nodeCounter": 1,
        "strategyRule": "CALC_AMOUNT",
        "ruleType": "LC",
        "ruleDetail": "[{\"numOperator\":\"sum\",\"fieldType\":\"cast(round(k.cfm_amt_cny,2) as double)\"}]",
        "batchStartTime": 1717052178000,
        "result": "0",
        "remark": "",
        "uniqueCode": "ea2dcc23d5cb9c3299cd9585ad5a82cd",
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
        "numOperator": "sum",
        "fieldType": "cast(round(k.cfm_amt_cny,2) as double)"
    },
    {
        "ruleDetailList": [
            {
                "id": 23,
                "field": "operator_string",
                "numOperator": "",
                "value": "sss",
                "fieldType": "k.prod_small_cate",
                "operator": "="
            }
        ]
    }
]

const delFilterList = (parentIdx, ruleIndex, ruleForm) => {
    const curFirstLastConfigList = _.cloneDeep(firstLastConfigList);
    const ruleDetails = curFirstLastConfigList[parentIdx].ruleDetailList;
    // 如果传递的 ruleIndex 有效，则删除相应的规则详情
    if (ruleDetails[ruleIndex]) {
        ruleDetails.splice(ruleIndex, 1);
        setFirstLastConfigList(curFirstLastConfigList); // 更新状态
        setRuleDetailList(curFirstLastConfigList);
        // 更新表单数据
        const updatedRules = ruleForm.getFieldValue('rules') || [];
        updatedRules.splice(ruleIndex, 1);
        console.log(ruleDetailList);

        // form.setFieldsValue({ rules: updatedRules });
    } else {
        console.error('未找到索引为:', ruleIndex, '的规则');
    }
}; 在这个方法中，假设传的parentIdx = 1，ruleIndex = 0, 要处理ruleDetailList为[
    {
        "createTime": 1717079971000,
        "updateTime": 1717079971000,
        "createUserId": 2,
        "updateUserId": 2,
        "projectId": "Jevf4ghaKT091r5E",
        "id": 649,
        "strategyId": 181,
        "flowId": 3392,
        "batchId": 268942,
        "nodeId": 2,
        "segmentId": 1,
        "nodeCounter": 1,
        "strategyRule": "CALC_AMOUNT",
        "ruleType": "LC",
        "ruleDetail": "[{\"numOperator\":\"sum\",\"fieldType\":\"cast(round(k.cfm_amt_cny,2) as double)\"}]",
        "batchStartTime": 1717052178000,
        "result": "0",
        "remark": "",
        "uniqueCode": "ea2dcc23d5cb9c3299cd9585ad5a82cd",
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
        "numOperator": "sum",
        "fieldType": "cast(round(k.cfm_amt_cny,2) as double)"
    },
    {
        "ruleDetailList": [

        ]
    }
]


    .rulrBtn {
    float: right;
}
<>
    <div className='rulrBtn'>
        <Button type="link" >
            Link
        </Button>
        <Button type="link" >
            Link
        </Button>
    </div>
    <div>
        {ruleInfo}
    </div>
</>
设置样式ruleInfo不要飘到Button一行


[
    {
        "nodeId": 1,
        "strategyRule": "CALC_NUM",
        "ruleType": "LC",
        "fieldType": "k.prod_name",
        "operator": "=",
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
        "value": "11"
    },
    {
        "nodeId": 3,
        "strategyRule": "CALC_NUM",
        "ruleType": "JJ",
        "fieldType": "k.ta_code",
        "operator": "=",
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
        "value": "33"
    }
]



[
    {
        "ruleDetailList": [
            {
                "id": 5,
                "field": "operator_number",
                "numOperator": "",
                "value": "121",
                "fieldType": "count",
                "operator": "!="
            }
        ]
    },
    {
        "ruleDetailList": [
            {
                "id": 56,
                "field": "operator_string",
                "numOperator": "",
                "value": "323",
                "fieldType": "AREACODE",
                "operator": "="
            }
        ]
    }
]




[
    {
        "createTime": 1718098007000,
        "updateTime": 1718098007000,
        "createUserId": 2,
        "updateUserId": 2,
        "projectId": "Jevf4ghaKT091r5E",
        "id": 929,
        "strategyId": 179,
        "flowId": 3430,
        "batchId": 269005,
        "nodeId": 1,
        "segmentId": 1,
        "nodeCounter": 1,
        "strategyRule": "CALC_NUM",
        "ruleType": "LC",
        "ruleDetail": "[{\"value\":\"11\",\"fieldType\":\"k.prod_name\",\"operator\":\"=\"},{\"id\":5,\"field\":\"count\",\"numOperator\":\"\",\"value\":\"121\",\"fieldType\":\"operator_number\",\"operator\":\"!=\"}]",
        "batchStartTime": 1717484004000,
        "result": "0",
        "remark": "",
        "uniqueCode": "bad74009cd3c263818e465b8499bea5a",
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
        "ruleDetailList": [
            {
                "value": "11",
                "fieldType": "k.prod_name",
                "operator": "="
            },
            {
                "id": 5,
                "field": "count",
                "numOperator": "",
                "value": "121",
                "fieldType": "operator_number",
                "operator": "!="
            }
        ],
        "value": "11",
        "fieldType": "k.prod_name",
        "operator": "="
    },
    {
        "createTime": 1718098007000,
        "updateTime": 1718098007000,
        "createUserId": 2,
        "updateUserId": 2,
        "projectId": "Jevf4ghaKT091r5E",
        "id": 930,
        "strategyId": 179,
        "flowId": 3430,
        "batchId": 269005,
        "nodeId": 2,
        "segmentId": 1,
        "nodeCounter": 1,
        "strategyRule": "CALC_AMOUNT",
        "ruleType": "AUM",
        "ruleDetail": "[{\"numOperator\":\"sum\",\"fieldType\":\"cast(round(aumvalue,2) as double)\"},{\"id\":44,\"field\":\"cast(round(aumvalue,2) as double)\",\"numOperator\":\"\",\"value\":\"22\",\"fieldType\":\"operator_number\",\"operator\":\"<=\"}]",
        "batchStartTime": 1717484004000,
        "result": "0",
        "remark": "",
        "uniqueCode": "1f64d08de71fa7c22765acdb2e698d01",
        "calcStatus": "INITIALIZE",
        "force": false,
        "timeRange": [
            {
                "type": "ABSOLUTE",
                "timestamp": 1718035200000,
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            },
            {
                "type": "ABSOLUTE",
                "timestamp": 1718121599999,
                "times": 0,
                "timeTerm": "DAY",
                "truncateAsDay": false,
                "endTime": false,
                "isPast": true
            }
        ],
        "ruleDetailList": [
            {
                "numOperator": "sum",
                "fieldType": "cast(round(aumvalue,2) as double)"
            },
            {
                "id": 44,
                "field": "cast(round(aumvalue,2) as double)",
                "numOperator": "",
                "value": "22",
                "fieldType": "operator_number",
                "operator": "<="
            }
        ],
        "numOperator": "sum",
        "fieldType": "cast(round(aumvalue,2) as double)"
    },
    {
        "createTime": 1718098007000,
        "updateTime": 1718098007000,
        "createUserId": 2,
        "updateUserId": 2,
        "projectId": "Jevf4ghaKT091r5E",
        "id": 931,
        "strategyId": 179,
        "flowId": 3430,
        "batchId": 269005,
        "nodeId": 3,
        "segmentId": 1,
        "nodeCounter": 1,
        "strategyRule": "CALC_NUM",
        "ruleType": "DF",
        "ruleDetail": "[{\"numOperator\":\"sum\",\"value\":\"33\",\"fieldType\":\"cast(round(k.samount,2) as double)\",\"operator\":\"<\"},{\"id\":56,\"field\":\"AREACODE\",\"numOperator\":\"\",\"value\":\"323\",\"fieldType\":\"operator_string\",\"operator\":\"=\"}]",
        "batchStartTime": 1717484004000,
        "result": "0",
        "remark": "",
        "uniqueCode": "141cfe6e76eb779d0f996b3d171a4ec4",
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
        "ruleDetailList": [
            {
                "numOperator": "sum",
                "value": "33",
                "fieldType": "cast(round(k.samount,2) as double)",
                "operator": "<"
            },
            {
                "id": 56,
                "field": "AREACODE",
                "numOperator": "",
                "value": "323",
                "fieldType": "operator_string",
                "operator": "="
            }
        ],
        "numOperator": "sum",
        "value": "33",
        "fieldType": "cast(round(k.samount,2) as double)",
        "operator": "<"
    }
]

{
    '0': [
        {
            "id": 5,
            "field": "operator_number",
            "numOperator": "",
            "value": "121",
            "fieldType": "count",
            "operator": "!="
        }
    ],

        '1': [
            {
                "id": 56,
                "field": "operator_string",
                "numOperator": "",
                "value": "323",
                "fieldType": "AREACODE",
                "operator": "="
            }
        ]
}

[
    {
        "ruleDetailList": [
            {
                "id": 5,
                "field": "operator_number",
                "numOperator": "",
                "value": "121",
                "fieldType": "count",
                "operator": "!="
            }
        ]
    },
    {
        "ruleDetailList": [
            {
                "id": 56,
                "field": "operator_string",
                "numOperator": "",
                "value": "323",
                "fieldType": "AREACODE",
                "operator": "="
            }
        ]
    }
]处理成{
    '0': [
        {
            "id": 5,
            "fieldType": "operator_number",
            "numOperator": "",
            "value": "121",
            "field": "count",
            "operator": "!="
        }
    ],

        '1': [
            {
                "id": 56,
                "fieldType": "operator_string",
                "numOperator": "",
                "value": "323",
                "field": "AREACODE",
                "operator": "="
            }
        ]
}