import React, { useState, FC, useEffect, useRef } from 'react';
import SelectUser from 'components/molecules/SelectUser';
import { Button, Steps, Typography, List, Skeleton, Popconfirm, message  } from 'antd';
import styles from "./style.module.css";
import SessionForm from 'components/organisms/SessionForm';
import SessionFilesUpload from 'components/organisms/SessionFilesUpload';
import ModalStatus from 'components/molecules/ModalStatus';


const axios = require('axios').default;

const { Title } = Typography;

export interface IEditUserProps {
}

export const useIsMount = () => {
  const isMountRef = useRef(false);
  useEffect(() => {
    isMountRef.current = true;
  }, []);
  return isMountRef.current;
};

const EditUser: FC<IEditUserProps> = () => {

    const [patient, setPatient] = useState(null)
    const [parent, setParent] = useState(null)
    const [current, setCurrent] = useState(0)
    const [sessions, setSessions] = useState<any>(null)
    const [sessionEdit, setSessionEdit] = useState<any>(null)
    const [sessionId, setSessionId] = useState<any>(null)
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
            if(parseInt(localStorage.current) == 1){
                setPatient( localStorage.getItem('patient') ? JSON.parse(localStorage.patient) : null  )
                setParent( localStorage.getItem('parent') ? JSON.parse(localStorage.parent) : null  )
                setCurrent( localStorage.current ? parseInt(localStorage.current) : 0  )
                setSessions( localStorage.getItem('sessions') ? JSON.parse(localStorage.sessions) : null )
                setSessionEdit( localStorage.getItem('sessionEdit') ? JSON.parse(localStorage.sessionEdit) : null  )
                setSessionId( localStorage.sessionId ? parseInt(localStorage.sessionId) : null  )
            }
        }
    }

    useEffect(() =>{
        if(localStorage.patient && parseInt(localStorage.current) == 1){
            JSON.parse(localStorage.patient) && alert('Se ha encontrado una sesión sin guardar. Si no se guarda, se perderán los datos')
        }
        retrieveStatesFromLocalStorage()
    }, [])

    useEffect(() => {
        if(localStorage && isMount){
            localStorage.setItem( 'patient', JSON.stringify(patient) )
            localStorage.setItem( 'parent', JSON.stringify(parent) )
            localStorage.current = current.toString()
            localStorage.setItem( 'sessions', JSON.stringify(sessions) )
            localStorage.setItem( 'sessionEdit', JSON.stringify(sessionEdit) )
      }
    }, [patient, parent, current, sessions, sessionEdit])
    
    useEffect(() => {

        if (patient && isMount) {
            instance.get(`/parent/${patient['id_parent']}`).then((response: any) => {
                setParent(response.data)

                instance.get(`/session/${patient['id']}/get_session_by_patient_id/`).then((response: any) => {
                    setSessions(response.data)
                })

            }).catch((error: any) => {
                console.error(error)
                retrieveStatesFromLocalStorage()
            });
        }
        // else{
        //     setSessions(null)
        //     setParent(null)
        //     setPatient(null)
        //     setSessionId(null)
        //     setSessionEdit(null)
        // }
    }, [patient])

    useEffect(() => {
        if(sessionId){
          localStorage.removeItem('patient')
          localStorage.removeItem('parent')
          localStorage.removeItem('current')
          localStorage.removeItem('sessionIdCrear')
          localStorage.removeItem('sessions')
          localStorage.removeItem('sessionEdit')
        }
      }, [sessionId])

    const handleOnDelete = (id: number) => {
        instance.delete(`/session/${id}/`).then(() => {
            message.success('Se ha eliminado la sesión')
            instance.get(`/session/${patient!['id']}/get_session_by_patient_id/`).then((response: any) => {
                setSessions(response.data)
            })
        }).catch( () =>   message.error('Ha ocurrido un error'))
    }

    const handleOnEdit = (id: number) => {
        instance.get(`/session/${id}/`).then((response: any) => {
            setSessionEdit(response.data)
            next()
        }).catch( () =>  { 
            message.error('Ha ocurrido un error') 
            setSessionEdit(null)
        })

    }

    const steps = [
        {
            title: 'Buscar la sesión',
            content: <>
                <div className={styles.selectForm}>
                    <SelectUser
                        user={patient}
                        setUser={setPatient}
                        endpoint='/patient/'
                        tooltip='El paciente debe estar registrado previamiente en Gestionar Usuarios'
                        userType='Paciente'setIsUserFound={(value: boolean) => {
                            setIsUserFound(value);
                            setIsFormDisabled(!value);}}
                        
                        />
                </div>
                {
                    sessions && <List
                    itemLayout="horizontal"
                    style={{width: '75%', margin: 'auto', maxHeight: '450px', overflowY: 'scroll'}}
                    dataSource={sessions}
                    renderItem={(item : any )=> (
                      <List.Item
                        id='adf'
                        actions={[
                            <Button key="edit" onClick={() => handleOnEdit(item['id'])} >Editar</Button>,
                            <Popconfirm 
                                title="Si elimina la sesión no se podrá recuperar ¿Desea eliminar?" 
                                okText="Si" 
                                cancelText="No"
                                id={item['id']}
                                onConfirm={() => handleOnDelete(item['id'])}
                                key={item['id']}
                            >
                                <Button key="delete" danger>Eliminar</Button>
                            </Popconfirm>
                        ]}
                      >
                        <Skeleton avatar title={false} active loading={false}>
                          <List.Item.Meta
                            title={<span>{`#${item.id} Fecha: ${ (new Date(item.session_date)).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: true, minute:'2-digit', second:'2-digit'}) }`}</span>}
                            description={item.physiotherapist_name && `Fisioterapeuta: ${item.physiotherapist_name}`}
                          />
                        </Skeleton>
                      </List.Item>
                    )}
                  />
                }
            </> 
        },
        {
            title: 'Formulario Sesión',
            content: <SessionForm
                patientData={patient!}
                parentData={parent!}
                formSessionRef={formSessionRef}
                setSessionId={setSessionId}
                sessionData={sessionEdit}
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

        if(current - 1 == 0){
            setSessions(null)
            setParent(null)
            setPatient(null)
            setSessionId(null)
            setSessionEdit(null)
            localStorage.removeItem('sessionDataCache')
        }
    };

    const final = () => {
        setCurrent(0);
        setSessions(null)
        setParent(null)
        setPatient(null)
        setSessionId(null)
        setSessionEdit(null)
        localStorage.removeItem('sessionDataCache')
    };

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
                                localStorage.removeItem('sessionDataCache')
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
            
            <Title level={1}> Editar Sesión </Title>

            <div className={styles.stepsWrap}>
                <Steps current={current} items={items} style={{ width: '75%', margin: 'auto' }} />
                {steps[current].content}
            </div>

            <div style={{ marginTop: 24 }} className={styles.buttons}>
                {current == 1 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
                {(current < steps.length - 1 && current != 1) && (
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
                        disabled={!patient}
                        type="primary"
                    >
                        Guardar
                    </Button>
                }
                {current === steps.length - 1 && (
                    <Button onClick={() => final()} type="primary" >
                        Finalizar
                    </Button>
                )}
            </div>

        </div>
    )
}

export default EditUser
