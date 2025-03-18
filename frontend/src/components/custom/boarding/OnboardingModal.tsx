import { ONBOARDING_COMPLETED } from '@/lib/constants';
import Onboarding from './Onboarding';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const OnboardingModal = () => {
  const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED);
  const [openDialog, setOpenDialog] = useState(!onboardingCompleted);

  return (
    <Dialog defaultOpen open={openDialog}>
      <DialogContent className='h-[70%] w-[80%] rounded-md [&>button]:hidden'>
        <Onboarding setOpenDialog={setOpenDialog} />
        {/* below avoids warnings to use title & description in browser */}
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
