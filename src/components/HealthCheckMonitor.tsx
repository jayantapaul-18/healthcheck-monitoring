import React, { useRef, useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Switch, Button } from "antd";
import { Tag, Divider } from "antd";
import { Table, Space } from "antd";
import { Spin } from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import "../index.css";
import axios from "axios";
import apiClient from "../utils/apiClient";
import config from "../config.js";

// const isGreenCheck = true;
const greenCheck = "✅";
const redCross = "❌";
const amber = "";
const { Header, Content, Footer } = Layout;

const columns: any = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (spin: any) => {
      return <Spin size="small" />;
    },
  },
  {
    title: "",
    dataIndex: "httpStatusCode",
    key: "httpStatusCode",
    render: (httpStatusCode: any) => (
      <>{httpStatusCode <= 200 ? greenCheck : redCross}</>
    ),
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value: any, record: any) =>
      record.httpStatusCode.startsWith(value),
    width: "5%",
  },
  {
    title: "API Route",
    dataIndex: "path",
    key: "path",
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: "Status Code",
    dataIndex: "httpStatusCode",
    key: "httpStatusCode",
    render: (text: any) => <a> {text}</a>,
    // render: (
    //     <>
    //     {
    //         if (httpStatusCode === 200) {
    //           color = 'green';
    //         }
    //         return (
    //           <Tag color={color} key={httpStatusCode}>
    //           </Tag>
    //         );
    //       }
    //     </>
    //   ),
  },
  // {
  //   title: "Response",
  //   dataIndex: "response",
  //   key: "response",
  //   render: (response: any) => <></>,
  // },
  {
    title: "Last Time Checked",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status: any) => (
      <>
        {status.map((stat: any) => {
          let color = stat.length > 5 ? "green" : "green";
          if (stat === "failed") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={stat}>
              {stat.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "State",
    key: "state",
    render: (text: any, record: any) => (
      <Space size="small">
        <a>Disable</a>
        <Switch defaultChecked onChange={onChange} />
        <a>Enable </a>
      </Space>
    ),
  },
];

// console.log(typeof(data))

function onChange(checked: any) {
  console.log(`switch to ${checked}`);
}

function onFilter(pagination: any, filters: any, sorter: any, extra: any) {
  console.log("params", pagination, filters, sorter, extra);
}

const HealthCheckMonitor = () => {
  const [isLoading, setisLoading] = useState(true);
  const [getResult, setResult] = useState();
  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };
  async function getHealthStatus() {
    try {
      const res = await apiClient.get("/app/v1/health-status");
      const result = res.data;
      console.log(result);
      setisLoading(false);
      setResult(result);
      // histogram.recordValue(result);
    } catch (err: any) {
      // setResult(fortmatResponse(err.response?.data || err));
      console.error(err);
    }
  }

  useEffect(() => {
    const INTERVAL = config.REQUEST_INTERVAL;
    const timer = setInterval(getHealthStatus, INTERVAL);
    console.log("Request INTERVAL: ", INTERVAL + " ms");
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Spin size="small" />
      {/* <button className="btn btn-sm btn-primary" onClick={getHealthStatus}>HealthStatus</button> */}

      {/* {isLoading ? (
        <div className='spinner-border text-primary' role='status'>
          {' '}
          <span className='sr-only'>Loading...</span>{' '}
        </div>
      ) : (
				data.map(health => {
							<p key={health.key}>{health.status}</p>
				})
      )} */}

      <Table
        columns={columns}
        onChange={onFilter}
        expandable={{
          expandedRowRender: (getResult: any) => (
            <p style={{ margin: 0, color: "red" }}>{getResult.response}</p>
          ),
          rowExpandable: (getResult: any) => getResult.status[0] !== "success",
          //   expandIcon: ({ expanded, onExpand, record }) =>
          // expanded ? (
          //   <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
          // ) : (
          //   <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
          // )
        }}
        dataSource={getResult}
        rowClassName={(getResult: any, index: any) => "red"}
        size="small"
      />
    </>
  );
};

export default HealthCheckMonitor;
