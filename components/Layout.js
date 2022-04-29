import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className='text-neutral-700'>{children}</main>
    </div>
  );
}
