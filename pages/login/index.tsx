import * as React from 'react';
import styles from './style.module.css';

import { Layout, Typography, Button, Checkbox, Form, Input  } from 'antd';
const { Content } = Layout;
const { Title } = Typography;

export interface ILoginProps {
}

export default function Login (props: ILoginProps) {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content className={styles.content}>
      <div className={styles.container_form}>
                <Title>Iniciar Sesión</Title>
                <Form
                    name="login"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    className={styles.form}
                >
                    <Form.Item
                        label="Correo"
                        name="email"
                        rules={[{ required: true, message: 'Por favor, ingrese su correo' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <a style={{textAlign: 'center', display: 'block'}}>¿Olvidaste tu contraseña?</a>

                    <Form.Item style={{margin: 'auto', display: 'block', width: 100}} >
                        <Button type="primary" htmlType="submit">
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    </Content>
  );
}
