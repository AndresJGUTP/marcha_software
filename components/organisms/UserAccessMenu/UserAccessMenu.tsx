import * as React from 'react';
import styles from "./style.module.css";
import { useRouter } from 'next/router'


export interface IUserAccessMenuProps {
}

export default function UserAccessMenu (props: IUserAccessMenuProps) {

    const router = useRouter()

    const handleOnClick : React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        router.push(e.currentTarget.id)
    }

    return (
        <div className={styles.container} >
            <button className={styles.login} onClick={handleOnClick} id='login' > Iniciar sesión </button>
            <button className={styles.signup} onClick={handleOnClick} id='signup'> Crear una cuenta </button>
        </div>
    );
}
