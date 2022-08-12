import { Provider } from 'react-redux';
import { Breadcrumb, Layout, Menu } from 'antd';
import 'antd/dist/antd.min.css';
import Places from './components/places'
import { store } from './store';
const { Header, Content } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <Layout className="layout" style={{ height: '100vh'}}>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: 1,
                title: 'Home'
              },
              {
                key: 2,
                title: 'Places'
              }
            ]}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Places />
          </div>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
