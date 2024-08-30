import React, { useState, useEffect } from 'react';
import { Form, Input, Table, DatePicker, Select, Switch, Button, Row, Col, Radio, Typography, Spin, Grid, message } from 'antd';
import { useRouter } from 'next/router';
import { dataSource1, dataSource2, dataSource3, dataSource4, dataSource5, dataSource6, TableRecord } from '../../../components/molecules/SurveyUtils/dataSources';
import { AxiosError } from 'axios';
import { scale1, scale2, scale3, scale4, scale5, scale6 } from '../../../components/molecules/SurveyUtils/scales';

const sexOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
];

const { TextArea } = Input;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const SurveyForm: React.FC = () => {

    //-----------CONSTANTES-----------------------//
    const [form] = Form.useForm();
    const [isSick, setIsSick] = useState(false);
    const [isTablet, setIsTablet] = useState<boolean | null>(null);
    const screens = useBreakpoint();
    const router = useRouter();
    const axios = require('axios').default;
    const [sessionId, setSessionId] = useState<string | null>(null);
    const isVertical = !screens.lg;

    const { id } = router.query;
    const [loading, setLoading] = useState(false);

    //-----------------COLUMNAS-----------------------/
    const columns1 = [
        {
            title: 'Pregunta',
            dataIndex: 'label',
            key: 'label',
            width: 120,
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Respuesta',
            key: 'name',
            render: (_: any, record: TableRecord) => (
                <Form.Item
                    name={record.name}
                    rules={[{ required: true, message: 'Se requiere este dato' }]}
                    style={{ marginBottom: 0 }}
                >
                    <Radio.Group>
                        <div
                            className="radio-container"
                            style={{
                                display: 'flex',
                                flexDirection: isVertical ? 'column' : 'row',
                                gap: '15px', flexWrap: 'wrap',
                            }}
                        >
                            {scale1.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    const columns2 = [
        {
            title: 'Pregunta',
            dataIndex: 'label',
            key: 'label',
            width: 120,
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Respuesta',
            key: 'name',
            render: (_: any, record: TableRecord) => (
                <Form.Item
                    name={record.name}
                    rules={[{ required: true, message: 'Se requiere este dato' }]}
                    style={{ marginBottom: 0 }}
                >
                    <Radio.Group>
                        <div
                            className="radio-container"
                            style={{
                                display: 'flex',
                                flexDirection: isVertical ? 'column' : 'row',
                                gap: '15px', flexWrap: 'wrap',
                            }}
                        >
                            {scale2.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    const columns3 = [
        {
            title: 'Pregunta',
            dataIndex: 'label',
            key: 'label',
            width: 120,
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Respuesta',
            key: 'name',
            render: (_: any, record: TableRecord) => (
                <Form.Item
                    name={record.name}
                    rules={[{ required: true, message: 'Se requiere este dato' }]}
                    style={{ marginBottom: 0 }}
                >
                    <Radio.Group>
                        <div
                            className="radio-container"
                            style={{
                                display: 'flex',
                                flexDirection: isVertical ? 'column' : 'row',
                                gap: '15px', flexWrap: 'wrap',
                            }}
                        >
                            {scale3.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    const columns4 = [
        {
            title: 'Pregunta',
            dataIndex: 'label',
            key: 'label',
            width: 120,
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Respuesta',
            key: 'name',
            render: (_: any, record: TableRecord) => (
                <Form.Item
                    name={record.name}
                    rules={[{ required: true, message: 'Se requiere este dato' }]}
                    style={{ marginBottom: 0 }}
                >
                    <Radio.Group>
                        <div
                            className="radio-container"
                            style={{
                                display: 'flex',
                                flexDirection: isVertical ? 'column' : 'row',
                                gap: '15px', flexWrap: 'wrap',
                            }}
                        >
                            {scale4.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    const columns5 = [
        {
            title: 'Pregunta',
            dataIndex: 'label',
            key: 'label',
            width: 120,
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Respuesta',
            key: 'name',
            render: (_: any, record: TableRecord) => (
                <Form.Item
                    name={record.name}
                    rules={[{ required: true, message: 'Se requiere este dato' }]}
                    style={{ marginBottom: 0 }}
                >
                    <Radio.Group>
                        <div
                            className="radio-container"
                            style={{
                                display: 'flex',
                                flexDirection: isVertical ? 'column' : 'row',
                                gap: '15px', flexWrap: 'wrap',
                            }}
                        >
                            {scale5.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    const columns6 = [
        {
            title: 'Pregunta',
            dataIndex: 'label',
            key: 'label',
            width: 120,
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Respuesta',
            key: 'name',
            render: (_: any, record: TableRecord) => (
                <Form.Item
                    name={record.name}
                    rules={[{ required: true, message: 'Se requiere este dato' }]}
                    style={{ marginBottom: 0 }}
                >
                    <Radio.Group>
                        <div
                            className="radio-container"
                            style={{
                                display: 'flex',
                                flexDirection: isVertical ? 'column' : 'row',
                                gap: '15px', flexWrap: 'wrap',
                            }}
                        >
                            {scale6.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    //---------------DATIOS DE INICIO------------------//
    useEffect(() => {
        const storedId = localStorage.getItem('sessionId');
        if (storedId) {
            setSessionId(storedId);
            localStorage.removeItem('sessionId');
        }
    }, []);

    useEffect(() => {
    }, [id]);

    useEffect(() => {
        if (screens.md && !screens.lg) {
            setIsTablet(true);
        } else {
            setIsTablet(false);
        }
    }, [screens]);

    //----------------ENVIAR AL BACKEND--------------------//
    const handleSubmit = async (values: any) => {
        const sessionIdAsNumber: number = Number(sessionId);
        setLoading(true);

        try {

            var formattedValues = {
                ...values,
                birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : '',
                is_sick: values.is_sick || false,
                help_with_questionnaire: values.help_with_questionnaire || '',
                questionnaire_comments: values.questionnaire_comments || '',
                session: sessionIdAsNumber
            };

            // Si no existe, hacemos un POST
            await axios.post(`${process.env.BASE_URL}/survey/`, formattedValues);
            message.success('Encuesta enviada exitosamente');
            router.push('/gestionar_encuestas');
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    // Si la encuesta no existe, hacemos un POST
                    try {
                        await axios.post(`${process.env.BASE_URL}/survey/`, formattedValues);
                        message.success('Encuesta enviada exitosamente');
                        router.push('/gestionar_encuestas');
                    } catch (postError) {
                        console.error('Error al enviar la encuesta:', postError);
                        message.error('Hubo un error al enviar la encuesta');
                    }
                } else {
                    console.error('Error al enviar la encuesta:', error);
                    message.error('Hubo un error al enviar la encuesta');
                }
            } else {
                console.error('Error desconocido:', error);
                message.error('Hubo un error al enviar la encuesta');
            }
        } finally {
            setLoading(false);
        }
    };


    //----------------VERIFICAR TABLET---------------------//
    if (isTablet === null) {
        return null;
    }

    //----------------GENERAR TABLA DE RESPUESTAS------------------//
    return (
        <div style={{ padding: '20px', maxWidth: isTablet ? '720px' : '100%', margin: 'auto' }}>
            <Title level={1} style={{ textAlign: 'center' }}>Realizar Encuesta</Title>

            <div style={{ marginBottom: '20px', backgroundColor: 'light-gray' }}>
                <p>
                    Antes de empezar con la prueba nos gustaría que contestara unas preguntas generales sobre usted: Señale únicamente la opción correcta o conteste en los espacios en blanco, según lo requiera cada pregunta.
                </p>
            </div>

            {loading ? (
                <Spin tip="Cargando..." size="large" style={{ margin: '2em 1em' }} />
            ) : (
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={isTablet ? 8 : 16}>
                        <Col span={isTablet ? 24 : 12}>
                            <Form.Item label="Sexo" name="sex_type" rules={[{ required: true, message: 'Seleccione el sexo' }]}>
                                <Radio.Group options={sexOptions} />
                            </Form.Item>
                        </Col>
                        <Col span={isTablet ? 24 : 12}>
                            <Form.Item label="Fecha de Nacimiento" name="birth_date" rules={[{ required: true, message: 'Seleccione la fecha de nacimiento' }]}>
                                <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={isTablet ? 8 : 16}>
                        <Col span={isTablet ? 24 : 12}>
                            <Form.Item label="Nivel de Educación" name="education_level" rules={[{ required: true, message: 'Seleccione el nivel de educación' }]}>
                                <Select placeholder="Seleccione">
                                    <Select.Option value={1}>Ninguno</Select.Option>
                                    <Select.Option value={2}>Primarios</Select.Option>
                                    <Select.Option value={3}>Medios</Select.Option>
                                    <Select.Option value={4}>Universitarios</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={isTablet ? 24 : 12}>
                            <Form.Item label="Estado Civil" name="marital_status" rules={[{ required: true, message: 'Seleccione el estado civil' }]}>
                                <Select placeholder="Seleccione">
                                    <Select.Option value={1}>Soltero/a</Select.Option>
                                    <Select.Option value={2}>Separado/a</Select.Option>
                                    <Select.Option value={3}>Casado/a</Select.Option>
                                    <Select.Option value={4}>Divorciado/a</Select.Option>
                                    <Select.Option value={5}>Viudo/a</Select.Option>
                                    <Select.Option value={6}>En pareja</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={isTablet ? 8 : 16}>
                        <Col span={isTablet ? 24 : 12}>
                            <Form.Item label="¿Se encuentra enfermo?" name="is_sick" valuePropName="checked">
                                <Switch onChange={(checked) => setIsSick(checked)} />
                            </Form.Item>
                        </Col>
                        {isSick && (
                            <Col span={isTablet ? 24 : 12}>
                                <Form.Item label="Problema de Salud" name="health_problem">
                                    <TextArea rows={2} placeholder="Describa su problema de salud" />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>

                    <div style={{ marginBottom: '20px', backgroundColor: 'light-gray' }}>
                        <p>
                            Instrucciones: Este cuestionario sirve para conocer su opinión acerca de su calidad de vida,
                            su salud y otras áreas de su vida. Por favor conteste todas las preguntas. Si no está
                            seguro/a de qué respuesta dar a una pregunta, escoja la que le parezca más apropiada. A
                            veces, ésta puede ser la primera respuesta que le viene a la cabeza. Tenga presente su modo de vivir, expectativas, placeres y preocupaciones. Le pedimos que
                            piense en su vida durante las dos últimas semanas.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px', backgroundColor: 'light-gray' }}>
                        <p>
                            <strong>Por favor, lea la pregunta, valore sus sentimientos y marque la opción que mejor defina su decision:</strong>
                        </p>
                    </div>

                    <Table
                        dataSource={dataSource1}
                        columns={columns1}
                        pagination={false}
                        bordered
                        size="large"
                        scroll={{ x: true }}
                    />
                    <br></br>

                    <Table
                        dataSource={dataSource2}
                        columns={columns2}
                        pagination={false}
                        bordered
                        size="large"
                        scroll={{ x: true }}
                    />
                    <br></br>

                    <div style={{ marginBottom: '20px', backgroundColor: 'light-gray' }}>
                        <p>
                            <strong>Las siguientes preguntas hacen referencia al grado en que ha experimentado ciertos hechos en las dos últimas semanas:</strong>
                        </p>
                    </div>

                    <Table
                        dataSource={dataSource3}
                        columns={columns3}
                        pagination={false}
                        bordered
                        size="middle"
                        scroll={{ x: true }}
                    />
                    <br></br>

                    <div style={{ marginBottom: '20px', backgroundColor: 'light-gray' }}>
                        <p>
                            <strong>Las siguientes preguntas hacen referencia a si usted experimenta o fue capaz de hacer ciertas cosas en las dos últimas semanas, y en qué
                                medida:</strong>
                        </p>
                    </div>

                    <Table
                        dataSource={dataSource4}
                        columns={columns4}
                        pagination={false}
                        bordered
                        size="middle"
                        scroll={{ x: true }}
                    />
                    <br></br>

                    <div style={{ marginBottom: '20px', backgroundColor: 'light-gray' }}>
                        <p>
                            <strong>Las siguientes preguntas hacen referencia a si en las dos últimas semana ha sentido satisfecho/a y cuánto, en varios aspectos de su vida:</strong>
                        </p>
                    </div>

                    <Table
                        dataSource={dataSource5}
                        columns={columns5}
                        pagination={false}
                        bordered
                        size="middle"
                        scroll={{ x: true }}
                    />
                    <br></br>

                    <div style={{ marginBottom: '20px', backgroundColor: 'light-gray' }}>
                        <p>
                            <strong>La siguiente pregunta hace referencia a la frecuencia con que usted ha sentido o experimentado ciertos sentimientos en las dos últimas semanas:</strong>
                        </p>
                    </div>


                    <Table
                        dataSource={dataSource6}
                        columns={columns6}
                        pagination={false}
                        bordered
                        size="middle"
                        scroll={{ x: true }}
                    />
                    <br></br>

                    <Row gutter={isTablet ? 8 : 16}>
                        <Col span={24}>
                            <Form.Item label="¿Le ha ayudado alguien a rellenar el cuestionario?" name="help_with_questionnaire" rules={[{ required: true, message: 'Se requiere este dato' }]}>
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Tiempo para completar (minutos)" name="time_taken_to_complete" rules={[{ required: true, message: 'Se requiere este dato' }]}>
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Comentarios sobre la encuesta" name="questionnaire_comments">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Enviar Encuesta
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default SurveyForm;