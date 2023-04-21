import { Layout, Typography, Button, Checkbox, Form, Input  } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import styles from './style.module.css';
const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const SignUp: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };

    return(
    <Layout className={styles.layout}>
        {/* <SignUpHeader /> */}
        <Content className={styles.content}>

            <div className={styles.context}>
                <Title className={styles.titles}>Sistema de Visualización y Reportes</Title>
                <Title level={3} >Laboratorio de marcha Salud Comfamiliar</Title>
                <div className={styles.context_image}></div>
            </div>

            <div className={styles.form_content}>
                <Title>Registro</Title>
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
                        label="Nombre"
                        name="name"
                        rules={[{ required: true, message: 'Por favor, ingrese su nombre' }]}
                    >
                        <Input />
                    </Form.Item>

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

                    <Form.Item 
                        name="terms" 
                        valuePropName="checked" 
                        wrapperCol={{ offset: 1, span: 16 }}
                        rules={[{ required: true, message: 'Debes aceptar los términos y condiciones'}]}
                        >
                        <Checkbox>Acepto los términos y condiciones</Checkbox>
                    </Form.Item>

                    <Form.Item style={{margin: 'auto', display: 'block', width: 100}} >
                        <Button type="primary" htmlType="submit">
                            Registrar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Content>
        <Footer></Footer>
    </Layout>
    )
}

export default SignUp;
