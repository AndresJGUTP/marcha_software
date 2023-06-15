import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Divider } from 'antd';

interface SessionFilesUploadProps {
  readonly session_id : string
}

const { Dragger } = Upload;


const SessionFilesUpload: React.FC<SessionFilesUploadProps> = ({session_id}) => {
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: '.csv,.c3d',
        showUploadList: {showRemoveIcon: false},
        action: `${process.env.BASE_URL}/session_upload/`,
        data: {session_id},
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          // console.log('Dropped files', e.dataTransfer.files);
        },
      };
    return (
        <>
            <Divider orientation="left">Cinemática</Divider>
                <Dragger {...props} style={{width: '75%', margin: 'auto'}}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text"> Sesión registrada por las <strong>cámaras</strong> </p>
                    <p className="ant-upload-hint">
                        Click o arrastre los archivos a esta área para cargar
                    </p>
                </Dragger>

            <Divider orientation="left">Electromiografía</Divider>
                <Dragger {...props} style={{width: '75%', margin: 'auto'}}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text"> Datos adquiridos por los sensores de <strong>electromiografía</strong> </p>
                    <p className="ant-upload-hint">
                        Click o arrastre los archivos a esta área para cargar
                    </p>
                </Dragger>
        </>
    );
};

export default SessionFilesUpload;