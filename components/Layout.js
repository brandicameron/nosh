import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      {/* <main className='text-neutral-700'>{children}</main> */}
    </>
  );
}
