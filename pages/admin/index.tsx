import React, { useRef } from 'react';

import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import styles from './style.module.css';
import { Form, Typography } from 'antd';


const { Title } = Typography;

export interface IAdminHomeProps {
}

const AdminHome = () => {
  const componentRef: any = useRef();

  return (
    <div className={styles.content}>
      <Title level={1}> Bienvenido Admin </Title>
    </div>
  );
};

export default AdminHome
