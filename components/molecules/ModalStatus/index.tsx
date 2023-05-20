import React from 'react';

import { Modal, Spin, Result, ModalProps } from 'antd';

import {
    message,
  } from 'antd';


interface IModalStatusProps {
    readonly requestStatus : string
    readonly successMessage : {
        title?: React.ReactNode;
        subTitle?: React.ReactNode;
    }
    readonly errorMessage : {
        title?: React.ReactNode;
        subTitle?: React.ReactNode;
    }
    readonly modalProps ? : ModalProps
}

const ModalStatus: React.FC<IModalStatusProps> = ({requestStatus, successMessage, errorMessage, modalProps}) => {

    const [messageApi, contextHolder] = message.useMessage();

    const renderModal = () => {
        let component = <> </>
        if(requestStatus == 'loading'){
            component = <Spin tip="Cargando" size="large" style={{fontSize: '2em'}}>
                <div className="content" style={{padding: 100}} />
            </Spin>
        }
        else if(requestStatus == 'success'){
            component = <Result
                status="success"
                {...successMessage}
            />
        }
        else{
            component = <Result
                status="warning"
                {...errorMessage}
            />
        }

        return component
    }

    return <>
        <Modal
            {...modalProps}
        >
            {
                renderModal()
            }
        </Modal>

        {contextHolder}
    </>
}

export default ModalStatus;