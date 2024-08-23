import { Layout, Typography } from 'antd'
import { Col, Row, Card, Divider, Space } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.css';
import HomeOptionCard from 'components/organisms/HomeOptionCard';

const { Meta } = Card;
const { Title, Paragraph } = Typography;
const { Content } = Layout;


export default function Home() {
  const router = useRouter();

  return (
    <>
      <Content>
        <Title level={1}> Sistema para el monitoreo automático de la marcha </Title>

        <div>
          <Paragraph style={{ width: '75%', textAlign: 'justify' }}>
            Software Desarrollado para el proyecto <i>"Sistema de monitoreo automático para la evaluación clínica de infantes con alteraciones neurológicas motoras mediante el análisis de volumetría cerebral y patrón de la marcha"</i> Financiado por MinCiencias bajo la convocatoria <i> 897 - Convocatoria para la financiación de proyectos de CTeI en salud que promuevan la medicina personalizada y la investigación traslacional </i>
          </Paragraph>
        </div>

        <Space wrap size={[32, 16]} align='center' direction='horizontal' style={{ width: '100%' }}>
          <HomeOptionCard
            cardTitle='Usuarios'
            content={
              <>
                <Card
                  hoverable
                  style={{ width: 250, padding: '1em', margin: '1em', height: '350px' }}
                  onClick={() => router.push('gestionar_usuarios/registrar_usuario')}
                  cover={<img alt="Agregar Usuario" src="/images/add_user.png" style={{ width: '75%', margin: 'auto' }} />}
                >
                  <Meta title="Crear Usuario Nuevo" description="En esta sección podrás registrar un nuevo paciente o responsable" />
                </Card>
                <Card
                  hoverable
                  style={{ width: 250, padding: '1em', margin: '1em', height: '350px' }}
                  cover={<img alt="Editar Usuario" src="/images/user_config.png" style={{ width: '75%', margin: 'auto' }} />}
                  onClick={() => router.push('gestionar_usuarios/editar_usuario')}
                >
                  <Meta title="Editar Usuario Existente" description="Sección dedicada a editar usuarios ya creados" />
                </Card>
              </>
            }
          />

          <HomeOptionCard
            cardTitle='Sesiones'
            content={
              <>
                <Card
                  hoverable
                  style={{ width: 250, padding: '1em', margin: '1em', height: '350px' }}
                  onClick={() => router.push('gestionar_sesiones/crear_sesion/')}
                  cover={<img alt="Agregar Usuario" src="/images/add_report.png" style={{ width: '75%', margin: 'auto' }} />}
                >
                  <Meta title="Nueva Sesión" description="En esta sección podrás crear una nueva sesión" />
                </Card>
                <Card
                  hoverable
                  style={{ width: 250, padding: '1em', margin: '1em', height: '350px' }}
                  cover={<img alt="Editar Usuario" src="/images/editar_reporte.png" style={{ width: '75%', margin: 'auto' }} />}
                  onClick={() => router.push('gestionar_sesiones/editar_sesion/')}
                >
                  <Meta title="Editar Sesión" description="Sección dedicada a editar sesiones ya creadas" />
                </Card>
              </>
            }
          />

          <HomeOptionCard
            cardTitle='Reportes'
            content={
              <>
                <Card
                  hoverable
                  style={{ width: 250, margin: '1em', height: '350px' }}
                  onClick={() => router.push('consultar_reporte/')}
                  cover={<img alt="Consultar Reporte" src="/images/report_icon.png" style={{ width: '75%', margin: 'auto' }} />}
                >
                  <Meta title="Consultar Reporte" description="En esta sección podrás generar un nuevo reporte" />
                </Card>
              </>
            }
          />

          <HomeOptionCard
            cardTitle='Diagnósticos'
            content={
              <>
                <Card
                  hoverable
                  style={{ width: 250, padding: '1em', margin: '1em', height: '350px' }}
                  onClick={() => router.push('gestionar_diagnosticos/crear_diagnostico/')}
                  cover={<img alt="Agregar Diagnostico" src="/images/realizar_diagnostico.png" style={{ width: '75%', margin: 'auto' }} />}
                >
                  <Meta title="Realizar Diagnóstico" description="En esta sección podrás realizar el diagnóstico de pacientes" />
                </Card>
                <Card
                  hoverable
                  style={{ width: 250, padding: '1em', margin: '1em', height: '350px' }}
                  cover={<img alt="Editar Diagnostico" src="/images/editar_diagnostico.png" style={{ width: '75%', margin: 'auto' }} />}
                  onClick={() => router.push('gestionar_diagnosticos/editar_diagnostico/')}
                >
                  <Meta title="Editar Diagnóstico" description="Sección dedicada a editar los diagnósticos ya realizados" />
                </Card>
              </>
            }
          />

        </Space >

      </Content>
    </>
  )
}
