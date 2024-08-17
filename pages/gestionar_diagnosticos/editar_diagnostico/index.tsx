import React, { useState } from 'react';

import { Button, Table, Typography, Select, Form, Space, message, InputNumber, Tag, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
const axios = require('axios').default;

import styles from './style.module.css';
import { parse_date } from 'constants/parse_date';
import { useRouter } from 'next/router';

const { Title } = Typography;

export interface IShowReportProps {
}

const ShowReport = () => {
  const [selectValue, setSelectValue] = useState("id_session");
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
  });

  const showPDF = (id: string) => {
    const url = `${process.env.BASE_URL}/pdf/${id}/`;
    window.open(url, '_blank');
  };

  const onFinish = (data: Record<string, any>) => {
    const { type_id, id } = data;
    const endpoint = type_id === 'id_session' ? `/session/${id}` : `/session/${id}/get_session_by_patient_id/`;

    instance.get(endpoint)
      .then((response: any) => {
        if (type_id === 'id_session') {
          response = [response.data];
        } else {
          response = response.data;
        }

        setSessionData(response.map((isession: Record<string, any>) => ({
          ...isession,
          date: parse_date(isession.session_date),
          procedures: [
            { tag: 'examen_medico', value: isession['examen_medico'] },
            { tag: 'prueba_6_minutos', value: isession['prueba_6_minutos'] },
            { tag: 'video_analogo', value: isession['video_analogo'] },
            { tag: 'podobarometria', value: isession['podobarometria'] },
            { tag: 'examen_computarizado', value: isession['examen_computarizado'] },
          ]
        })));
      })
      .catch((error: any) => {
        console.error(error);
        message.error(type_id === 'id_session' ? 'No existe la sesión' : 'No existe el paciente');
      });
  };

  const handleDiagnosticarClick = (id: string) => {
    router.push(`/gestionar_diagnosticos/editar_diagnostico/${id}`);
  };

  interface DataType {
    key: string;
    id: string;
    date: number;
    patient: string;
    procedures: [Record<string, string>];
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
      title: 'Procedimientos',
      key: 'procedures',
      dataIndex: 'procedures',
      render: (_, { procedures }) => (
        <>
          {procedures.map(({ tag, value }, idx) => {
            let color = value ? 'green' : 'volcano';
            return (
              <Tag color={color} key={idx}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleDiagnosticarClick(record.id)}>
            Diagnosticar Sesión {record.id}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={1}>Consultar Diagnóstico</Title>
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

export default ShowReport;
