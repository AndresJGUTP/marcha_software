import React, { useState } from 'react';
import { Input, Alert, Tooltip, AlertProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const axios = require('axios').default;

import styles from "./style.module.css";

interface ISelectUserProps {
    readonly user? : Record<string, any> | null
    readonly setUser : Function
    readonly endpoint : string
    readonly tooltip : string
    readonly userType : string
    readonly setIsUserFound: Function; 
}

const SelectUser: React.FC<ISelectUserProps> = ({user, setUser, endpoint, tooltip, userType, setIsUserFound}) => {

    const [requestStatus, setRequestStatus] = useState<string>()

    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 1000,
    });


    const searchParent = (e: any) => {
        if (!e || e.trim() === '') {
            setRequestStatus('error');
            setUser(null);
            setIsUserFound(false);
            return;
        }
        setRequestStatus('loading');
        instance.get(`${endpoint}${e}`)
            .then((response: any) => {
                setRequestStatus('success');
                setUser(response.data);
                setIsUserFound(true); 
            })
            .catch((error: any) => {
                setRequestStatus('error');
                setUser(null);
                setIsUserFound(false);
                console.error(error);
            });
    };

    const { Search } = Input

    return (<>
        <div className={styles.wraper}>
            <Tooltip title={tooltip} >
                <span> Buscar {userType} <InfoCircleOutlined /> </span>
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
                    message={requestStatus == 'success' ? `${userType} encontrado` : requestStatus == 'loading' ? 'Cargando...' : 'Documento no encontrado'}
                    description={requestStatus == 'success' ? `${user!['first_name']} ${user!['first_last_name']}` : ''}
                />
            }
        </div>
    </>)
}

export default SelectUser;
