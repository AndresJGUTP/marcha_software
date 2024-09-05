import React, { useState } from 'react';
import { Button, Table, Typography, Select, Form, Space, message, InputNumber, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
const axios = require('axios').default;

import styles from './style.module.css';
import { parse_date } from 'constants/parse_date';
import { useRouter } from 'next/router';

const { Title } = Typography;

const ConsultSession = () => {
  const [selectValue, setSelectValue] = useState("id_session");
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000,
  });

  const onFinish = (data: Record<string, any>) => {
    const { type_id, id } = data;
    const endpoint = type_id === 'id_session' ? `/session/${id}` : `/session/${id}/get_session_by_patient_id/`;

    setIsLoading(true);

    instance.get(endpoint)
      .then(async (response: any) => {
        let sessionData = type_id === 'id_session' ? [response.data] : response.data;
        const surveySessionsResponse = await instance.get(`/survey/get_all_sessions/`);
        const surveySessions = surveySessionsResponse.data.sessions;

        setSessionData(sessionData.map((session: Record<string, any>) => ({
          ...session,
          date: parse_date(session.session_date),
          procedures: [
            { tag: 'examen_medico', value: session['examen_medico'] },
            { tag: 'prueba_6_minutos', value: session['prueba_6_minutos'] },
            { tag: 'video_analogo', value: session['video_analogo'] },
            { tag: 'podobarometria', value: session['podobarometria'] },
            { tag: 'examen_computarizado', value: session['examen_computarizado'] },
          ],
          hasSurvey: surveySessions.includes(session.id)
        })));
      })
      .catch((error: any) => {
        console.error(error);
        message.error(type_id === 'id_session' ? 'No existe la sesión' : 'No existe el paciente');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSurveyClickEdit = (id: string) => {
    localStorage.setItem('sessionId', id);
    router.push('/gestionar_encuestas/editar_encuesta');
  };

  const handleSurveyClickCreate = (id: string) => {
    localStorage.setItem('sessionId', id);
    router.push('/gestionar_encuestas/crear_encuesta');
  };

  interface DataType {
    key: string;
    id: string;
    date: number;
    patient: string;
    procedures: [Record<string, string>];
    hasSurvey?: boolean;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          {record.hasSurvey ? (
            <Button type="link" onClick={() => handleSurveyClickEdit(record.id)}>
              Editar
            </Button>
          ) : (
            <Button type="link" className={styles.createButton} onClick={() => handleSurveyClickCreate(record.id)}>
              Crear
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={1}>Encuesta Calidad de Vida</Title>
      <Form
        layout='vertical'
        className={styles.formStyles}
        onFinish={onFinish}
      >
        <Form.Item
          label="Método de consulta"
          name="type_id"
          rules={[{ required: true, message: 'Por favor, seleccione un método de búsqueda' }]}
          initialValue="id_session"
        >
          <Select
            className={styles.selectForm}
            onChange={(value) => setSelectValue(value)}
            value={selectValue}
            options={[
              { value: 'id_session', label: 'Sesión ID' },
              { value: 'id_patient', label: 'Documento Paciente' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={`Ingrese ID ${selectValue === 'id_session' ? 'sesión' : 'paciente'}`}
          name='id'
          rules={[{ required: true, message: 'Campo obligatorio' }]}
        >
          <InputNumber controls={false} style={{ width: '100%' }} />
        </Form.Item>

        <Button type='primary' htmlType='submit'>Buscar</Button>
      </Form>

      {isLoading && <Spin tip="Cargando..." size='large' style={{ margin: '2em 1em' }} />}

      {sessionData && <Table columns={columns} dataSource={sessionData} style={{ margin: '2em 1em' }} />}
    </div>
  );
};

export default ConsultSession;
