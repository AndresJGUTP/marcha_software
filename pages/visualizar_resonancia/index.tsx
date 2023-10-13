import React from 'react';
import {Typography} from 'antd';
const { Title } = Typography;



const VisualizarResonancia: React.FC = () => {
    return (
        <>
            <iframe 
                // src="http://localhost:3001/"
                src="https://viewer.ohif.org/"
                width='100%'
                height='100%'
            ></iframe>
        </>
    );
};

export default VisualizarResonancia;
