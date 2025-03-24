import RewardCircle from './RewardCircle';
import { IMAGE } from '@/lib/constants';
import { motion } from 'motion/react';

const RewardCirlceContainer = () => {
  return (
    <motion.svg
      className=' w-full flex place-items-start items-center'
      viewBox='0 0 200 260'
      initial='hidden'
      animate='visible'
      style={IMAGE}>
      <RewardCircle />
      <RewardCircle isActiveCircle />
    </motion.svg>
  );
};

export default RewardCirlceContainer;
