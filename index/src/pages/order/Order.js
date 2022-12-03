import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/common.less";
import {
  Card,
  Form,
  Select,
  Button,
  Table,
  Modal,
  Pagination,
  DatePicker,
  message,
  Radio
} from "antd";
import baseUrl from "../../utils/data";
// const { Option } = Select;
export default function City(props) {
  const [page, setpage] = useState(1);
  const [pageTotal, setpageTotal] = useState(0);
  const [list, setlist] = useState([]);
  const [finishModal, setfinishModal] = useState(false);
  const [finishInfo, setfinishInfo] = useState("");
  // const [selectedRowKeys, setselectedRowKeys] = useState()
  const [selectedItem, setselectedItem] = useState('')
  useEffect(() => {
    let flag = true;
    axios
      .get(baseUrl + "/order/list", {
        params: {
          page: page,
        },
      })
      .then((res) => {
        if (flag) {
          setlist(
            res.data.result.item_list.map((item, index) => {
              item.key = index;
              return item;
            })
          );
          // setpage(res.data.result.page);
          setpageTotal(res.data.result.total);
        }
      });
    // let _this=this
    return () => {
      flag = false;
    };
  }, [page]);

  const dataSource = [...list];

  const columns = [
    {
      title: "订单编号",
      dataIndex: "order_sn",
      key: "order_sn",
    },
    {
      title: "车辆编号",
      dataIndex: "bike_sn",
      key: "bike_sn",
    },
    {
      title: "用户名",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "里程",
      dataIndex: "distance",
      key: "distance",
      render(distance){
        return distance/1000 + 'Km';
    }
    },
    {
      title: "行驶时长",
      dataIndex: "total_time",
      key: "total_time",
      //   render(arr) {
      //     return arr.map((item) => item.user_name).join(",");
      //   },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "开始时间",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "结束时间",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "订单金额",
      dataIndex: "total_fee",
      key: "total_fee",
    },
    {
      title: "实付金额",
      dataIndex: "user_pay",
      key: "user_pay",
    },
  ];
  const handleFinish = () => {
    if(!selectedItem){
        Modal.info({
            title: '信息',
            content: '请选择一条订单进行结束'
        })
        return
    }
    axios
      .get(baseUrl + "/order/ebike_info", {
        params: {
          orderId: selectedItem[0].id,
        },
      })
      .then((res) => {
        setfinishModal(true);
        setfinishInfo(res.data.result);
      });
  };
  const handleFinishOrder = () => {
    axios
    .get(baseUrl + "/order/finish_order", {
      params: {
        orderId: selectedItem[0].id,
      },
    })
    .then((res) => {
        console.log(res);
      if(res.data.code==='0'){
        message.success('结束订单成功')
        setfinishModal(false);
      }
    });
  };
  const openOrderDetail=()=>{
    console.log(props);
    if(!selectedItem){
        message.info({
            title: '信息',
            content: '请选择一条订单进行结束'
        })
        return
    }
    props.history.push('/common/order/detail/'+selectedItem[0].id)
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };
  const rowSelection = {
    onChange: (selectedRowKeys,selectedRows) => {
        console.log(selectedRowKeys,selectedRows);
        // setselectedRowKeys(selectedRowKeys)
        setselectedItem(selectedRows)
    },
  };
  const [selectionType,setSelectionType] = useState('radio');
  return (
    <div>
      <Card>
        <Form
          name="basic"
          initialValues={{
            remember: true,
            city: "全部",
            status: "全部",
          }}
          layout="inline"
          autoComplete="off"
        >
          <Form.Item
            label="城市"
            name="city"
            rules={[
              {
                message: "Please input your City!",
              },
            ]}
            style={{ margin: " 0 20px" }}
          >
            <Select
              style={{ width: 100 }}
              options={[
                {
                  value: "全部",
                  label: "全部",
                },
                {
                  value: "北京市",
                  label: "北京市",
                },
                {
                  value: "天津市",
                  label: "天津市",
                },
                {
                  value: "深圳市",
                  label: "深圳市",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="订单时间"
            name="mode"
            rules={[
              {
                message: "Please input your Mode!",
              },
            ]}
            style={{ margin: " 0 20px" }}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item style={{ margin: " 0 5px" }}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="订单状态"
            name="status"
            rules={[
              {
                message: "Please input your status!",
              },
            ]}
            style={{ margin: "0 20px" }}
          >
            <Select
              style={{ width: 80 }}
              options={[
                {
                  value: "全部",
                  label: "全部",
                },
                {
                  value: "进行中",
                  label: "进行中",
                },
                {
                  value: "结束行程",
                  label: "结束行程",
                },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ margin: "0 20px" }}>
            <Button type="primary" style={{ margin: "0 20px" }}>
              查询
            </Button>
            <Button>重置</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Button  type="primary" onClick={openOrderDetail}>
          订单详情
        </Button>
        <Button onClick={handleFinish} type="primary">
          结束订单
        </Button>
      </Card>
      <div className="content-wrap">
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
        style={{display:'none'}}
      >
        <Radio value="radio">radio</Radio>
      </Radio.Group>

        <Table
          dataSource={dataSource}
          pagination={false}
          columns={columns}
          bordered
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
        />
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Pagination
            current={page}
            total={pageTotal}
            showSizeChanger={false}
            onChange={(page, pageSize) => {
              setpage(page);
            }}
          />
        </div>
      </div>

      <Modal
        title="结束订单"
        open={finishModal}
        onCancel={() => {
          setfinishModal(false);
        }}
        onOk={handleFinishOrder}
      >
        <Form layout="horizontal">
          <Form.Item label="车辆编号" {...formItemLayout}>
            {finishInfo.bike_sn}
          </Form.Item>
          <Form.Item label="剩余电量" {...formItemLayout}>
            {finishInfo.battery+'%'}
          </Form.Item>
          <Form.Item label="行程开始时间" {...formItemLayout}>
            {finishInfo.start_time}
          </Form.Item>
          <Form.Item label="当前位置" {...formItemLayout}>
            {finishInfo.location}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
