import React, { useRef } from 'react';

import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


import ReactToPrint from 'react-to-print';

import styles from './style.module.css';
import Report from '../../components/templates/report/report';

export interface IShowReportProps {
}

const ShowReport = () => {
  const componentRef: any = useRef();

  return (
    <div className={styles.content}>
      <Report ref={componentRef} />
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => 
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large" style={{marginTop: '2em'}} >
          Imprimir Reporte
          </Button>
          }
      />
    </div>
  );
};

export default ShowReport
