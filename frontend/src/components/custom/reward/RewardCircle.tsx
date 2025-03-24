import { useTheme } from '@/components/theme-provider';
import { DRAW, REWARD_PROGRESS_COLORS, SHAPE } from '@/lib/constants';
import { motion } from 'motion/react';

interface PageProp {
  isActiveCircle?: boolean;
}

function RewardCircle({ isActiveCircle }: PageProp) {
  const { theme } = useTheme();
  return (
    <motion.circle
      cx='40%'
      cy='-58%'
      className='rotate-[116deg] '
      r='105'
      stroke={
        REWARD_PROGRESS_COLORS[isActiveCircle ? theme : `inactive_${theme}`]
      }
      variants={isActiveCircle ? DRAW : { visible: { pathLength: 0.85 } }}
      custom={2}
      style={SHAPE}
    />
  );
}

export default RewardCircle;
