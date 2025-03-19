/*
 * @Author: 肖玲
 * @Date: 2025-03-17 15:49:39
 * @LastEditTime: 2025-03-19 19:28:25
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /javascript_Handwritten_code/TableComponent.jsx
 * 文件备注
 */
/*
 * @Author: 肖玲
 * @Date: 2025-03-17 15:10:02
 * @LastEditTime: 2025-03-17 15:35:13
 * @LastEditors: 肖玲
 * @Description: 
 * @FilePath: /datatist-wolf-touch-static/touch/src/pages/TableComponent.jsx
 * 文件备注
 */
import React, { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import axios from 'axios';

export default function TableComponent () {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }
    ];// 表格列配置
    const [dataSource, setDataSource] = useState([]); // 表格数据
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    }); // 分页配置

    const [searValue, setSearValue] = useState('') // 搜索值

    /**
     * 初始化列表数据
     */
    useEffect(() => {
        getDataSource()
    }, [searValue, pagination.current, pagination.pageSize])

    /**
     * 筛选事件处理函数
     * @param {*} val 
     */
    const onSearch = (val) => {
        console.log(val)
        setSearValue(val)
        // getDataSource(val)
    }

    /**
     * 模拟请求接口获取列表数据
     */
    const getDataSource = async (searValue) => {
        const params = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            inputValue: searValue// 搜索条件
        }
        try {
            const { data } = await axios.get('/user/query.do', params)
            setDataSource(data.list || [])
            setPagination(prev => (
                {
                    ...prev,
                    total: data.total
                }
            ))
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 分页事件处理函数
     * @param {*} page 
     * @param {*} pageSize 
     */
    const onPageChange = (page, pageSize) => {
        setPagination(prev => ({
            ...prev,
            current: page,
            pageSize
        }))
        // getDataSource()
    }
    return (
        <div>
            <div>
                <Input.Search
                    placeholder="请输入关键字"
                    onSearch={onSearch}
                    enterButton
                    allowClear
                />
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        onChange: onPageChange
                    }}
                    rowKey="id"
                />
            </div>
        </div>
    )
};

// const privateInput = (str) => {
//     if (/^[0-9]{11}$/.test(str)) {
//         return str.slice(0, 3) + '****' + str.slice(7)
//     } else {
//         return str
//     }
// }



//主线程代码const worker=new Worker('worker.js');//创建一个新的Web Worker
// worker.postMessage({start:0,end:1000000);/向Web Worker.发送消息
//     worker.onmessage function(event){const result event.data;console.log('任务完成：'，result); };
//     //worker.js-Web Worker代a码
//     onmessage =  function(event){const start event.data.start;const end
//     event.data.end;let sum 0;for (let i start;i <end;i++){
//     sum +=i;
//     }
//     postMessage(sum);//向主线程发送消息
//     };
