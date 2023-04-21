import React, { forwardRef } from 'react';
import A4Paper from '../A4Paper/A4_paper';

import { Form, Divider, Typography } from 'antd';

import { patient_data, parent_data, gait_signal } from '../../../constants/test_signals';
import FormItem from '../../molecules/FormItem/formItem';
import { mapPatientLabels, mapParentLabels } from '../../../constants/mapForms';

import dynamic from "next/dynamic";

import styles from './style.module.css';
import HeaderIcon from '../../atoms/headerIcon/headerIcon';

const { Title } = Typography;
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

const Report = forwardRef((props: any, ref: any) => {
  const [form] = Form.useForm();
    return (
        <A4Paper ref={ref}>
          <div style={{position: 'relative'}}>
            <div className={styles.headerIcon}></div>
            <div className={styles.header}>
              <Title level={1}> Laboratorio de Marcha </Title>
              <Title level={3}> Comfamiliar Risaralda </Title>
              <Title level={3}> Salud Comfamiliar </Title>
              <Title level={5}> Avenida Circunvalar N° 3 – 01 </Title>
            </div>
          </div>
          <>
          <Form
            layout='vertical'
            form={form}
            disabled={true}
            size='small'
          >
            <Divider orientation="left">Datos del paciente</Divider>
            <div style={{'display': 'flex', width: '100%', flexDirection: 'column', flexFlow: 'wrap', justifyContent: 'space-between'}} >
              {
                Object.entries(patient_data).map( ([k, value]) => 
                  <FormItem {...{value, label: mapPatientLabels[k]['label'], type: mapPatientLabels[k]['type']}} key={k}  />
                )
              }
            </div>

            <Divider orientation="left">Datos del acudiente</Divider>
              <div style={{'display': 'flex', width: '100%', flexDirection: 'column', flexFlow: 'wrap', justifyContent: 'space-between'}} >
                {
                  Object.entries(parent_data).map( ([k, value]) => 
                  <FormItem {...{value, label: mapParentLabels[k]['label'], type: mapParentLabels[k]['type']}} key={k} />
                  )
                }
              </div>
            

              <Divider orientation="left">CINEMÁTICA</Divider>
              {
                Object.entries(gait_signal).map( ([k, v]) => 
                  <Plot
                    data={[
                      {
                        x: v['x'],
                        y: v['y'],
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: 'red' },
                      },
                    ]}
                    layout={{ width: 730, height: 280, title: k, margin: {t: 30, b: 20, r: 50, pad: 0}
                  }}
                  key={k}
                  />
                )
              }
            
          </Form>

          </>
        </A4Paper>
    )
  });
  
export default Report;

