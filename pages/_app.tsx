import 'antd/dist/antd.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderMenu from '../components/organisms/HeaderMenu/HeaderMenu'
import { Layout } from 'antd';
import React from 'react';

const { Footer, Content } = Layout
import { useRouter } from 'next/router';
import AdminSidebar from '../components/organisms/AdminSidebar/AdminSidebar';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <Layout style={{ height: '100vh' }}>

      <HeaderMenu />

      <Layout>

        {
          router.pathname.startsWith('/admin') && <AdminSidebar />
        }

        <Layout>
          <Content
            style={{
              overflow: 'visible',
              minHeight: "auto",
              backgroundColor: router.pathname.startsWith('/admin') ? 'white' : 'inherit',
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
