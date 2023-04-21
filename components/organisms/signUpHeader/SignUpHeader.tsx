import { Header } from "antd/lib/layout/layout";
import React from "react";
import styles from "./style.module.css";
import HeaderIcon from "../../atoms/headerIcon/headerIcon";

const SignUpHeader : React.FC = () => {

    return(
        <Header className={styles.Header}>
            <HeaderIcon />
            <a style={{textDecoration: 'none'}} href='login'> ¿Ya tienes una cuenta? </a>
        </Header>
    )
}

export default SignUpHeader;