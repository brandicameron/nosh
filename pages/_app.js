import '../styles/globals.css';
import Layout from '../components/Layout';
import { AppContextWrapper } from '../AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextWrapper>
  );
}

export default MyApp;
