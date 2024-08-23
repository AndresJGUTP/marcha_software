import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Anchor, Divider, message, Switch, Select } from 'antd';
import SelectDocumentType from 'components/molecules/SelectDocumentType';
import ModalStatus from 'components/molecules/ModalStatus';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import styles from "./style.module.css";

import { useRouter } from 'next/router'
import Title from 'antd/lib/typography/Title';
import { HIPERLAXITUD_CHOICES, PIE_CHOICES, RODILLA_PATELA_PERONE_CHOICES, SIGNOS_RETRACCION_MUSCULAR_CHOICES } from 'constants/SessionForm_Choices';

const { Link } = Anchor;
const { TextArea } = Input;

const axios = require('axios').default;


interface ISessionFormProps {
    readonly sessionData?: Record<string, any> | null
    readonly patientData: Record<string, any>
    readonly parentData: Record<string, any>
    readonly setSessionId?: Function
    readonly disabledForm?: boolean
    readonly formSessionRef : any
}

const SessionForm: React.FC<ISessionFormProps> = ({ patientData, parentData, sessionData, disabledForm, formSessionRef, setSessionId }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string>('');

    const [form] = Form.useForm();
    const router = useRouter()

    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 60000,
    });


    const RowForm = ({ label, name }: Record<string, any>) => {
    let names = [
        `${name}_movilidad`,
        `${name}_control_selectivo`,
        `${name}_fuerza_muscular`,
    ]
    return <Row gutter={[12, 0]}>
        <Col span={6}>
            <span>{label}</span>
        </Col>
        <Col span={6}>
            <Row gutter={[6, 0]}>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${names[0]}_i`}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${names[0]}_d`}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
        <Col span={6}>
            <Row gutter={[6, 0]}>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${names[1]}_i`}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${names[1]}_d`}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
        <Col span={6}>
            <Row gutter={[6, 0]}>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${names[2]}_i`}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${names[2]}_d`}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
    </Row>
    }

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
        if(!!sessionData){
            form.setFieldsValue({
                ...sessionData,
              });
        }
    }, [])

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

        let dataSubmit : any = {}
        
        Object.keys(values).forEach( (key, index) => dataSubmit[key] = values[key] || null )
        // console.log(values || null)
        // setModalOpen(true)
        // setRequestStatus('loading')

        delete dataSubmit.email
        delete dataSubmit.age 
        delete dataSubmit.ID_document_type
        delete dataSubmit.id
        delete dataSubmit.id_parent
        delete dataSubmit.parentName
        delete dataSubmit.patientName
        delete dataSubmit.phone

        dataSubmit = {
            ...dataSubmit, 
            patient_id: patientData['id'],
            examen_medico: dataSubmit['examen_medico'] || false,
            examen_computarizado: dataSubmit['examen_computarizado'] || false,
            podobarometria: dataSubmit['podobarometria'] || false,
            prueba_6_minutos: dataSubmit['prueba_6_minutos'] || false,
            video_analogo: dataSubmit['video_analogo'] || false,
            tobillo_signo_silverskiold_movilidad_d: dataSubmit['tobillo_signo_silverskiold_movilidad_d'] || 0,
            tobillo_signo_silverskiold_movilidad_i: dataSubmit['tobillo_signo_silverskiold_movilidad_i'] || 0,
            signo_ely_duncan_d: dataSubmit['signo_ely_duncan_d'] || 0,
            signo_ely_duncan_i: dataSubmit['signo_ely_duncan_i'] || 0,
            signo_phelps_d: dataSubmit['signo_phelps_d'] || 0,
            signo_phelps_i: dataSubmit['signo_phelps_i'] || 0,
            test_ober_d: dataSubmit['test_ober_d'] || 0,
            test_ober_i: dataSubmit['test_ober_i'] || 0,
            descr_pie_apoyo_tobillo_d: dataSubmit['descr_pie_apoyo_tobillo_d'] || 0,
            descr_pie_apoyo_tobillo_i: dataSubmit['descr_pie_apoyo_tobillo_i'] || 0,
            descr_pie_apoyo_retropie_d: dataSubmit['descr_pie_apoyo_retropie_d'] || 0,
            descr_pie_apoyo_retropie_i: dataSubmit['descr_pie_apoyo_retropie_i'] || 0,
            descr_pie_apoyo_mediopie_d: dataSubmit['descr_pie_apoyo_mediopie_d'] || 0,
            descr_pie_apoyo_mediopie_i: dataSubmit['descr_pie_apoyo_mediopie_i'] || 0,
            descr_pie_apoyo_antepie_d: dataSubmit['descr_pie_apoyo_antepie_d'] || 0,
            descr_pie_apoyo_antepie_i: dataSubmit['descr_pie_apoyo_antepie_i'] || 0,
            descr_pie_apoyo_hallux_d: dataSubmit['descr_pie_apoyo_hallux_d'] || 0,
            descr_pie_apoyo_hallux_i: dataSubmit['descr_pie_apoyo_hallux_i'] || 0,
            descr_pie_sin_apoyo_tobillo_d: dataSubmit['descr_pie_sin_apoyo_tobillo_d'] || 0,
            descr_pie_sin_apoyo_tobillo_i: dataSubmit['descr_pie_sin_apoyo_tobillo_i'] || 0,
            descr_pie_sin_apoyo_retropie_d: dataSubmit['descr_pie_sin_apoyo_retropie_d'] || 0,
            descr_pie_sin_apoyo_retropie_i: dataSubmit['descr_pie_sin_apoyo_retropie_i'] || 0,
            descr_pie_sin_apoyo_mediopie_d: dataSubmit['descr_pie_sin_apoyo_mediopie_d'] || 0,
            descr_pie_sin_apoyo_mediopie_i: dataSubmit['descr_pie_sin_apoyo_mediopie_i'] || 0,
            descr_pie_sin_apoyo_antepie_d: dataSubmit['descr_pie_sin_apoyo_antepie_d'] || 0,
            descr_pie_sin_apoyo_antepie_i: dataSubmit['descr_pie_sin_apoyo_antepie_i'] || 0,
            descr_pie_sin_apoyo_hallux_d: dataSubmit['descr_pie_sin_apoyo_hallux_d'] || 0,
            descr_pie_sin_apoyo_hallux_i: dataSubmit['descr_pie_sin_apoyo_hallux_i'] || 0,
            hiperlaxitud_articular_i: dataSubmit['hiperlaxitud_articular_i'] || 0,
            hiperlaxitud_articular_d: dataSubmit['hiperlaxitud_articular_d'] || 0,
            signos_distonia: dataSubmit['signos_distonia'] || 0,
            tono_muscular: dataSubmit['tono_muscular'] || 0,
            patela_alta_d: dataSubmit['patela_alta_d'] || 0,
            patela_alta_i: dataSubmit['patela_alta_i'] || 0,
            perone_corto_d: dataSubmit['perone_corto_d'] || 0,
            perone_corto_i: dataSubmit['perone_corto_i'] || 0,  
        }

        console.log(patientData)

        if (!sessionData) {

            let session_date : any = new Date();
            session_date = new Date(session_date.getTime() - (session_date.getTimezoneOffset() * 60000)).toJSON();

            dataSubmit = {...dataSubmit, session_date}

            instance.post('/session/', dataSubmit, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: any) => {
                // setRequestStatus('success')
                message.success('Guardado exitosamente');
                
                setSessionId && setSessionId(response['data']['id'])
            })
            .catch((error: any) => {
                message.error('Ha ocurrido un error. Datos no guardados');
                // setRequestStatus('error')
                console.log(error)
            });
        }
        else {
            dataSubmit = {...dataSubmit, session_date: sessionData['session_date']}
            instance.put(`/session/${sessionData['id']}/`, dataSubmit, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: any) => {
                setRequestStatus('success')
                message.success('Guardado exitosamente');
                setSessionId && setSessionId(sessionData['id'])
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
            <Link href="#datos_sesion" title="Datos de la sesión" />
            <Link href="#procedimientos_realizados" title="Procedimientos realizados" />
            <Link href="#datos_clinicos" title="Datos del clínicos" />
            <Link href="#antecedentes" title="Antecedentes" />
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
            id='sessionForm'
            disabled={disabledForm}
            form={form}
            name='sessionForm'
            ref={formSessionRef}
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

            <div id="datos_sesion">
                <Divider orientation="left">Datos de la sesión</Divider>
                <Form.Item label="Fisioterapeuta" name="physiotherapist_name" style={{marginBottom: '0.5em'}}>
                    <Input />
                </Form.Item>

                {/* <Form.Item label="Fecha y Hora Sesión" name="session_date" style={{marginBottom: '0.5em'}}>
                    <Input />
                </Form.Item> */}
            </div>

            <div id="procedimientos_realizados">
                <Divider orientation="left">Procedimientos realizados</Divider>
                <Form.Item label="Examen Físico" name="examen_medico" style={{marginBottom: '0.5em'}} valuePropName="checked" initialValue={false}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        />
                </Form.Item>
                <Form.Item label="Prueba de 6 minutos" name="prueba_6_minutos" style={{marginBottom: '0.5em'}} valuePropName="checked" initialValue={false}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        />
                </Form.Item>
                <Form.Item label="Video análogo" name="video_analogo" style={{marginBottom: '0.5em'}} valuePropName="checked" initialValue={false}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        />
                </Form.Item>
                <Form.Item label="Podobarometría" name="podobarometria" style={{marginBottom: '0.5em'}} valuePropName="checked" initialValue={false}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        />
                </Form.Item>
                <Form.Item label="Examen computarizado de la marcha" name="examen_computarizado" style={{marginBottom: '0.5em'}} valuePropName="checked" initialValue={false}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        />
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

            <div id="antecedentes">
                <Divider orientation="left">Antecedentes</Divider>
                <Form.Item label="Personales" name="antecedentes_personales" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Quirurgicos" name="antecedentes_quirurgicos" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Farmacológicos" name="antecedentes_farmacologicos" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Familiares" name="antecedentes_familiares" style={{marginBottom: '0.5em'}}>
                    <TextArea rows={5} />
                </Form.Item>
            </div>

            <div id="ortesis_ayudas_externas__funcionalidad">
                <Row>
                    <Col span={12}>
                        <Title level={5}>Ortesis y ayudas externas</Title>
                    </Col>
                    <Col span={12}>
                        <Title level={5}>Funcionalidad</Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item label="Ortesis MID" name="ortesis_MID" style={{marginBottom: '0.5em'}} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Ortesis MII" name="ortesis_MII" style={{marginBottom: '0.5em'}} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="PODCI" name="reflejos_patelar_i" style={{marginBottom: '0.5em'}} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="GMFCS" name="gmfcs" style={{marginBottom: '0.5em'}} >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="FAQ" name="faq" style={{marginBottom: '0.5em'}} >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="FSM 5" name="fms_5" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="FMS 50" name="fms_50" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="FMS 500" name="fms_500" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Ayudas Externas" name="ayudas_externas" >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="FMS" name="fms" >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
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
                                <Form.Item label="Izquierdo" className={styles.columnItem} name="reflejos_patelar_i" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Derecho" className={styles.columnItem} name="reflejos_patelar_d">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Aquilano </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} name="reflejos_aquilano_i" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} >
                                    <Input name="reflejos_aquilano_d" />
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
                                <Form.Item label="Equilibrio Monopodal Derecho" className={styles.columnItem} style={{ fontSize: '8px', marginBottom: 0 }} name="equilibrio_monopodal_d">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Equilibrio Monopodal Izquierdo" className={styles.columnItem} style={{ fontSize: '8px' }} name="equilibrio_monopodal_i">
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
                                <Form.Item label="Distancia Intercondilea (mm):" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} name="dist_intercondilea" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Distancia Intermaleolar (mm):" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} name="dist_intermaleolar" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Perfil de Rodilla Derecho:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} name="perfil_rodilla_d" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Perfil de Rodilla Izquierdo:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} name="perfil_rodilla_i" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={6}>
                                <Title level={5} style={{ margin: 0 }}> Descripción Del Pie </Title>
                                <Title level={5} style={{ margin: 0 }}> CON APOYO </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}></Col>
                            <Col span={9}>Izquierdo:</Col>
                            <Col span={9}>Derecho:</Col>
                        </Row>

                        <Row>
                            <Col span={6} className={styles.centerLabel}>
                                <span> Tobillo </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_tobillo_i">
                                    <Select defaultValue={0} options={PIE_CHOICES}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_tobillo_d" >
                                    <Select defaultValue={0} options={PIE_CHOICES}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Retropie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_retropie_i">
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_retropie_d">
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Mediopie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_mediopie_i" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_mediopie_d" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Antepie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_antepie_i" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_antepie_d">
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Hallux </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_hallux_i" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_apoyo_hallux_d" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
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
                            <Col span={6}></Col>
                            <Col span={9}>Izquierdo:</Col>
                            <Col span={9}>Derecho:</Col>
                        </Row>

                        <Row>
                            <Col span={6} className={styles.centerLabel}>
                                <span> Tobillo </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_tobillo_i">
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_tobillo_d" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Retropie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_retropie_i" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_retropie_d" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Mediopie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_mediopie_i" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_mediopie_d" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Antepie </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_antepie_i" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_antepie_d" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Hallux </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_hallux_i" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="descr_pie_sin_apoyo_hallux_d" >
                                    <Select options={PIE_CHOICES} defaultValue={0}/>
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
                                <Form.Item label="Peso (Kg)" labelAlign='left' className={`${styles.columnItem} ${styles.columnItemNoMargin}`} name="peso">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Talla (mm)" className={`${styles.columnItem} ${styles.columnItemNoMargin}`} name="talla">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Longitud MID (mm)" className={styles.columnItem} name="longitud_MID">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Longitud MII (mm)" className={styles.columnItem} name="longitud_MII" >
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
                            <Col span={8} >
                                <span> Hiperlaxitud Muscular : </span>
                            </Col>
                            <Col span={6}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="hiperlaxitud_articular_i">
                                    <Select defaultValue={0} options={HIPERLAXITUD_CHOICES}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="hiperlaxitud_articular_d">
                                    <Select defaultValue={0} options={HIPERLAXITUD_CHOICES}/>
                                    {/* <Input /> */}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Signos de Distonía" labelAlign='left' style={{ marginBottom: '0.5em' }} name="signos_distonia">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Tono Muscular" labelAlign='left' name="tono_muscular">
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
                                <Form.Item label="Izquierdo" className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="flexores_cad_i" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Derecho" className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="flexores_cad_d" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Isquiotibial </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="isquiotibial_i">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="isquiotibial_d" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Cuádriceps </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="cuadriceps_i">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="cuadriceps_d" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <span> Gastrosoleo </span>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="" className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="gastrosoleo_i">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item className={styles.columnItem} style={{ marginBottom: '0.5em' }} name="gastrosoleo_d" >
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
                                <Form.Item label="Frecuencia Cardiaca Inicial" labelCol={{ span: 12 }} labelAlign='left' style={{ marginBottom: '0.5em' }} name="frec_cardiaca_inicial" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Frecuencia Cardiaca Final" labelCol={{ span: 12 }} labelAlign='left' style={{ marginBottom: '0.5em' }} name="frec_cardiaca_final" >
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
                                        <Form.Item label="" style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth} name={`tiempo_${idx+1}_distancia`}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="" style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth} name={`tiempo_${idx+1}_distancia_acumulada`} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="" style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth} name={`tiempo_${idx+1}_frec_cardiaca`} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )
                        }

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Gasto Energético:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} name="gasto_energetico">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Velocidad (m/s):" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} name="velocidad" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Escala de Borg:" labelAlign='left' labelCol={{ span: 12 }} style={{ marginBottom: '0.5em' }} name="escala_borg" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Observaciones:" labelAlign='left' style={{ marginBottom: '0.5em' }} className={styles.inputFullWidth} name="observaciones_prueba_6_min" >
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
                    </Col>
                    <Col span={6}>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name="tronco_abdominales_fuerza_muscular">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12, 0]}>
                    <Col span={6}>
                        <span> Lumbares </span>
                    </Col>
                    <Col span={6}>
                    </Col>
                    <Col span={6}>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.inputFullWidth} name="tronco_lumbares_fuerza_muscular">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Title level={5}>Cadera</Title>

                {RowEncabezado()}
                {RowForm({ label: 'Flexión', name: 'cadera_flexion'  })}
                {RowForm({ label: 'Extensión', name: 'cadera_extension'  })}
                {RowForm({ label: 'Abducción', name: 'cadera_abduccion'  })}
                {RowForm({ label: 'Aducción', name: 'cadera_aduccion'  })}

                <Row>
                    <Col span={6}>
                        <span> Rot. Int. </span>
                    </Col>
                    <Col span={6}>
                        <Row gutter={[6, 0]}>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} name="cadera_rot_int_movilidad_i">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} name="cadera_rot_int_movilidad_d">
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
                                <Form.Item className={styles.inputFullWidth} name="cadera_rot_ext_movilidad_i">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} name="cadera_rot_ext_movilidad_d">
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
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name="signo_thomas_i">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name="signo_thomas_d">
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
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name="anteversion_femoral_i">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name="anteversion_femoral_d">
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
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="signo_phelps_i">
                                    <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="signo_phelps_d">
                                    <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
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
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="test_ober_i">
                                    <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="test_ober_d">
                                    <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Title level={5}>Rodilla</Title>
                {RowEncabezado()}
                {RowForm({ label: 'Flexión', name: 'rodilla_flexion' })}
                {RowForm({ label: 'Extensión', name: 'extension_flexion' })}

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
                        [['angulo_popliteo','Angulo Poplíteo'], ['angulo_muslo', 'Angulo Muslo Pie']],
                        [['angulo_popliteo_cadera_flex', 'A. Poplíteo Cadera en Flex'], ['angulo_bimaleolar', 'Angulo Bimaleolar']],
                        [['variacion_angulo_popliteo', 'Variación A. Poplíteo'], ['test_2do_dedo', 'Test 2do Dedo']],
                        [['signo_ely_duncan', 'Signo de Ely Duncan'], ['patela_alta', 'Patela Alta']],
                        [['deficit_ext_act_supino', 'Déficit de Extensión activa en Supino'], ['perone_corto', 'Peroné Corto']]
                    ].map(([[nameItemLeft, itemLeft], [nameItemRight, itemRight]]: any, idx: number) => createRow({
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
                                            content: nameItemLeft == 'signo_ely_duncan' ? 
                                            <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name={`${nameItemLeft}_i`}>
                                                <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
                                            </Form.Item> : 
                                            <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${nameItemLeft}_i`}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: nameItemLeft == 'signo_ely_duncan' ? 
                                            <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name={`${nameItemLeft}_d`}>
                                                <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
                                            </Form.Item> : 
                                            <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${nameItemLeft}_d`}>
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
                                            content: nameItemRight == 'patela_alta' || nameItemRight== 'perone_corto' ? 
                                            <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name={`${nameItemRight}_i`}>
                                                <Select options={RODILLA_PATELA_PERONE_CHOICES} defaultValue={0}/>
                                            </Form.Item> : 
                                            <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${nameItemRight}_i`}>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: nameItemRight == 'patela_alta' || nameItemRight== 'perone_corto' ? 
                                            <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name={`${nameItemRight}_d`}>
                                                <Select options={RODILLA_PATELA_PERONE_CHOICES} defaultValue={0}/>
                                            </Form.Item> : 
                                            <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name={`${nameItemRight}_d`}>
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
                {RowForm({ label: 'Plantiflexión G', name: 'tobillo_plantiflexion' })}
                {RowForm({ label: 'Dorsiflexión', name: 'tobillo_dorsiflexion' })}
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
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name='tobillo_soleo_control_selectivo_i'>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name='tobillo_soleo_control_selectivo_d'>
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
                                            content: <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="tobillo_signo_silverskiold_movilidad_i">
                                            <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
                                        </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.selectItem} style={{ marginBottom: '0.5em' }} name="tobillo_signo_silverskiold_movilidad_d">
                                            <Select options={SIGNOS_RETRACCION_MUSCULAR_CHOICES} defaultValue={0}/>
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
                {RowForm({ label: 'Inversión', name: 'pie_inversion' })}
                {RowForm({ label: 'Eversión', name: 'pie_eversion' })}
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
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name='pie_flexores_hallux_control_selectivo_i'>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name='pie_flexores_hallux_control_selectivo_d'>
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
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name='pie_extensores_hallux_control_selectivo_i'>
                                                <Input />
                                            </Form.Item>
                                        },
                                        {
                                            span: 12,
                                            content: <Form.Item className={styles.inputFullWidth} style={{ marginBottom: '0.5em' }} name='pie_extensores_hallux_control_selectivo_d'>
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