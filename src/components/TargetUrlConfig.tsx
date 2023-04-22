import React, { useContext, useState, useEffect, useRef } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Switch, Button } from 'antd';
import { Tag, Divider } from 'antd';
import { Table, Space } from 'antd';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Input,Popconfirm, Form, InputRef } from 'antd';
import { FormInstance } from 'antd/lib/form';
import apiClient from '../utils/apiClient';

// const isGreenCheck = true;
const greenCheck = '✅';
const redCross = '❌';
const amber = '';

// const columns:any = [
//     {
//       title: '#',
//       dataIndex: 'key',
//       key: 'key',
//     },
//   {
//     title: 'protocol',
//     dataIndex: 'protocol',
//     key: 'protocol',
//     render: (protocol: any) => <>{protocol === 'https' ? greenCheck : redCross}</>,
//     filterMode: 'tree',
//     filterSearch: true,
//     onFilter: (value:any, record:any) => record.protocol.startsWith(value),
//     width: '5%',
//   },
//     {
//       title: 'API Route',
//       dataIndex: 'path',
//       key: 'path',
//       render: (text:any) => <a>{text}</a>,
//     },
//     {
//         title: 'Last Time Checked',
//         dataIndex: 'timestamp',
//         key: 'timestamp',
//       },
//     {
//       title: 'State',
//       key: 'state',
//       render: (text:any, record:any) => (
//         <Space size="small">
//               <a>Disable</a>
//               {/* <Switch defaultChecked onChange={onChange} /> */}
//               <Switch onClick={() => setActive(!active)} checked={active} />
//               <a>Enable </a>
//           </Space>

//       ),
//     },
//   ];

  // console.log(typeof(data))

  function onChange(checked:any) {
    console.log(`switch to ${checked}`);
  }

  function onFilter(pagination:any, filters:any, sorter:any, extra:any) {
    console.log('params', pagination, filters, sorter, extra);
  }


const TargetUrlConfig = () => {
    const [active, setActive] = useState(true);

    const [isLoading, setisLoading] = useState(true);
    const [getResult, setResult] = useState();
    const fortmatResponse = (res:any) => {
        return JSON.stringify(res, null, 2);
      };
    async function targetUrl() {
        try {
            const res = await apiClient.get("/app/v1/target-url")
            const result = res.data;
            console.log((result));
           (setisLoading(false));
            setResult(result)
            // histogram.recordValue(result);

        } catch (err:any) {
            // setResult(fortmatResponse(err.response?.data || err));
            console.error(err);
        }
    }

    useEffect(() => {
        const INTERVAL = 15000;
        const timer = setInterval(targetUrl, INTERVAL);
        console.log("Request INTERVAL: ",INTERVAL + " ms");
        return () => clearInterval(timer);
      }, []);


      const columns:any = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
      {
        title: 'protocol',
        dataIndex: 'protocol',
        key: 'protocol',
        render: (protocol: any) => <>{protocol === 'https' ? greenCheck : redCross}</>,
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value:any, record:any) => record.protocol.startsWith(value),
        width: '5%',
      },
        {
          title: 'API Route',
          dataIndex: 'path',
          key: 'path',
          render: (text:any) => <a>{text}</a>,
        },
        {
            title: 'Last Time Checked',
            dataIndex: 'timestamp',
            key: 'timestamp',
          },
          {
              title: 'State',
              key: 'state',
              render: (text: any, record: any) => (

            <Space size="small">
                  <a>Disable</a>
                  {/* <Switch defaultChecked onChange={onChange} /> */}
                  <Switch onClick={() => setActive(!active)} checked={active} />
                  <a>Enable </a>
              </Space>

          ),
        },
      ];


    return (
        <>
             <Spin size="small" />
    {/* <button className="btn btn-sm btn-primary" onClick={targetUrl}>HealthStatus</button> */}

    {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
            </Button>

         <Table
          components={(components:any)}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={(dataSource:any)}
          columns={columns as ColumnTypes}
            /> */}

    <Table columns={columns} onChange={onFilter} expandable={{
      expandedRowRender: (getResult:any) => <p style={{ margin: 0 }}>{getResult.response}</p>,
    //   rowExpandable: (getResult:any) => getResult.status[0] !== 'success',
            }}
      dataSource={getResult} rowClassName={(getResult:any, index:any) => (getResult.httpStatusCode > 200 ? "red" : "green")} size="small" />


        </>
      );
  }

  export default TargetUrlConfig;
