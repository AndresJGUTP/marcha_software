import React, { useState, useEffect } from 'react';

const axios = require('axios').default;

import {
    Form,
    Select,
} from 'antd';

interface ISelectDocumentTypeProps {

}

const SelectDocumentType: React.FC<ISelectDocumentTypeProps> = () => {


    const [documentTypes, setDocumentTypes] = useState(null);


    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 1000,
    });

    useEffect(() => {
        instance.get('/document_type/').then((response: any) => {
            response = response.data.map(
                (docType: any) => {
                    return {
                        label: docType.document_name,
                        value: docType.ID_document_type
                    }
                }
            )
            setDocumentTypes(response)
        })
            .catch((error: any) => {
                setDocumentTypes(null)
                console.log(error)
            });
    }, [])


    return <>
        <Form.Item label="Tipo de documento" name="ID_document_type" rules={[{ required: true, message: 'Campo obligatorio' }]}>
            <Select loading={!documentTypes} options={documentTypes || []} />
        </Form.Item>
    </>
}

export default SelectDocumentType;