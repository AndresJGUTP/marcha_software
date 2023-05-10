import React from "react";
import styles from "./style.module.css";
import { useRouter } from 'next/router'

type Props = {
    className?: string
}

const HeaderIcon : React.FC<Props> = (props) => {

    const router = useRouter()

    return(
        <a style={{textDecoration: 'none'}} className={props.className} onClick={() => router.push('/')}>
            <div className={styles.logos}>
                <div className={styles.IconComfa}></div>
                <div className={styles.IconUTP}></div>
            </div>
        </a>
    )
}

export default HeaderIcon;