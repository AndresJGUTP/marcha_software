import React, { useState, FC, useEffect, useRef } from 'react';
import SelectUser from 'components/molecules/SelectUser';
import { Button, Steps, Typography, List, Skeleton, Popconfirm, message  } from 'antd';
import styles from "./style.module.css";
import SessionForm from 'components/organisms/SessionForm';
import SessionFilesUpload from 'components/organisms/SessionFilesUpload';


const axios = require('axios').default;

const { Title } = Typography;

export interface IEditUserProps {
}

const EditUser: FC<IEditUserProps> = () => {

    const [patient, setPatient] = useState(null)
    const [parent, setParent] = useState(null)
    const [current, setCurrent] = useState(0)
    const [sessions, setSessions] = useState<any>(null)
    const [sessionEdit, setSessionEdit] = useState<any>(null)
    const [sessionId, setSessionId] = useState(null)

    const formSessionRef = useRef<any>();

    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 1000,
    });

    useEffect(() => {

        if (patient) {
            instance.get(`/parent/${patient['id_parent']}`).then((response: any) => {
                setParent(response.data)

                instance.get(`/session/${patient['id']}/get_session_by_patient_id/`).then((response: any) => {
                    setSessions(response.data)
                })

            }).catch((error: any) => {
                console.error(error)
                setSessions(null)
                setParent(null)
                setPatient(null)
                setSessionId(null)
                setSessionEdit(null)
            });
        }
        else{
            setSessions(null)
            setParent(null)
            setPatient(null)
            setSessionId(null)
            setSessionEdit(null)
        }
    }, [patient])

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
                        userType='Paciente'
                        />
                </div>
                {
                    sessions && <List
                    // className="demo-loadmore-list"
                    // loading={initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
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
        }
    };

    return (
        <div>
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
                            next()
                            formSessionRef.current!.submit()
                        }
                        }
                        disabled={!patient}
                        type="primary"
                    // htmlType='submit'
                    // form='sessionForm'
                    >
                        Guardar
                    </Button>
                }
                {current === steps.length - 1 && (
                    <Button>
                        Finalizar
                    </Button>
                )}
            </div>

        </div>
    )
}

export default EditUser
