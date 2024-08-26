import React, { useState, FC, useEffect, useRef } from 'react';
import SelectUser from 'components/molecules/SelectUser';
import { Button, Steps, Typography } from 'antd';
import styles from "./style.module.css";
import SessionForm from 'components/organisms/SessionForm';
import SessionFilesUpload from 'components/organisms/SessionFilesUpload';
import ModalStatus from 'components/molecules/ModalStatus';

const axios = require('axios').default;

const { Title } = Typography;

export interface ICreateSessionProps {
}

const CreateSession : FC<ICreateSessionProps> = () => {
  
  const [patient, setPatient] = useState(null)
  const [parent, setParent] = useState(null)
  const [current, setCurrent] = useState(0)
  const [sessionId, setSessionId] = useState(null)
  const [isUserFound, setIsUserFound] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [requestStatus, setRequestStatus] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const formSessionRef = useRef<any>();

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000,
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
                  setIsUserFound={(value: boolean) => {
                    setIsUserFound(value);
                    setIsFormDisabled(!value);
                }}
                  />
                </div>
    },
    {
      title: 'Formulario Sesión',
      content: <SessionForm
                  patientData={patient!}
                  parentData={parent!}
                  formSessionRef={formSessionRef}
                  setSessionId={setSessionId}
                  setRequestStatus={setRequestStatus}
                />
    },
    {
      title: 'Subir Archivos',
      content: <SessionFilesUpload session_id={sessionId!} />
    }
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const resetStates = () => {
    setPatient(null)
    setParent(null)
    setCurrent(0)
    setSessionId(null)
  }

  return (
    <div>
      <ModalStatus
        requestStatus={requestStatus} 
        modalProps = {
            {
                open: modalOpen,
                cancelButtonProps: {hidden: true},
                okButtonProps:{ hidden: requestStatus == 'loading' },
                closable: false,
                okText: requestStatus == 'error' ? 'Reenviar' : 'Siguiente',
                onOk: () => {
                    if(requestStatus == 'success'){
                        setModalOpen(false)
                        next()
                    } else{
                        setSessionId(null)
                        setRequestStatus('loading')
                        formSessionRef.current!.submit()
                    }
                }
            }
        }
        successMessage={
            { title: 'Sesión Guardada Exitosamente'}
        }
        errorMessage={
            {title: 'Error Guardando La Sesión'}
        }
      />

      <Title level={1}> Registrar Sesión </Title>

      <div className={styles.stepsWrap}>
        <Steps current={current} items={items} style={{width: '75%', margin: 'auto'}} />
        { steps[current].content }


      </div>

      <div style={{ marginTop: 24}} className={styles.buttons}>
        {current == 1 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
        {(current < steps.length - 1 && current != 1 )&& (
          <Button 
            onClick={() => next()} 
            disabled={!patient} 
            type="primary" 
            >
            Siguiente
          </Button>
        )}
        {
          current == 1 && <Button 
            onClick={() => {
              setRequestStatus('loading')
              setModalOpen(true)
              formSessionRef.current!.submit()
            }
            } 
            disabled={!patient && !parent} 
            type="primary" 
            >
            Guardar
          </Button>
        }
        {current === steps.length - 1 && (
          <Button onClick={() => resetStates()} type="primary"  >
            Finalizar
          </Button>
        )}
      </div>

    </div>
)
}

export default CreateSession
