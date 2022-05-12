import Logo from './Logo';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';

export default function Header() {
  return (
    <header className='flex justify-between items-center px-3 bg-primary h-16 mb-8 border-b border-indigo-500 lg:px-5'>
      <Logo />
      <PrimaryNav />
      <SecondaryNav />
    </header>
  );
}
