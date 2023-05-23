import React, { useState } from 'react';
import { Input, Alert, Tooltip, AlertProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const axios = require('axios').default;

import styles from "./style.module.css";

interface ISelectParentProps {
    setIdParent: Function
}

const SelectParent: React.FC<ISelectParentProps> = ({ setIdParent }) => {

    const [parent, setParent] = useState()
    const [requestStatus, setRequestStatus] = useState<string>()

    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 1000,
    });


    const searchParent = (e: any) => {
        setRequestStatus('loading')
        instance.get(`/parent/${e}`).then((response: any) => {
            setRequestStatus('success')
            setParent(response.data)
            setIdParent(response.data.id)
        })
            .catch((error: any) => {
                setRequestStatus('error')
                console.error(error)
            });
    };

    const { Search } = Input

    return <>
        <div className={styles.wraper}>
            <Tooltip title="Cada paciente debe tener un responsable. Si este no existe, se debe crear primero" >
                <span> Buscar Responsable <InfoCircleOutlined /> </span>
            </Tooltip>
            <Search
                placeholder="Numero de documento"
                enterButton="Buscar"
                size="middle"
                onSearch={searchParent}
                loading={requestStatus == 'loading'}
                style={{ marginBottom: '1em' }}
            />
            {
                requestStatus &&
                <Alert
                    type={requestStatus as AlertProps['type']}
                    message={requestStatus == 'success' ? 'Responsable encontrado' : requestStatus == 'loading' ? 'Cargando...' : 'Documento no encontrado'}
                    description={requestStatus == 'success' ? `${parent!['first_name']} ${parent!['first_last_name']}` : ''}
                />
            }
        </div>
    </>
}

export default SelectParent;
