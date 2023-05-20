import React, { useState } from 'react';

import { Button, Steps } from 'antd';

import styles from './style.module.css';
import { Select, Typography } from 'antd';

import ParentForm from 'components/organisms/ParentForm';

const { Title } = Typography;


export interface IRegisterParentProps {
}

const RegisterParent = () => {
  
  const [current, setCurrent] = useState(0);

  const [selectValue, setSelectValue] = useState("")
  
  const handleSelectChange = (value: string) => {
    setSelectValue(value)
    next()
  };
  
  const steps = [
    {
      title: 'Tipo de Usuario',
      content: <Select
                defaultValue=""
                className={styles.selectForm}
                onChange={handleSelectChange}
                value={selectValue}
                options={[
                    { value: 'responsable', label: 'Responsable' },
                    { value: 'paciente', label: 'Paciente' },
                ]}
              />
    },
    {
      title: 'Datos personales',
      content: <ParentForm />
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
    <div>
      <Title level={1}> Registro Nuevo Usuario {selectValue && " - " + selectValue.toUpperCase()} </Title>

      <div className={styles.stepsWrap}>
        <Steps current={current} items={items} style={{width: '75%', margin: 'auto'}} />

          { steps[current].content }

          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
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
                Registrar
              </Button>
            )}
          </div>

      </div>

    </div>
  );
};

export default RegisterParent
