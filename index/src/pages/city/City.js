import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import "../../style/common.less";
import {
  Card,
  Form,
  Select,
  Button,
  Table,
  Modal,
  message,
  Pagination,
} from "antd";
import baseUrl from "../../utils/data";
// const { Option } = Select;
export default function City() {
  const [page, setpage] = useState(1);
  const [pageTotal, setpageTotal] = useState(0);
  const [list, setlist] = useState([]);
  const [isShow, setisShow] = useState(false);
  const myref = React.createRef();
  useEffect(() => {
    let flag = true;
    axios
      .get(baseUrl + "/open_city", {
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
          setpageTotal(res.data.result.total)
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
      title: "城市ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "城市名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "用车模式",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "营运模式",
      dataIndex: "op_mode",
      key: "op_mode",
    },
    {
      title: "授权加盟商",
      dataIndex: "franchisee_name",
      key: "franchisee_name",
    },
    {
      title: "城市管理员",
      dataIndex: "city_admins",
      key: "city_admins",
      render(arr) {
        return arr.map((item) => item.user_name).join(",");
      },
    },
    {
      title: "城市开通时间",
      dataIndex: "open_time",
      key: "open_time",
    },
    {
      title: "操作时间",
      dataIndex: "update_time",
      key: "update_time",
    },
    {
      title: "操作人",
      dataIndex: "sys_user_name",
      key: "sys_user_name",
    },
  ];
  const handleOpenCity = () => {
    setisShow(true);
  };
  const handleSubmit = () => {
    let info = myref.current.getFieldsValue();
    console.log(info);
    axios
      .get(baseUrl + "/city/open", {
        params: info,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === "0") {
          message.success("开通成功");
          setisShow(false);
        }
      });
  };
  return (
    <div>
      <Card>
        <Form
          name="basic"
          initialValues={{
            remember: true,
            city: "全部",
            mode: "全部",
            opMode: "全部",
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
            label="用车模式"
            name="mode"
            rules={[
              {
                message: "Please input your Mode!",
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
                  value: "指定停车点模式",
                  label: "指定停车点模式",
                },
                {
                  value: "禁停区模式",
                  label: "禁停区模式",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="营运模式"
            name="opMode"
            rules={[
              {
                message: "Please input your mode!",
              },
            ]}
            style={{ margin: " 0 20px" }}
          >
            <Select
              style={{ width: 80 }}
              options={[
                {
                  value: "全部",
                  label: "全部",
                },
                {
                  value: "自营",
                  label: "自营",
                },
                {
                  value: "加盟",
                  label: "加盟",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="加盟商权限状态"
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
                  value: "已授权",
                  label: "已授权",
                },
                {
                  value: "未授权",
                  label: "未授权",
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
        <Button type="primary" onClick={handleOpenCity}>
          开通城市
        </Button>
      </Card>
      <div className="content-wrap">
        <Table
          dataSource={dataSource}
          pagination={false}
          columns={columns}
          bordered
        />
        <div style={{textAlign:'center',margin:'20px 0'}}>
          <Pagination current={page} total={pageTotal} showSizeChanger={false} onChange={(page,pageSize)=>{
            setpage(page)
          }}/>
        </div>
      </div>

      <Modal
        title="开通城市"
        open={isShow}
        onCancel={() => {
          setisShow(false);
        }}
        onOk={handleSubmit}
      >
        <OpenCityForm ref={myref}></OpenCityForm>{" "}
      </Modal>
    </div>
  );
}
const OpenCityForm = forwardRef((props, ref) => {
  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };
  const handleChange = () => {
    console.log(form.getFieldsValue());
  };
  // const formRef=useRef()
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      layout="horizontal"
      form={form}
      ref={ref}
      initialValues={{
        remember: true,
        selectCity: "全部",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="选择城市"
        name="selectCity"
        {...formLayout}
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Select
          style={{ width: 100 }}
          onChange={handleChange}
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
        ></Select>
      </Form.Item>
      <Form.Item
        label="营运模式"
        name="mode"
        {...formLayout}
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Select
          style={{ width: 100 }}
          onChange={handleChange}
          options={[
            {
              value: "自营",
              label: "自营",
            },
            {
              value: "加盟",
              label: "加盟",
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item
        label="用车模式"
        name="op_mode "
        {...formLayout}
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Select
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: "指定停车点",
              label: "指定停车点",
            },
            {
              value: "禁停区",
              label: "禁停区",
            },
          ]}
        ></Select>
      </Form.Item>
    </Form>
  );
});
