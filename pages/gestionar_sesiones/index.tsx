import React, { useRef, FC } from 'react';

import styles from './style.module.css';
import { Form, Typography } from 'antd';
import { Card } from 'antd';

const { Meta } = Card;

const { Title } = Typography;

import { Col, Row } from 'antd';
import { useRouter } from 'next/router';

export interface IManageSessionsProps {
}

const ManageSessions : FC<IManageSessionsProps> = () => {
  const router = useRouter(); 

  return (
    <div>
        <Title level={1}> Administrar Usuario </Title>
        
        <Row justify="space-around" align="middle" style={{height: '100%'}}>
            <Col span={4}>
                <Card
                    hoverable
                    style={{ width: 250, padding: '1em' }}
                    onClick={ () => router.push('gestionar_sesiones/crear_sesion/')}
                    cover={<img alt="Agregar Usuario" src="/images/add_report.png" />}
                    >
                    <Meta title="Nueva Sesión" description="En esta sección podrás crear una nueva sesión" />
                </Card>
            </Col>
            <Col span={4}>
                <Card
                    hoverable
                    style={{ width: 250, padding: '1em' }}
                    cover={<img alt="Editar Usuario" src="/images/editar_reporte.png" />}
                    onClick={ () => router.push('gestionar_sesiones/editar_sesion/')}
                >
                    <Meta title="Editar sesión" description="Sección dedicada a editar sesiones ya creadas" />
                </Card>
            </Col>
        </Row>

    </div>
  );
};

export default ManageSessions
