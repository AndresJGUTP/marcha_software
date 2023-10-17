import React, { FC, ReactElement, ReactFragment, ReactHTMLElement, useState } from 'react';
import { Typography } from 'antd';
import { message, Upload, Divider } from 'antd';
import { Layout, Menu } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;
const { Content, Sider } = Layout;

import {
    AreaChartOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

interface IRenderOptionSelected{
    readonly label : string
    readonly description : string
    readonly name : string
}

const RenderOptionSelected : FC<IRenderOptionSelected> = ({label, description, name}) => {

    const props: UploadProps = {
        multiple: false,
        showUploadList: {showRemoveIcon: false},
        action: `${process.env.BASE_URL}/upload_configfile/`,
        data: {filename: name},
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name}: Subido exitosamente.`);
          } else if (status === 'error') {
            message.error(`${info.file.name}: Falló.`);
          }
        },
        onDrop(e) {
          // console.log('Dropped files', e.dataTransfer.files);
        },
      };

    return <>
        <Divider orientation="left">{label}</Divider>
        <Dragger {...props} name={name} accept='.json' style={{ width: '75%', margin: 'auto' }}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text"> {description} </p>
            <p className="ant-upload-hint">
                Click o arrastre los archivos a esta área para cargar
            </p>
        </Dragger>

    </>
}

const Config: FC = () => {

    const [itemSelected, setItemSelected] = useState<string | null>('gait')

    const normality_options : Record<string, IRenderOptionSelected> = {
        gait: {
            label: 'Ciclo de Marcha',
            description: "Curvas de normalidad para los ángulos durante un ciclo de marcha",
            name: 'gait'
        },
        force_plate: {
            label: 'Placas de Fuerza',
            description: "Curvas de normalidad para la fuerza aplicada en la pisada al realizar la marcha",
            name: 'force_plate'
        }
    }

    return (
        <>
            <Title level={1}> Configuración </Title>
            <Layout>
                <Content>
                    <Layout style={{ padding: '24px 0', background: 'white' }}>
                        <Sider width={250}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['gait']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                                items={[
                                    {
                                        key: '1',
                                        icon: <AreaChartOutlined />,
                                        label: 'Curvas de Normalidad',
                                        children: [
                                            {
                                                key: 'gait',
                                                label: 'Marcha'
                                            },
                                            {
                                                key: 'force_plate',
                                                label: 'Placas de Fuerza'
                                            },
                                        ]
                                    },
                                ]}
                                onSelect={({key}) => setItemSelected(key)}
                            />
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            { itemSelected && <RenderOptionSelected {...normality_options[itemSelected]}  />}
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </>
    );
};

export default Config;
