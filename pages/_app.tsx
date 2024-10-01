import 'antd/dist/antd.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderMenu from '../components/organisms/HeaderMenu/HeaderMenu'
import { Layout, Grid, notification } from 'antd';
import React, { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Provider } from 'react-redux'
import store from 'lib/store';

const { Footer, Content } = Layout
const { useBreakpoint } = Grid;

export default function App({ Component, pageProps }: AppProps) {
  
  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();
  const screens = useBreakpoint();

  const user = store.getState().user

  useEffect(() => {
    if(!user.isAuthenticated){
      console.log('Usuario no autenticado')
      router.push('/login')
      api['warning']({
              message: 'Usuario no autenticado',
              description:
                'Debes iniciar sesión para poder continuar',
            });
    }
  }, [user])
  
  useEffect(() => {
    let sizes_list = Object.entries(screens)
      .filter((screen) => !!screen[1])
      .map((screen) => (
        screen[0]
      ))

    if (sizes_list.length > 0 && sizes_list.length <= 2) {
      router.push('/gestionar_encuestas')
    }

  }, [screens])

  return (
    <Provider store={store}>
      {contextHolder}
      <Layout style={{ height: '100vh' }}>

        <Head>
          <title>Software Marcha</title>
        </Head>

        <HeaderMenu />

        <Layout>
          <Layout>
            <Content
              style={{
                overflow: 'visible',
                minHeight: "auto",
                backgroundColor: 'white',
                padding: "1em",
                margin: "1em"
              }}
            >
              <Component {...pageProps} />
            </Content>
            <Footer style={{ textAlign: 'center', padding: 0 }}>
              <div>
                Grupo de investigación de automática
              </div>
              <div>
                Salud Comfamiliar
              </div>
              <div>
                ©2023
              </div>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </Provider>
  )
}
