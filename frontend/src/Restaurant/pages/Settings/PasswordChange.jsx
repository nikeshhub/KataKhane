import React from 'react';
import { Form, Input, Button } from 'antd';

const PasswordChangeForm = () => {
    const onFinish = (values) => {
        console.log('Password change form values:', values);
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                    { required: true, message: 'Please enter your current password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                    { required: true, message: 'Please enter your new password!' },
                    {
                        min: 8,
                        message: 'Password must be at least 8 characters long!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                dependencies={['newPassword']}
                rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PasswordChangeForm;
