import React from 'react';

import { FormOutlined, ReconciliationOutlined, UserSwitchOutlined, ToolOutlined } from '@ant-design/icons';
import { Menu, Layout, MenuProps } from 'antd';
import { useRouter } from 'next/router'

const { Sider } = Layout

export interface IAdminSidebarProps {
}

const AdminSidebar = () => {

    const router = useRouter()

    const items: MenuProps['items'] = [
        {
            label: 'Gestionar Sesiones',
            key: '/admin/gestionar_sesiones',
            icon: <ReconciliationOutlined />,
            onClick: (e) => router.push(e.key)
        },
        {
            label: 'Gestionar Reportes',
            key: '/admin/gestionar_reportes',
            icon: <FormOutlined />,
            onClick: (e) => router.push(e.key)
        },
        {
            label: 'Gestionar Usuarios',
            key: '/admin/gestionar_usuarios',
            icon: <UserSwitchOutlined />,
            onClick: (e) => router.push(e.key)
        },
        // {
        //     label: 'Reportes',
        //     icon: <FundOutlined />,
        //     key: 'item_reportes',
        //     children:[
        //         {
        //             label: 'Consultar',
        //             key: 'consultar_reporte',
        //             icon: <QuestionCircleOutlined />,
        //             onClick: (e) => router.push(e.key)
        //         },
        //         {
        //             label: 'Gestionar',
        //             key: 'gestionar_reporte',
        //             icon: <FormOutlined />,
        //             onClick: (e) => router.push(e.key)
        //         },
        //     ]
        // },
        // {
        //     label: 'Usuarios',
        //     icon: <UserOutlined />,
        //     key: 'item_usuarios',
        //     children:[
        //         {
        //             label: 'Consultar',
        //             key: 'consultar_usuario',
        //             icon: <QuestionCircleOutlined />,
        //             onClick: (e) => router.push(e.key)
        //         },
        //         {
        //             label: 'Gestionar',
        //             key: '/admin/gestionar_usuario',
        //             icon: <UserSwitchOutlined />,
        //             onClick: (e) => router.push(e.key)
        //         },
        //     ]
        // },
    ]

    return (
        <Sider width={200} style={{ background: 'white' }} >
            <div style={{ margin: 10, padding: 5, display: 'flex', justifyContent: 'space-evenly' }} >
                <ToolOutlined style={{ fontSize: 16, lineHeight: 'inherit', color: 'black' }} />
                <strong style={{ fontSize: 15 }}>
                    ADMINISTRADOR
                </strong>
            </div>
            <Menu
                mode="inline"
                // style={{ height: '100%', borderRight: 0 }}
                items={items}
            />
        </Sider>
    );
};

export default AdminSidebar
