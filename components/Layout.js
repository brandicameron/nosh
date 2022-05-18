import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <a className='skip-to-content-link' href='#skip-target'>
        Skip to content
      </a>
      <Header />
      <main className='flex-1' id='skip-target'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
