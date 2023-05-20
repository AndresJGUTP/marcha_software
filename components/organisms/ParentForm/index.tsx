import React, {useState} from 'react';
import styles from "./style.module.css";

import { useRouter } from 'next/router'

const axios = require('axios').default;

import {Form,Input} from 'antd';
import SelectDocumentType from 'components/molecules/SelectDocumentType';
import ModalStatus from 'components/molecules/ModalStatus';

interface IParentFormProps {

}

const ParentForm: React.FC<IParentFormProps> = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string>('');

    const router = useRouter()

    const instance = axios.create({
        baseURL:  process.env.BASE_URL,
        timeout: 1000,
    });
    
    const onFinish = (values : any) => {
        setModalOpen(true)
        setRequestStatus('loading')

        instance.post('/parent/', values, {headers: {
            'Content-Type': 'application/json'
          }}).then((response: any) => {
            setRequestStatus('success')
        })
        .catch((error: any) => {
              setRequestStatus(error.message)
              console.log(error)
          });
    }

    return <>
        <ModalStatus {...{
            requestStatus,
            successMessage: {
                title: "Usuario registrado con éxito"
            },
            errorMessage: {
                title: "Ha ocurrido un error, por favor intentelo nuevamente",
                subTitle: requestStatus
            },
            modalProps: {
                centered: true,
                open: modalOpen,
                onOk: () => router.reload(),
                onCancel: () => router.push('/admin'),
                okText: 'Registrar Otro Usuario',
                cancelText: 'Inicio',
                closable: false,
            }
        }} />
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            className={styles.formStyles}
            onFinish={onFinish}
            id='userForm'
        >
            <Form.Item label="Primer Nombre" name="first_name" rules={[{required: true, message: 'Campo obligatorio'}]}>
                <Input />
            </Form.Item>

            <Form.Item label="Segundo Nombre" name="second_name">
                <Input />
            </Form.Item>

            <Form.Item label="Primer Apellido" name="first_last_name" rules={[{required: true, message: 'Campo obligatorio'}]}>
                <Input />
            </Form.Item>

            <Form.Item label="Segundo Apellido" name="second_last_name">
                <Input />
            </Form.Item>

            <SelectDocumentType />

            <Form.Item label="Número de documento" name="parent_document_number" rules={[{required: true, message: 'Campo obligatorio'}]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[
                {
                    type: 'email',
                    message: 'No se ha ingresado un correo válido',
                },
                {
                    required: true,
                    message: 'Campo obligatorio',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Número de contacto"
                rules={[{ required: true, message: 'Campo Obligatorio' }]}
            >
                <Input />
            </Form.Item>

        </Form>
    </>
}

export default ParentForm;