import React, { useState, FC } from 'react';
import SelectUser from 'components/molecules/SelectUser';
import styles from "./style.module.css";

export interface ICreateSessionProps {
}

const CreateSession : FC<ICreateSessionProps> = () => {
  
  const [patient, setPatient] = useState()

  return (
    <div className={styles.wraper}>
      <SelectUser 
          user={patient}
          setUser={setPatient}
          endpoint='/patient/'
          tooltip='El paciente debe estar registrado previamiente en Gestionar Usuarios'
          userType='Paciente'
          />
    </div>
)
}

export default CreateSession
