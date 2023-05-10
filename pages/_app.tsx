import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderMenu from '../components/organisms/HeaderMenu/HeaderMenu'
import 'antd/dist/antd.css';
import { ConfigProvider, Layout } from 'antd';

const {Footer} = Layout

export default function App({ Component, pageProps }: AppProps) {
  return( 
  <Layout style={{height: '100vh'}}>
    <HeaderMenu />
    <Component {...pageProps} />
    <Footer style={{ textAlign: 'center' }}>
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
  )
}
