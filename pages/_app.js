import '../styles/globals.css';
import Layout from '../components/Layout';
import { MenuContextWrapper } from '../MenuContext';

function MyApp({ Component, pageProps }) {
  return (
    <MenuContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MenuContextWrapper>
  );
}

export default MyApp;
