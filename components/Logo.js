import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <a>
        <Image
          src='/images/nosh-logo.svg'
          alt='Logo'
          width={75}
          height={20}
          title='Go back home.'
        />
      </a>
    </Link>
  );
}
