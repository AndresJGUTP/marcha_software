import { Layout, Typography, Button, notification, Form, Input } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { resetUser, setUser } from 'lib/states/user';
import { useRouter } from 'next/router';

const axios = require('axios').default;

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const SignUp: React.FC = () => {

    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 60000,
    });

    const router = useRouter();

    const dispatch = useDispatch()

    const onFinish = (values: any) => {

        instance.get(
            `/user/login`, {
            auth: {
                username: values.email,
                password: values.password
            }
        }).then((response: any) => {
            console.log(response.status)
                dispatch(setUser({
                    id: 0,
                    name: 'andres',
                    email: 'email',
                    isAuthenticated: true,
                }))
                router.push('/')
        }).catch((error: any) => {
            dispatch(resetUser())
            api['warning']({
                message: 'Datos Incorrectos',
                description:
                    'El correo o la contraseña son incorrectos',
            });
        });

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [api, contextHolder] = notification.useNotification();

    return (
        <Layout className={styles.layout}>
            {contextHolder}
            <Content className={styles.content}>

                <div className={styles.context}>
                    <Title className={styles.titles}>Sistema de Visualización y Reportes</Title>
                    <Title level={3} >Laboratorio de marcha Salud Comfamiliar</Title>
                    <div className={styles.context_image}></div>
                </div>

                <div className={styles.form_content}>
                    <Title style={{ marginBottom: '1em' }} >Iniciar Sesión</Title>
                    <Form
                        name="signup"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
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

                        <Form.Item style={{ margin: 'auto', display: 'block', width: 100 }} >
                            <Button type="primary" htmlType="submit">
                                Entrar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    )
}

export default SignUp;
