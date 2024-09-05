import 'antd/dist/antd.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderMenu from '../components/organisms/HeaderMenu/HeaderMenu'
import { Layout, Grid } from 'antd';
import React, {useEffect} from 'react';
import Head from 'next/head'

const { Footer, Content } = Layout
import { useRouter } from 'next/router';
import AdminSidebar from '../components/organisms/AdminSidebar/AdminSidebar';
const { useBreakpoint } = Grid;

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const screens = useBreakpoint();

  useEffect(() => {
    let sizes_list = Object.entries(screens)
      .filter((screen) => !!screen[1])
      .map((screen) => (
          screen[0]
      ))

    if(sizes_list.length > 0 && sizes_list.length <= 2){
      router.push('/gestionar_encuestas')  
    }
    
  }, [screens])
  
  return (
    <Layout style={{ height: '100vh' }}>

      <Head>
        <title>Software Marcha</title>
      </Head>

      <HeaderMenu />

      <Layout>

        {/* <AdminSidebar /> */}

        <Layout>
          <Content
            style={{
              overflow: 'visible',
              minHeight: "auto",
              // backgroundColor: router.pathname.startsWith('/admin') ? 'white' : 'inherit',
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
  )
}
