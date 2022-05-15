import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <a class='skip-to-content-link' href='#skip-target'>
        Skip to content
      </a>
      <Header />
      <main id='skip-target'>{children}</main>
    </>
  );
}
