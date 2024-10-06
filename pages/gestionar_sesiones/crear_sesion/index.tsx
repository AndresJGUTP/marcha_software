import React, { useState, FC, useEffect, useRef } from 'react';
import SelectUser from 'components/molecules/SelectUser';
import { Button, Steps, Typography } from 'antd';
import styles from "./style.module.css";
import SessionForm from 'components/organisms/SessionForm';
import SessionFilesUpload from 'components/organisms/SessionFilesUpload';
import ModalStatus from 'components/molecules/ModalStatus';
import { useIsMount } from '../editar_sesion';

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
  const isMount = useIsMount();

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000,
  });

  const retrieveStatesFromLocalStorage = () => {
    if(localStorage){
        console.log('Recuperando estados')

        if(parseInt(localStorage.currentCrear) == 1){
          setPatient( localStorage.getItem('patientCrear') ? JSON.parse(localStorage.patientCrear) : null  )
          setParent( localStorage.getItem('parentCrear') ? JSON.parse(localStorage.parentCrear) : null  )
          setCurrent( localStorage.currentCrear ? parseInt(localStorage.currentCrear) : 0  )
          setSessionId( localStorage.sessionIdCrear ? parseInt(localStorage.sessionIdCrear) : null  )
        }
    }
}

  useEffect(() =>{
    if(localStorage.patientCrear){
        (JSON.parse(localStorage.patientCrear) && parseInt(localStorage.currentCrear) == 1 ) && alert('Se ha encontrado una sesión sin guardar. Si no se guarda, se perderán los datos')
    }
    retrieveStatesFromLocalStorage()
  }, [])

  useEffect(() => {
    if(localStorage && isMount){
        localStorage.setItem( 'patientCrear', JSON.stringify(patient) )
        localStorage.setItem( 'parentCrear', JSON.stringify(parent) )
        localStorage.currentCrear = current.toString()
  }
}, [patient, parent, current])

  useEffect(() => {
    patient && instance.get(`/parent/${patient['id_parent']}`).then((response: any) => {
      setParent(response.data)
  }).catch((error: any) => {
      console.error(error)
      retrieveStatesFromLocalStorage()
  });
  }, [patient])

  useEffect(() => {
    if(sessionId){
      localStorage.removeItem( 'patientCrear')
      localStorage.removeItem( 'parentCrear')
      localStorage.removeItem('currentCrear')
      localStorage.removeItem('sessionIdCrear')
    }
  }, [sessionId])

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
    if(current + 1 == 2){
      localStorage.removeItem('sessionDataCache')
    }

    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
    if(current - 1 == 0){
      setParent(null)
      setPatient(null)
      setSessionId(null)
      localStorage.removeItem('sessionDataCache')
    }
  };

  const resetStates = () => {
    setPatient(null)
    setParent(null)
    setCurrent(0)
    setSessionId(null)
    localStorage.removeItem('sessionDataCache')
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
                closable: requestStatus == 'error',
                onCancel: () => { requestStatus == 'error' && setModalOpen(false)},
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
