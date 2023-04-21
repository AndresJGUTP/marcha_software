import { Layout, Typography } from 'antd'

const { Title } = Typography;
const { Content } = Layout;


export default function Home() {
  return (
      <>
        <Content>
          <Title level={1}> Home </Title>
        </Content>
      </>
  )
}
