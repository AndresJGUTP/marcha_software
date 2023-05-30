import React from 'react';

import {
    Form,
    Select,
} from 'antd';
import { DocumentTypes } from 'constants/DocumentTypes';
import { FormItemProps } from 'antd/es/form/FormItem';

interface ISelectDocumentTypeProps {
    readonly disabled ? : boolean
    readonly formItemProps ? : FormItemProps
}

const SelectDocumentType: React.FC<ISelectDocumentTypeProps> = ({disabled, formItemProps}) => {

    return <>
        <Form.Item label="Tipo de documento" name="ID_document_type" rules={[{ required: true, message: 'Campo obligatorio' }]} {...formItemProps}>
            <Select options={ DocumentTypes.map(({id, label}) => ({label, 'value': id}) ) } disabled={disabled} />
        </Form.Item>
    </>
}

export default SelectDocumentType;