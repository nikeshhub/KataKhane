import React, { useState, useContext, useEffect } from "react";
import "./Reviews.scss";
import {
  Table,
  Select,
  Input,
  Button,
  Space,
  Avatar,
  Modal,
  Form,
  message,
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../../context/authContext";

const { Option } = Select;

const ReviewListPage = () => {
  const { currentRestaurant } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const restaurantId = currentRestaurant.restaurant_id;
    fetch(
      `http://localhost:8800/api/review/getReviewListByRestaurantID?review_restaurant_id=${restaurantId}`
    )
      .then((response) => response.json())
      .then((data) => setReviewData(data));
  }, [currentRestaurant]);

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record) => (
        <Space>
          <Avatar className="profile-picture" src={record.profile_picture} />
          <div>
            <div>{text}</div>
            <div className="email">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Review",
      dataIndex: "review_text",
      key: "review_text",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="action-buttons">
          <Button type="primary" shape="circle" icon={<MailOutlined />} />
          <Button type="primary" shape="circle" icon={<EyeOutlined />} />

        </div>
      ),
    },
  ];

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (values) => {
    console.log("Received filter values:", values);
  };

  return (
    <div className="review-list-page">
      <h1>Review List</h1>
      <div className="filter-section">
        <Form form={form} onFinish={onFinish} layout="inline">
          <Form.Item name="status">
            <Select placeholder="Status" style={{ width: 150 }}>
              <Option value="published">Published</Option>
              <Option value="unpublished">Unpublished</Option>
              <Option value="deleted">Deleted</Option>
            </Select>
          </Form.Item>
          <Form.Item name="search">
            <Input
              placeholder="Search"
              style={{
                width: 250,
              }}
              prefix={<SearchOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
              Filter
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary">Export CSV</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={reviewData}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Reply to Review"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  form.resetFields();
                  setVisible(false);
                  message.success("Reply sent successfully!");
                })
                .catch((err) => {
                  console.log("Error:", err);
                });
            }}
          >
            Send Reply
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="message"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <Input.TextArea placeholder="Enter your message" rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default ReviewListPage;
