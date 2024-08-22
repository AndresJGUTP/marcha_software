import React, {useState} from 'react';
import styles from './style.module.css';
const axios = require('axios').default;

import { Typography, Button, InputNumber, Form, Select, message, Steps } from 'antd';
import ParentForm from 'components/organisms/ParentForm';
import PatientForm from 'components/organisms/PatientForm';
const { Title } = Typography;


const selectOptions = [
  {
    value: 'parent', label: 'Responsable',
  },
  {
    value: 'patient', label: 'Paciente',
  }
]

export interface IEditarUsuarioProps {
}

export default function EditarUsuario (props: IEditarUsuarioProps) {

  const [current, setCurrent] = useState(0);
  const [selectValue, setSelectValue] = useState("")
  const [user, setUser] = useState<any>()

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000,
  });

  const onFinish = (data: any) => {
    instance.get(`/${data['userType']}/${data['id']}`).then((response: any) => {
        setSelectValue(data['userType'])
        setUser(response.data)
        message.success('Usuario encontrado')
      })
      .catch((error: any) => {
        console.error(error)
        message.error('Usuario no encontrado')
        setUser(null)
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const steps = [
    {
      title: 'Buscar Usuario',
      content: <Form
                    name="EditarUsuario"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    className={styles.form}
                >
                    <Form.Item
                        label="Número de Documento"
                        name="id"
                        rules={[{ required: true, message: 'Por favor, ingrese el documento' }]}
                        >
                        <InputNumber controls={false} style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item
                      label="Tipo de usuario"
                      name="userType"
                      rules={[{ required: true, message: 'Por favor, seleccione el tipo de usuario' }]}
                    >
                      <Select options={selectOptions} />
                    </Form.Item>

                    <Form.Item style={{margin: 'auto', display: 'block', width: 100}} >
                        <Button type="primary" htmlType="submit">
                            Buscar
                        </Button>
                    </Form.Item>
                </Form>
    },
    {
      title: 'Datos personales',
      content: selectValue == 'parent' ? <ParentForm parentData={user} /> : <PatientForm patientData={user} />
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className={styles.stepsWrap}>
      <Title>Editar Usuario</Title>
        <Steps current={current} items={items} style={{width: '75%', margin: 'auto'}} />

          { steps[current].content }

          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()} disabled={!user}>
                Siguiente
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Anterior
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" htmlType='submit' form='userForm'>
                Editar
              </Button>
            )}
          </div>

      </div>
  );
}
