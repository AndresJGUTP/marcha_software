import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, Input, Button, message, Spin } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

const { Sider, Content } = Layout;
const { TextArea } = Input;

const DiagnosticarPaciente: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>('Selecciona una opción para ver el contenido');
  const [anexos, setAnexos] = useState<{ name: string, element: React.ReactNode }[]>([]);
  const [diagnostico, setDiagnostico] = useState<string>(''); 
  const [pdfBase64, setPdfBase64] = useState<string | null>(null); 
  const [loadingPdf, setLoadingPdf] = useState<boolean>(false); 
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('1'); 
  const router = useRouter();
  const { id } = router.query;

  const fetchPdf = useCallback(async () => {
    if (id && !pdfBase64) {
      setLoadingPdf(true);
      try {
        const response = await axios.get(`${process.env.BASE_URL}/pdf/${id}/`, {
          responseType: 'blob', 
        });
  
        const pdfUrl = URL.createObjectURL(response.data);
  
        setPdfBase64(pdfUrl); 
  
        setContent(
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            style={{ border: 'none' }}
            title="PDF"
          />
        );
      } catch (error: any) {
        console.error('Error al cargar el PDF:', error.response?.data || error.message);
        setContent('Error al cargar el PDF.');
      } finally {
        setLoadingPdf(false);
      }
    }
  }, [id, pdfBase64]);

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

  useEffect(() => {
    if (id && selectedMenuKey === '1') {
      fetchPdf(); 
    }
  }, [id, selectedMenuKey, fetchPdf]);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuKey(e.key); 
    const keyParts = e.key.split('-');
    if (keyParts[0] === '1') {
      if (!pdfBase64) {
        fetchPdf(); 
      } else {
        setContent(
          <iframe
            src={pdfBase64}
            width="100%"
            height="600px"
            style={{ border: 'none' }}
            title="PDF"
          />
        );
      }
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
          selectedKeys={[selectedMenuKey]} 
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
            {loadingPdf ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Spin tip="Cargando PDF..." />
              </div>
            ) : (
              <div>{content}</div>
            )}
          </div>
          <h3>Ingrese el Diagnóstico</h3>
          <TextArea
            rows={4}
            placeholder="Escribe aquí..."
            value={diagnostico}
            onChange={handleDiagnosticoChange}
          />
          <div style={{ paddingTop: '15px' }}>
            <Button type="primary" onClick={handleTerminarDiagnostico}>Terminar Diagnóstico</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DiagnosticarPaciente;