import React from 'react';
import { Form, Input, Button } from 'antd';

const GeneralSettingsForm = () => {
  const onFinish = (values) => {
    console.log('General settings form values:', values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Restaurant Name"
        name="restaurantName"
        rules={[
          { required: true, message: 'Please enter your restaurant name!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contact Email"
        name="contactEmail"
        rules={[
          { required: true, message: 'Please enter your contact email!' },
          { type: 'email', message: 'Please enter a valid email address!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneralSettingsForm;
