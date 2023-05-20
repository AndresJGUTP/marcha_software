import React from 'react';
import { Header } from "antd/lib/layout/layout";
import HeaderIcon from "../../atoms/headerIcon/headerIcon";
import styles from "./style.module.css";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
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
      label: '¿Quiénes somos?',
      key: '/about',
    },
    {
      label: 'Servicios',
      key: '/SubMenu',
      icon: <DownOutlined />,
      children: [
        {
          type: 'group',
          label: 'Análisis de la marcha',
          children: [
            {
              label: 'Cinemática',
              key: '/setting:1',
            },
            {
              label: 'Cinética',
              key: '/setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Volumetría Cerebral',
          children: [
            {
              label: 'Cambio temporal en volumetría',
              key: '/setting:3',
            },
            {
              label: 'Registro de imágenes medicas',
              key: '/setting:4',
            },
          ],
        },
      ],
    },
    {
      label: 'Contacto',
      key: '/contact',
      icon: <PhoneOutlined />
    },
    {
      label: 'Consultar Reporte',
      key: '/consultar_reporte',
      icon: <FundOutlined />,
    },
  ]

const HeaderMenu : React.FC = () => {

    const router = useRouter()

    const onClick: MenuProps['onClick'] = (e) => {

      router.push(e.key)
    };

    return(
        <Header className={styles.header} style={{backgroundColor: 'white', paddingLeft:'1em'}}>
            <HeaderIcon className={styles.headerIcon} />
            <Menu onClick={onClick} mode="horizontal" items={items} className={styles.menuHeader} />
            <UserAccessMenu />
        </Header>
    )
}

export default HeaderMenu;