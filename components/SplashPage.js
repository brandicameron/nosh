import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SplashPage() {
  return (
    <div className='absolute flex justify-center items-center top-0 bg-primary h-screen w-screen z-50'>
      <div className='relative -mt-28'>
        <Image src='/images/nosh-solid.svg' alt='Logo' width={300} height={80} />
        <motion.div
          animate={{ rotate: [0, 0, 270, 270, 0], scale: 0 }}
          transition={{ duration: 0.75, delay: 1 }}
          className='absolute top-4 left-[100px]'
        >
          <Image src='/images/fork-spoon.svg' alt='' width={37} height={48} />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1, delay: 1.3 }}
          className='absolute top-[26px] left-[106px]'
        >
          <Image src='/images/center.svg' alt='' width={22} height={28} />
        </motion.div>
      </div>
    </div>
  );
}
