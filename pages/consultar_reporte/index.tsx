import React, { useEffect, useState } from 'react';

import { Button, Table, Typography, Select, Form, Space, message, InputNumber, Tag, Modal, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
const axios = require('axios').default;

import styles from './style.module.css';
import { parse_date } from 'constants/parse_date';

const { Title } = Typography;

export interface IShowReportProps {
}

const ShowReport = () => {
  const [selectValue, setSelectValue] = useState("id_session")
  const [sessionData, setSessionData] = useState<any>(null)
  const [sessionSelected, setSessionSelected] = useState<any>(null)
  const [currentPDF, setCurrentPDF] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
  });

  const resetPDFRender = () => {
    setIsModalOpen(false);
    setSessionSelected(null)
    setIsLoading(false)
    setCurrentPDF(null)
  }

  const showModal = (id: string) => {
    setSessionSelected(id)
    setIsModalOpen(true);
    setIsLoading(true)
  };

  const handleOk = () => {
    resetPDFRender()
  };

  const handleCancel = () => {
    resetPDFRender()
  };

  useEffect(() => {
    if (sessionSelected) {
      instance.get(`/pdf/${sessionSelected}/`,
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
          },
          timeout: 10000
        }
      ).then((response: any) => {

        const encodedString = Buffer.from(response.data).toString('base64');

        setCurrentPDF(encodedString)
        setIsLoading(false)
      })
        .catch((error: any) => {
          console.error(error)
          message.error('PDF No encontrado')
          resetPDFRender()
        });
    }
  },
    [sessionSelected])

  const onFinish = (data: Record<string, any>) => {
    const { type_id, id } = data
    const endpoint = type_id == 'id_session' ? `/session/${id}` : `/session/${id}/get_session_by_patient_id/`

    instance.get(endpoint).then((response: any) => {
      if (type_id == 'id_session') {
        response = [response.data]
      } else {
        response = response.data
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
      })))
    })
      .catch((error: any) => {
        console.error(error)
        message.error(type_id == 'id_session' ? 'No existe la sesión' : 'No existe el paciente')
      });
  }

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
      title: 'Fisioterapeuta',
      dataIndex: 'physiotherapist_name',
      key: 'name',
    },
    {
      title: 'Procedimientos',
      key: 'procedures',
      dataIndex: 'procedures',
      render: (_, { procedures }) => (
        <>
          {procedures.map(({ tag, value }, idx) => {
            let color = value ? 'green' : 'volcano'
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
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record.id)}>Ver PDF {record.patient}</a>
          {/* <a>Delete</a> */}
        </Space>
      ),
    },
  ];


  return (
    <div>
      <Title level={1}> Consultar Reporte </Title>
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
          label={`Ingrese ID ${selectValue == 'id_session' ? 'sesión' : 'paciente'}`}
          name='id'
          rules={[{ required: true, message: 'Campo obligatorio' }]}
        >
          <InputNumber controls={false} style={{ width: '100%' }} />
        </Form.Item>

        <Button type='primary' htmlType='submit'>Buscar</Button>
      </Form>

      {
        sessionData && <Table columns={columns} dataSource={sessionData} style={{ margin: '2em 1em' }} />
      }

      <Modal
        title={`Reporte Sesión ${sessionSelected}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width='75%'
        style={{ top: '1em' }}
        bodyStyle={{
        }}
      >
        {
          isLoading && <Spin tip="Cargando..." size='large' style={{ margin: 'auto', width: '100%' }}></Spin>
        }
        {
          currentPDF &&
          <div style={{ height: '75vh' }}>
            <embed src={`data:application/pdf;base64,${currentPDF}`} type="application/pdf" width="100%" height="100%" />
          </div>
        }

      </Modal>

    </div>
  );
};

export default ShowReport