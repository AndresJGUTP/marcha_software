import React from 'react';
import { Header } from "antd/lib/layout/layout";
import HeaderIcon from "../../atoms/headerIcon/headerIcon";
import styles from "./style.module.css";
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { HomeOutlined, PhoneOutlined, DownOutlined, FundOutlined} from '@ant-design/icons';
import UserAccessMenu from '../UserAccessMenu/UserAccessMenu';
import { useRouter } from 'next/router'

const items: MenuProps['items'] = [
    {
      label: 'Inicio',
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: 'Gestionar Usuarios',
      icon: <DownOutlined />,
      key: '/gestionar_usuarios',
      children: [
        {
          type: 'group',
          children: [
            {
              label: 'Agregar usuario',
              key: '/gestionar_usuarios/registrar_usuario',
            },
            {
              label: 'Editar usuario',
              key: '/gestionar_usuarios/editar_usuario',
            },
          ],
        },
      ]
    },
    {
      label: 'Gestionar Sesiones',
      icon: <DownOutlined />,
      key: '/gestionar_sesiones',
      children: [
        {
          type: 'group',
          children: [
            {
              label: 'Agregar sesión',
              key: '/gestionar_sesiones/crear_sesion',
            },
            {
              label: 'Editar sesión',
              key: '/gestionar_sesiones/editar_sesion',
            },
          ],
        },
      ]
    },
    {
      label: 'Consultar Reporte',
      key: '/consultar_reporte',
      icon: <FundOutlined />,
    },
    // {
    //   label: 'Visualizar Resonancia',
    //   key: '/visualizar_resonancia',
    //   icon: <FundOutlined />,
    // },
  ]

  
  const HeaderMenu : React.FC = () => {
    
    const router = useRouter()
    
    const openInNewTab = (url: string) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

    const onClick: MenuProps['onClick'] = (e) => {

      router.push(e.key)
    };

    return(
        <Header className={styles.header} style={{backgroundColor: 'white', paddingLeft:'1em'}}>
            <HeaderIcon className={styles.headerIcon} />
            <Menu onClick={onClick} mode="horizontal" items={items} className={styles.menuHeader} />
            {/* <Button type='primary' style={{margin: 'auto 0 auto auto'}} onClick={() => openInNewTab(process.env.BASE_URL+'/admin')}>Admin</Button> */}
            {/* <UserAccessMenu /> */}
        </Header>
    )
}

export default HeaderMenu;