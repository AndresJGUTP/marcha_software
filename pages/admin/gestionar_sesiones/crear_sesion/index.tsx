import React, { useState, FC, useEffect } from 'react';
import SelectUser from 'components/molecules/SelectUser';
import { Button, Steps, Typography } from 'antd';
import styles from "./style.module.css";
import SessionForm from 'components/organisms/SessionForm';
const axios = require('axios').default;

const { Title } = Typography;

export interface ICreateSessionProps {
}

const CreateSession : FC<ICreateSessionProps> = () => {
  
  const [patient, setPatient] = useState()
  const [parent, setParent] = useState()
  const [current, setCurrent] = useState(0);

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
  });

  useEffect(() => {
    patient && instance.get(`/parent/${patient['id_parent']}`).then((response: any) => {
      setParent(response.data)
  }).catch((error: any) => {
          console.error(error)
      });
  }, [patient])

  const steps = [
    {
      title: 'Usuario de la sesión',
      content: <div className={styles.selectForm}>
                <SelectUser 
                  user={patient}
                  setUser={setPatient}
                  endpoint='/patient/'
                  tooltip='El paciente debe estar registrado previamiente en Gestionar Usuarios'
                  userType='Paciente'
                  />
                </div>
    },
    {
      title: 'Formulario Sesión',
      content: <SessionForm
                  patientData={patient!}
                  parentData={parent!}
                />
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Title level={1}> Registrar Sesión </Title>

      <div className={styles.stepsWrap}>
        <Steps current={current} items={items} style={{width: '75%', margin: 'auto'}} />
        { steps[current].content }
      </div>

      <div style={{ marginTop: 24}} className={styles.buttons}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()} disabled={!patient}>
            Siguiente
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" htmlType='submit' form='userForm'>
            Registrar
          </Button>
        )}
      </div>

    </div>
)
}

export default CreateSession
