import React, {useState, useEffect} from 'react';
import styles from "./style.module.css";

import { useRouter } from 'next/router'

const axios = require('axios').default;

import {Form,Input, InputNumber} from 'antd';
import SelectDocumentType from 'components/molecules/SelectDocumentType';
import ModalStatus from 'components/molecules/ModalStatus';
import SelectParent from 'components/molecules/SelectParent';

interface IPatientFormProps {
    readonly patientData ? : Record<string, any>
    readonly disabledForm ? : boolean 
}

const PatientForm: React.FC<IPatientFormProps> = ({patientData, disabledForm}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string>('');
    const [idParent, setIdParent] = useState();
    
    const [form] = Form.useForm();
    const router = useRouter()

    const instance = axios.create({
        baseURL:  process.env.BASE_URL,
        timeout: 1000,
    });

    useEffect(() => {
        if(!!patientData){
            form.setFieldsValue({
                ...patientData
              });
            setIdParent(patientData!['id_parent'])
        }
    }, [patientData] )
    
    const onFinish = (values : any) => {
        setModalOpen(true)
        setRequestStatus('loading')

        values = {...values, 'id_parent': idParent}
        
        if(!patientData){
            instance.post('/patient/', values, {headers: {
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
            instance.put(`/patient/${values['id']}/`, values, {headers: {
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

    return <>
        <ModalStatus {...{
            requestStatus,
            successMessage: {
                title: `Usuario ${!patientData ? 'registrado' : 'modificado'} con éxito`
            },
            errorMessage: {
                title: "Ha ocurrido un error, por favor intentelo nuevamente",
                subTitle: requestStatus
            },
            modalProps: {
                centered: true,
                open: modalOpen,
                onOk: () => router.reload(),
                onCancel: () => requestStatus == 'error' ? setModalOpen(false) : router.push(router.asPath),
                okText: `${!patientData ? 'Registrar' : 'Editar'} Otro Usuario`,
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
            disabled={disabledForm}
            form={form}
        >
            {
                !patientData && <SelectParent {...{setIdParent}} />
            }

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
                {/* <Input disabled={!!patientData}/> */}
                <InputNumber controls={false} style={{width: '100%'}} disabled={!!patientData} />
            </Form.Item>

        </Form>
    </>
}

export default PatientForm;