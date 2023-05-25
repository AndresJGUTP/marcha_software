import React from 'react';

import {
    Form,
    Select,
} from 'antd';
import { DocumentTypes } from 'constants/DocumentTypes';

interface ISelectDocumentTypeProps {

}

const SelectDocumentType: React.FC<ISelectDocumentTypeProps> = () => {

    return <>
        <Form.Item label="Tipo de documento" name="ID_document_type" rules={[{ required: true, message: 'Campo obligatorio' }]}>
            <Select options={ DocumentTypes.map(({id, label}) => ({label, 'value': id}) ) } />
        </Form.Item>
    </>
}

export default SelectDocumentType;