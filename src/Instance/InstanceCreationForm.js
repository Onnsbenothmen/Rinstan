import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Switch, message } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddInstanceForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/addInstances', values);
      message.success(response.data.message);
    } catch (error) {
      message.error('Une erreur s\'est produite lors de l\'ajout de l\'instance.');
      console.error(error);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Ajouter une nouvelle instance :</h2>
          <Form
            name="basic"
            initialValues={{
              active: true,
              created_at: new Date().toISOString(),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email du président"
              name="president_email"
              rules={[{ required: true, message: 'Veuillez entrer l\'email du président!' }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Nom du conseil"
              name="council_name"
              rules={[{ required: true, message: 'Veuillez entrer le nom du conseil!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ville"
              name="ville"
              rules={[{ required: true, message: 'Veuillez selectionnée!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Active"
              name="active"
              valuePropName="checked"
            >
              <Switch defaultChecked />
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" loading={loading}>
                Ajouter Instance
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddInstanceForm;
