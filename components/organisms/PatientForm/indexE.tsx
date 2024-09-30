import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Form, Input, InputNumber, Select } from 'antd';
import SelectDocumentType from 'components/molecules/SelectDocumentType';
import ModalStatus from 'components/molecules/ModalStatus';
import SelectParent from 'components/molecules/SelectUser';
import styles from "./style.module.css";

interface IPatientFormProps {
    readonly patientData?: Record<string, any>
    readonly disabledForm?: boolean
}

const PatientFormE: React.FC<IPatientFormProps> = ({ patientData, disabledForm }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string>('');
    const [parent, setParent] = useState<Record<string, any>>();
    const [isUserFound, setIsUserFound] = useState(false);
    const [isFormDisabled, setIsFormDisabled] = useState(true);

    const [form] = Form.useForm();
    const router = useRouter();

    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 60000,
    });

    useEffect(() => {
        if (!!patientData) {
            form.setFieldsValue({
                ...patientData
            });
            setParent(patientData);
            setIsUserFound(true);
            setIsFormDisabled(false);
        }
    }, [patientData]);

    const onFinish = (values: any) => {
        setModalOpen(true);
        setRequestStatus('loading');
        
        //console.log("Valores del formulario antes de enviar:", values);
        console.log("Responsable seleccionado:", parent);
    
        values = { ...values, 'id_parent': parent!['id_parent'] };
        
        console.log("Valores del formulario después de agregar id_parent:", values);
    
        if (!patientData) {
            instance.post('/patient/', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: any) => {
                setRequestStatus('success');
            }).catch((error: any) => {
                setRequestStatus('error');
                console.log("Error en la solicitud POST:", error);
            });
        } else {
            instance.put(`/patient/${values['id']}/`, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: any) => {
                setRequestStatus('success');
            }).catch((error: any) => {
                setRequestStatus('error');
                console.log("Error en la solicitud PUT:", error);
            });
        }
    };
    

    return (
        <>
            <ModalStatus {...{
                requestStatus,
                successMessage: {
                    title: `Usuario ${!patientData ? 'registrado' : 'modificado'} con éxito`
                },
                errorMessage: {
                    title: "Ha ocurrido un error, por favor intentelo nuevamente",
                },
                modalProps: {
                    centered: true,
                    open: modalOpen,
                    onOk: () => router.reload(),
                    onCancel: () => requestStatus === 'error' ? setModalOpen(false) : router.push(router.asPath),
                    okText: `${!patientData ? 'Registrar' : 'Editar'} Otro Usuario`,
                    cancelButtonProps: { hidden: true },
                    closable: requestStatus === 'error',
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
            >
                {!patientData && (
                    <SelectParent
                        user={parent}
                        setUser={setParent}
                        endpoint='/parent/'
                        tooltip='Cada paciente debe tener un responsable. Si este no existe, se debe crear primero'
                        userType='Responsable'
                        setIsUserFound={(value: boolean) => {
                            setIsUserFound(value);
                            setIsFormDisabled(!value);
                        }}
                    />
                )}

                <Form.Item label="Primer Nombre" name="first_name" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                    <Input disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item label="Segundo Nombre" name="second_name">
                    <Input disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item label="Primer Apellido" name="first_last_name" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                    <Input disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item label="Segundo Apellido" name="second_last_name">
                    <Input disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item
                    label="Sexo"
                    name="sex"
                    rules={[{ required: true, message: 'Campo obligatorio' }]}
                >
                    <Select disabled={isFormDisabled}>
                        <Select.Option value="M">Masculino</Select.Option>
                        <Select.Option value="F">Femenino</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Edad" name="age" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                    <InputNumber controls={false} style={{ width: '100%' }} disabled={isFormDisabled} />
                </Form.Item>

                <SelectDocumentType disabled={isFormDisabled} />

                <Form.Item label="Número de documento" name="id" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                    <InputNumber controls={false} style={{ width: '100%' }} disabled={!!patientData || isFormDisabled} />
                </Form.Item>

            </Form>
        </>
    );
}

export default PatientFormE;
