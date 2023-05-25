import React, {useState, useEffect} from 'react';
import styles from "./style.module.css";

import { useRouter } from 'next/router'

const axios = require('axios').default;

import {Form,Input, InputNumber} from 'antd';
import SelectDocumentType from 'components/molecules/SelectDocumentType';
import ModalStatus from 'components/molecules/ModalStatus';

interface IParentFormProps {
    readonly parentData ? : Record<string, any>
    readonly formDisabled ? : boolean
}

const ParentForm: React.FC<IParentFormProps> = ({parentData, formDisabled}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string>('');
    const [form] = Form.useForm();

    const router = useRouter()

    const instance = axios.create({
        baseURL:  process.env.BASE_URL,
        timeout: 1000,
    });
    
    const onFinish = (values : any) => {
        setModalOpen(true)
        setRequestStatus('loading')
        
        if(!parentData){
            instance.post('/parent/', values, {headers: {
                'Content-Type': 'application/json'
                }}).then((response: any) => {
                setRequestStatus('success')
            })
            .catch((error: any) => {
                    setRequestStatus('error')
                    console.log(error)
                });
            }
            else{
                instance.put(`/parent/${values['id']}/`, values, {headers: {
                    'Content-Type': 'application/json'
                    }}).then((response: any) => {
                    setRequestStatus('success')
                })
                .catch((error: any) => {
                        setRequestStatus('error')
                        console.log(error)
                    });
        }
    }

    useEffect(() => {
        if(!!parentData){
            form.setFieldsValue({
                ...parentData
              });
        }
    }, [parentData] )

    return <>
        <ModalStatus {...{
            requestStatus,
            successMessage: {
                title: `Usuario ${!parentData ? 'registrado' : 'modificado'} con éxito`
            },
            errorMessage: {
                title: "Ha ocurrido un error, por favor intentelo nuevamente",
            },
            modalProps: {
                centered: true,
                open: modalOpen,
                onOk: () => router.reload(),
                onCancel: () => requestStatus == 'error' ? setModalOpen(false) : router.push(router.asPath),
                okText: `${!parentData ? 'Registrar' : 'Editar'} Otro Usuario`,
                cancelButtonProps: {hidden: true},
                closable: requestStatus == 'error',
            }
        }} />
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            className={styles.formStyles}
            onFinish={onFinish}
            id='userForm'
            form={form}
            disabled={formDisabled}
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

            <Form.Item label="Número de documento" name="id" rules={[{required: true, message: 'Campo obligatorio'}]}>
                <InputNumber controls={false} style={{width: '100%'}} disabled={!!parentData} />
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
                <InputNumber controls={false} style={{width: '100%'}} />
            </Form.Item>

        </Form>
    </>
}

export default ParentForm;