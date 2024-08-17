import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';

const { Sider, Content } = Layout;
const { TextArea } = Input;
const axios = require('axios').default;

const DiagnosticarPaciente: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>('Selecciona una opción para ver el contenido');
  const [anexos, setAnexos] = useState<{ name: string, element: React.ReactNode }[]>([]);
  const [diagnostico, setDiagnostico] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchSessionData = async () => {
        try {
          const response = await axios.get(`${process.env.BASE_URL}/session/${id}/`);
          const sessionData = response.data;

          if (sessionData.diagnostico_realizado) {
            setDiagnostico(sessionData.diagnostico_realizado);
          }
        } catch (error) {
          console.error('Error al obtener los datos de la sesión:', error);
        }
      };

      fetchSessionData();

      setContent(
        <a href={`${process.env.BASE_URL}/pdf/${id}/`} target="_blank" rel="noopener noreferrer">
          Ver PDF
        </a>
      );
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchAnexos = async () => {
        try {
          const response = await axios.get(`${process.env.BASE_URL}/session/${id}/get_attached_images_base64/`);
          const attachedImages = response.data.attached_images_graphics;

          const images = attachedImages.map((base64Image: string, index: number) => ({
            name: `Anexo ${index + 1}`,
            element: (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  padding: '10px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  maxHeight: '450px', 
                  overflowY: 'auto',  
                }}
              >
                <img
                  src={`data:image/png;base64,${base64Image}`}
                  alt={`Anexo ${index + 1}`}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            ),
          }));

          setAnexos(images);
        } catch (error) {
          console.error('Error al cargar los anexos:', error);
        }
      };

      fetchAnexos();
    }
  }, [id]);

  const handleMenuClick = (e: { key: string }) => {
    const keyParts = e.key.split('-');
    if (keyParts[0] === '1') {
      setContent(
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/pdf/${id}/`} target="_blank" rel="noopener noreferrer">
          Ver PDF
        </a>
      );
    } else if (keyParts[0] === '2') {
      setContent(`Contenido para la opción ${keyParts[0]}`);
    } else if (keyParts[0] === '3') {
      const selectedAnexo = anexos[parseInt(keyParts[1], 10)];
      setContent(selectedAnexo?.element || 'Anexo no encontrado');
    } else {
      setContent(`Contenido para la opción ${e.key}`);
    }
  };

  const handleDiagnosticoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiagnostico(e.target.value);
  };

  const handleTerminarDiagnostico = async () => {
    if (!diagnostico) {
      message.error('Por favor ingrese un diagnóstico antes de terminar.');
      return;
    }
  
    try {
      await axios.put(`${process.env.BASE_URL}/session/${id}/update_diagnostico/`, {
        diagnostico_realizado: diagnostico,
      });
      message.success('Diagnóstico actualizado exitosamente.');
      router.push('/gestionar_diagnosticos/editar_diagnostico');
    } catch (error) {
      console.error('Error actualizando el diagnóstico:', error);
      message.error('Error al actualizar el diagnóstico.');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1">Reporte en PDF</Menu.Item>
          <Menu.Item key="2">Videos</Menu.Item>
          <Menu.SubMenu key="3" title="Anexos">
            {anexos.map((anexo, index) => (
              <Menu.Item key={`3-${index}`}>{anexo.name}</Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px', flex: 1 }}>
        <Content style={{ padding: '24px', minHeight: 280 }}>
          <div style={{ marginBottom: '16px' }}>
            <h2>Diagnóstico para la Sesión {id}</h2>
            <div>{content}</div>
          </div>
          <h3>Ingrese el Diagnóstico</h3>
          <TextArea
            rows={4}
            placeholder="Escribe aquí..."
            value={diagnostico}
            onChange={handleDiagnosticoChange}
          />
          <div style={{ paddingTop: '15px'}}>
            <Button type="primary" onClick={handleTerminarDiagnostico}>Terminar Diagnóstico</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DiagnosticarPaciente;
