import React from 'react';
import { Header } from "antd/lib/layout/layout";
import HeaderIcon from "../../atoms/headerIcon/headerIcon";
import styles from "./style.module.css";
import type { MenuProps } from 'antd';
import { Button, Menu, Grid } from 'antd';
import { HomeOutlined, ToolOutlined, DownOutlined, FundOutlined} from '@ant-design/icons';
import UserAccessMenu from '../UserAccessMenu/UserAccessMenu';
import { useRouter } from 'next/router'
import store from 'lib/store';
import { useDispatch } from 'react-redux';
import { resetUser } from 'lib/states/user';

const { useBreakpoint } = Grid;

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
    {
      label: 'Diagnóstico',
      key: '/gestionar_diagnosticos',
      icon: <DownOutlined />,
      children: [
        {
          type: 'group',
          children: [
            {
              label: 'Realizar diagnóstico',
              key: '/gestionar_diagnosticos/crear_diagnostico',
            },
            {
              label: 'Editar diagnóstico',
              key: '/gestionar_diagnosticos/editar_diagnostico',
            },
          ],
        },
      ]
    },
    {
      label: 'Configuración',
      key: '/configuracion',
      icon: <ToolOutlined />,
    },
  ]

  
const HeaderMenu : React.FC = () => {
    
    const router = useRouter()
    const screens = useBreakpoint();
    const dispatch = useDispatch()

    const user = store.getState().user

    const onClick: MenuProps['onClick'] = (e) => {

      router.push(e.key)
    };

    if (!screens.lg || !user.isAuthenticated  ) {
      return <> </>;
    }

    const handleLogOut = () => {
      dispatch(resetUser())
      router.push('')
    }

    return(
        <Header className={styles.header} style={{backgroundColor: 'white', paddingLeft:'1em'}}>
            <HeaderIcon className={styles.headerIcon} />
            <Menu onClick={onClick} mode="horizontal" items={items} className={styles.menuHeader} />
            {
              user.isAuthenticated && 
                <Button danger style={{margin: 'auto 0 auto auto'}} onClick={() => {handleLogOut()}}>Cerrar Sesión</Button>
            }

            {/* <Button type='primary' style={{margin: 'auto 0 auto auto'}} onClick={() => openInNewTab(process.env.BASE_URL+'/admin')}>Admin</Button> */}
            {/* <UserAccessMenu /> */}
        </Header>
    )
}

export default HeaderMenu;