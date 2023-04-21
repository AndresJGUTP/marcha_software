import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import type { InputProps as RcInputProps } from 'rc-input';
import moment from 'moment';
import styles from "./style.module.css";

interface IFormItemProps {
    value: string,
    label: string,
    type: RcInputProps["type"] | 'DatePicker'
}

const dateFormat = 'DD/MM/YYYY'

const FormItem: React.FC<IFormItemProps> = ({value, label, type}) => {
    let element = <></>

    if(type == 'DatePicker'){
         element = <DatePicker defaultValue={moment(value, dateFormat)} format={dateFormat}/>
        }
        else{
            element = <Input value={value.toUpperCase()} style={{width: '100%'}} type={type} className={styles.inputForm} />
            }
  return <>
    <Form.Item label={label} style={{width: '45%', marginBottom: "15px"}}>
        {   
            element
        }
    </Form.Item>
  </>
};

export default FormItem;
