import React, {useState, useImperativeHandle} from 'react';
import { Select } from 'antd';
// import styles from "./style.module.css";

interface ISelectUserRolProps {
    selectValue : string
}

const SelectUserRol: React.FC<ISelectUserRolProps> = ({selectValue}) => {
    
    const [currentSelect, setCurrentSelect] = useState(selectValue)

    const handleChange = (value: string) => {
        setCurrentSelect(value)
      };

    return <>
    <Select
        defaultValue=""
        style={{ width: 120 }}
        onChange={handleChange}
        value={currentSelect}
        options={[
            { value: 'responsable', label: 'Responsable' },
            { value: 'paciente', label: 'Paciente' },
        ]}
    />
    </>
}

export default SelectUserRol;
