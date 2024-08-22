import React, { useState, useEffect } from 'react';
import { Button, Table, Typography, Space, message, Tag, Spin } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { parse_date } from 'constants/parse_date';

const { Title } = Typography;

interface Procedure {
  tag: string;
  value: boolean;
}

interface DataType {
  key: string;
  id: string;
  date: number;
  procedures: Procedure[];
}

const ShowReport: React.FC = () => {
  const [sessionData, setSessionData] = useState<DataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000,
  });

  const fetchAllSessions = () => {
    setIsLoading(true);
    instance.get('/session/list_all_sessions_diagnostico/')
      .then((response: any) => {
        setSessionData(response.data.map((isession: any) => ({
          key: isession.id,
          id: isession.id,
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
        message.error('Error al cargar las sesiones');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const handleDiagnosticarClick = (id: string) => {
    router.push(`/gestionar_diagnosticos/crear_diagnostico/${id}`);
  };

  const columns = [
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
      render: (_: any, { procedures }: { procedures: Procedure[] }) => (
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
      <Title level={1}>Lista De Pacientes</Title>

      {isLoading && <Spin tip="Cargando..." size='large' style={{ margin: '2em 1em' }} />}

      {sessionData && <Table columns={columns} dataSource={sessionData} style={{ margin: '2em 1em' }} />}
    </div>
  );
};

export default ShowReport;
