import React, { useRef, FC } from 'react';

import styles from './style.module.css';
import { Form, Typography } from 'antd';
import { Card } from 'antd';

const { Meta } = Card;

const { Title } = Typography;

import { Col, Row } from 'antd';
import { useRouter } from 'next/router';

export interface IManageReportsProps {
}

const ManageReports : FC<IManageReportsProps> = () => {
  const router = useRouter(); 

  return (
    <div>
        <Title level={1}> Administrar Usuario </Title>
        
        <Row justify="space-around" align="middle" style={{height: '100%'}}>
            <Col span={4}>
                <Card
                    hoverable
                    style={{ width: 250, padding: '1em' }}
                    onClick={ () => router.push('registrar_usuario')}
                    cover={<img alt="Agregar Usuario" src="/images/add_report.png" />}
                    >
                    <Meta title="Nuevo Reporte" description="En esta sección podrás generar un nuevo reporte" />
                </Card>
            </Col>
            <Col span={4}>
                {/* <Card
                    hoverable
                    style={{ width: 250, padding: '1em' }}
                    cover={<img alt="Editar Usuario" src="/images/user_config.png" />}
                    onClick={ () => router.push('editar_usuario')}
                >
                    <Meta title="Editar Usuario Existente" description="Sección dedicada a editar usuarios ya creados" />
                </Card> */}
            </Col>
        </Row>

    </div>
  );
};

export default ManageReports
