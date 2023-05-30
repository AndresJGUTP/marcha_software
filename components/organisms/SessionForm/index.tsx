import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Anchor, Divider } from 'antd';
import SelectDocumentType from 'components/molecules/SelectDocumentType';
import ModalStatus from 'components/molecules/ModalStatus';

import styles from "./style.module.css";

import { useRouter } from 'next/router'
import Title from 'antd/lib/typography/Title';

const { Link } = Anchor;
const { TextArea } = Input;

const axios = require('axios').default;


interface ISessionFormProps {
    readonly sessionData?: Record<string, any>
    readonly patientData: Record<string, any>
    readonly parentData: Record<string, any>
    readonly disabledForm?: boolean
}

const SessionForm: React.FC<ISessionFormProps> = ({ patientData, parentData, sessionData, disabledForm }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string>('');

    const [form] = Form.useForm();
    const router = useRouter()

    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 1000,
    });


    const RowForm = ({ label }: Record<string, any>) => <Row gutter={[12, 0]}>
        <Col span={6}>
            <span>{label}</span>
        </Col>
        <Col span={6}>
            <Row gutter={[6, 0]}>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
        <Col span={6}>
            <Row gutter={[6, 0]}>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
        <Col span={6}>
            <Row gutter={[6, 0]}>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
    </Row>

    const RowEncabezado = () => <Row>
        <Col span={6}>

        </Col>
        <Col span={6}>
            <span> Movilidad Articular </span>
            <Row>
                <Col span={12}>
                    <span> Izquierdo </span>
                </Col>
                <Col span={12}>
                    <span> Derecho </span>
                </Col>
            </Row>
        </Col>
        <Col span={6}>
            <span> Control Selectivo </span>
            <Row>
                <Col span={12}>
                    <span> Izquierdo </span>
                </Col>
                <Col span={12}>
                    <span> Derecho </span>
                </Col>
            </Row>
        </Col>
        <Col span={6}>
            <span> Fuerza Muscular </span>
            <Row>
                <Col span={12}>
                    <span> Izquierdo </span>
                </Col>
                <Col span={12}>
                    <span> Derecho </span>
                </Col>
            </Row>
        </Col>
    </Row>


    const createRow = (props: any) => <Row {...props['rowProps']}>
        {
            props['items'].map((item: any, idx: number) =>
                <Col span={item['span']} key={idx}>
                    {item['content']}
                </Col>)
        }
    </Row>


    useEffect(() => {
        if (!!patientData) {
            const patientName = parse_name(
                patientData['first_name'],
                patientData['second_name'],
                patientData['first_last_name'],
                patientData['second_last_name'],
            )

            const parentName = parse_name(
                parentData['first_name'],
                parentData['second_name'],
                parentData['first_last_name'],
                parentData['second_last_name'],
            )

            const { phone, email } = parentData

            form.setFieldsValue({
                ...patientData,
                ...{ phone, email },
                patientName,
                parentName
            });
        }
    }, [patientData])

    const onFinish = (values: any) => {
        setModalOpen(true)
        setRequestStatus('loading')

        if (!sessionData) {
            instance.post('/Session/', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: any) => {
                setRequestStatus('success')
            })
                .catch((error: any) => {
                    setRequestStatus('error')
                    console.log(error)
                });
        }
        else {
            instance.put(`/Session/${values['id']}/`, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: any) => {
                setRequestStatus('success')
            })
                .catch((error: any) => {
                    setRequestStatus('error')
                    console.log(error)
                });
        }
    }

    const parse_name = (first_name: string, second_name: string | null, first_last_name: string, second_last_name: string | null): string => {
        second_name = !!second_name ? second_name : ''
        second_last_name = !!second_last_name ? second_last_name : ''
        return `${first_name} ${second_name} ${first_last_name} ${second_last_name}`
    }

    return <div>
        <Anchor className={styles.anchorClassName} >
            <Link href="#datos_paciente" title="Datos del paciente" />
            <Link href="#datos_responsable" title="Datos del responsable" />
            <Link href="#datos_clinicos" title="Datos del clínicos" />
            <Link href="#examen_fisico" title="Examen Físico" />
            <Link href="#test_articular_muscular" title="Test Articular y Muscular" />
        </Anchor>


        <ModalStatus {...{
            requestStatus,
            successMessage: {
                title: `Usuario ${!sessionData ? 'registrado' : 'modificado'} con éxito`
            },
            errorMessage: {
                title: "Ha ocurrido un error, por favor intentelo nuevamente",
            },
            modalProps: {
                centered: true,
                open: modalOpen,
                onOk: () => router.reload(),
                onCancel: () => requestStatus == 'error' ? setModalOpen(false) : router.push(router.asPath),
                okText: `${!sessionData ? 'Registrar' : 'Editar'} Otro Usuario`,
                cancelButtonProps: { hidden: true },
                closable: requestStatus == 'error',
            }
        }} />
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            layout="horizontal"
            className={styles.formStyles}
            onFinish={onFinish}
            id='userForm'
            disabled={disabledForm}
            form={form}
        >

            <div id="datos_paciente">
                <Divider orientation="left">Datos del paciente</Divider>
                <Form.Item label="Paciente" name="patientName" style={{marginBottom: '0.5em'}}>
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Número de documento Paciente" name="id" style={{marginBottom: '0.5em'}}>
                    <InputNumber controls={false} style={{ width: '100%' }} disabled />
                </Form.Item>

                <Form.Item label="Edad del Paciente" name="age" style={{marginBottom: '0.5em'}}>
                    <InputNumber controls={false} style={{ width: '100%' }} disabled />
                </Form.Item>

                <SelectDocumentType disabled />
            </div>

            <div id='datos_responsable'>
                <Divider orientation="left">Datos del responsable</Divider>
                <Form.Item label="Responsable" name="parentName" style={{marginBottom: '0.5em'}}>
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Número de documento Responsable" name="id_parent" style={{marginBottom: '0.5em'}}>
                    <InputNumber controls={false} style={{ width: '100%' }} disabled />
                </Form.Item>

                <SelectDocumentType disabled formItemProps={{style: {marginBottom: '0.5em'}}} />

                <Form.Item label="Teléfono" name="phone" style={{marginBottom: '0.5em'}}>
                    <InputNumber controls={false} style={{ width: '100%' }} disabled />
                </Form.Item>

                <Form.Item label="Correo electrónico" name="email" style={{marginBottom: '0.5em'}}>
                    <Input disabled />
                </Form.Item>
            </div>

            <div id="datos_clinicos">
                <Divider orientation="left">Datos del clínicos</Divider>
                <Form.Item label="Motivo Consulta" name="motivo_consulta" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Expectativas" name="expectativas" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Alergias" name="alergias" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Diagnosticos Médicos" name="diagnosticos_medicos" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={5} />
                </Form.Item>
            </div>

            <div id="examen_fisico">
                <Divider orientation="left">Examen Físico</Divider>

                <Row gutter={[24, 0]}>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Title level={5}> Reflejos OT </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6} className={styles.centerLabel}>
                                <span> Patelar </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Izquierdo" className={styles.columnItem} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Derecho" className={styles.columnItem} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Aquilano </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Title level={5}> Balance y Equilibrio </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Equilibrio Monopodal Derecho" className={styles.columnItem} style={{ fontSize: '8px', marginBottom: 0 }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Equilibrio Monopodal Izquierdo" className={styles.columnItem} style={{ fontSize: '8px' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={24}>
                                <Title level={5}> Varo/Valgo de Rodilla</Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Distancia Intercondilea (mm):" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Distancia Intermaleolar (mm):" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Perfil de Rodilla Derecho:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Perfil de Rodilla Izquierdo:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={24}>
                                <Title level={5} style={{ margin: 0 }}> Descripción Del Pie </Title>
                                <Title level={5} style={{ margin: 0 }}> CON APOYO </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6} className={styles.centerLabel}>
                                <span> Tobillo </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Izquierdo" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Derecho" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Retropie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Mediopie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Antepie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Hallux </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Title level={5} style={{ margin: 0 }}> Descripción Del Pie </Title>
                                <Title level={5} style={{ margin: 0 }}> SIN APOYO </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6} className={styles.centerLabel}>
                                <span> Tobillo </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Izquierdo" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Derecho" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Retropie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Mediopie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Antepie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Hallux </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Col>

                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Title level={5}> Medidas Antropométricas </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item label="Peso (Kg)" labelAlign='left' className={`${styles.columnItem} ${styles.columnItemNoMargin}`}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Talla (mm)" className={`${styles.columnItem} ${styles.columnItemNoMargin}`}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Longitud MID (mm)" className={styles.columnItem}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Longitud MII (mm)" className={styles.columnItem}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Title level={5}> Tono Muscular </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={10} >
                                <span> Hiperlaxitud Muscular : </span>
                            </Col>
                            <Col span={6}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Signos de Distonía" labelAlign='left' style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Tono Muscular" labelAlign='left'>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Title level={5}> Espasticidad (ASHWORTH) </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6} className={styles.centerLabel}>
                                <span> Flexores Cadera </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Izquierdo" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Derecho" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Isquiotibial </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Cuádriceps </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Gastrosoleo </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={24}>
                                <Title level={5}> Prueba 6 Minutos </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Frecuencia Cardiaca Inicial" labelCol={{ span: 12 }} labelAlign='left' style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Frecuencia Cardiaca Final" labelCol={{ span: 12 }} labelAlign='left' style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[12, 0]}>
                            <Col span={6} className={styles.centerLabel}>
                                <span> Tiempo </span>
                            </Col>
                            <Col span={6}>
                                <span> Distancia (m) </span>
                            </Col>
                            <Col span={6}>
                                <span> Distancia Acumulada (m) </span>
                            </Col>
                            <Col span={6}>
                                <span> Frecuencia Cardiaca </span>
                            </Col>
                        </Row>

                        {
                            [...Array(6)].map((i, idx) =>
                                <Row gutter={[12, 0]} key={idx}>
                                    <Col span={6} className={styles.centerLabel}>
                                        <span> {idx + 1} </span>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="" style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="" style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="" style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )
                        }

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Gasto Energético:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Velocidad (m/s):" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Escala de Borg:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Observaciones:" labelAlign='left' style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth} >
                                    <TextArea rows={2} />
                                </Form.Item>
                            </Col>
                        </Row>


                    </Col>
                </Row>

            </div>

            <div id="test_articular_muscular">
                <Divider orientation="left">Test Articular y Muscular</Divider>
                <Title level={5}>Tronco</Title>
                <Row>
                    <Col span={6}>
                        {/* <span> Tronco </span> */}
                    </Col>
                    <Col span={6}>
                        <span> Movilidad Articular </span>
                    </Col>
                    <Col span={6}>
                        <span> Control Selectivo </span>
                    </Col>
                    <Col span={6}>
                        <span> Fuerza Muscular </span>
                    </Col>
                </Row>
                <Row gutter={[12, 0]}>
                    <Col span={6}>
                        <span> Abdominales </span>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12, 0]}>
                    <Col span={6}>
                        <span> Lumbares </span>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Title level={5}>Cadera</Title>

                {RowEncabezado()}
                {RowForm({ label: 'Flexión' })}
                {RowForm({ label: 'Extensión' })}
                {RowForm({ label: 'Abducción' })}
                {RowForm({ label: 'Aducción' })}

                <Row>
                    <Col span={6}>
                        <span> Rot. Int. </span>
                    </Col>
                    <Col span={6}>
                        <Row gutter={[6, 0]}>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}> </Col>
                    <Col span={6}> </Col>
                </Row>

                <Row>
                    <Col span={6}>
                        <span> Rot. Ext. </span>
                    </Col>
                    <Col span={6}>
                        <Row gutter={[6, 0]}>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}> </Col>
                    <Col span={6}> </Col>
                </Row>

                <Row gutter={[24, 0]} >
                    <Col span={12}>
                        <Title level={5} > Retracciones Musculares </Title>
                    </Col>
                    <Col span={12}>
                        <Title level={5}>Perfil Torsional</Title>
                    </Col>
                </Row>

                <Row gutter={[24, 0]} >
                    <Col span={6}>
                        Signo de Thomas
                    </Col>
                    <Col span={6}>
                        <Row gutter={[6, 0]}>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        Anteversión Femoral
                    </Col>
                    <Col span={6}>
                        <Row gutter={[6, 0]}>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={[24, 0]} >
                    <Col span={6}>
                        Signo de Phelps
                    </Col>
                    <Col span={6}>
                        <Row gutter={[6, 0]}>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={[24, 0]} >
                    <Col span={6}>
                        Test de Ober
                    </Col>
                    <Col span={6}>
                        <Row gutter={[6, 0]}>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Title level={5}>Rodilla</Title>
                {RowEncabezado()}
                {RowForm({ label: 'Flexión' })}
                {RowForm({ label: 'Extensión' })}

                <Row gutter={[24, 0]} >
                    <Col span={12}>
                        <Title level={5} > Retracciones Musculares </Title>
                    </Col>
                    <Col span={12}>
                        <Title level={5}> Perfil Torsional y otros signos</Title>
                    </Col>
                </Row>

                {
                    [
                        ['Angulo Poplíteo', 'Angulo Muslo Pie'],
                        ['A. Poplíteo Cadera en Flex', 'Angulo Bimaleolar'],
                        ['Variación A. Poplíteo', 'Test 2do Dedo'],
                        ['Signo de Ely Duncan', 'Patela Alta'],
                        ['Déficit de Extensión activa en Supino', 'Peroné Corto']
                    ].map(([itemLeft, itemRight]: any, idx: number) => createRow({
                        rowProps: { gutter: [24, 0], key: idx },
                        items: [
                            {
                                span: 6,
                                content: itemLeft
                            },
                            {
                                span: 6,
                                content: createRow({
                                    rowProps: { gutter: [6, 0] },
                                    items: [
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        }
                                    ]
                                })
                            },
                            {
                                span: 6,
                                content: itemRight
                            },
                            {
                                span: 6,
                                content: createRow({
                                    rowProps: { gutter: [6, 0] },
                                    items: [
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        }
                                    ]
                                })
                            },
                        ]
                    })
                    )
                }


                <Title level={5}>Tobillo</Title>
                {RowEncabezado()}
                {RowForm({ label: 'Plantiflexión G' })}
                {RowForm({ label: 'Dorsiflexión' })}
                {
                    createRow({
                        rowProps: { gutter: [24, 0] },
                        items: [
                            {
                                span: 12,
                                content: 'Sóleo'
                            },
                            {
                                span: 6,
                                content: createRow({
                                    rowProps: { gutter: [6, 0] },
                                    items: [
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        }
                                    ]
                                })
                            },
                            {
                                span: 6,
                                content: ''
                            },
                        ]
                    })
                }
                {
                    createRow({
                        rowProps: { gutter: [24, 0] },
                        items: [
                            {
                                span: 6,
                                content: 'Signo de Silverskiold'
                            },
                            {
                                span: 6,
                                content: createRow({
                                    rowProps: { gutter: [6, 0] },
                                    items: [
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        }
                                    ]
                                })
                            },
                            {
                                span: 12,
                                content: ''
                            },
                        ]
                    })
                }

                <Title level={5}>Pie</Title>
                {RowEncabezado()}
                {RowForm({ label: 'Inversión' })}
                {RowForm({ label: 'Eversión' })}
                {
                    createRow({
                        rowProps: { gutter: [24, 0] },
                        items: [
                            {
                                span: 12,
                                content: 'Flexores Hallux'
                            },
                            {
                                span: 6,
                                content: createRow({
                                    rowProps: { gutter: [6, 0] },
                                    items: [
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        }
                                    ]
                                })
                            },
                            {
                                span: 6,
                                content: ''
                            },
                        ]
                    })
                }
                {
                    createRow({
                        rowProps: { gutter: [24, 0] },
                        items: [
                            {
                                span: 12,
                                content: 'Extensores Hallux'
                            },
                            {
                                span: 6,
                                content: createRow({
                                    rowProps: { gutter: [6, 0] },
                                    items: [
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }}>
                                                <Input />
                                            </Form.Item>
                                        }
                                    ]
                                })
                            },
                            {
                                span: 6,
                                content: ''
                            },
                        ]
                    })
                }


            </div>
        </Form>
    </div>
}

export default SessionForm;