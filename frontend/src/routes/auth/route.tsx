import { createFileRoute } from '@tanstack/react-router';
import Details from '@/components/custom/Details';
import Phone from '@/components/custom/Phone';
import { useState } from 'react';
import VerifyOTP from '@/components/custom/VerifyOTP';

export const Route = createFileRoute('/auth')({
  component: AuthComponent,
});

function AuthComponent() {
  const [page, setPage] = useState(0);
  const componentsToDisplay = [
    <Details page={page} setPage={setPage} />,
    <Phone page={page} setPage={setPage} />,
    <VerifyOTP page={page} setPage={setPage} />,
  ];
  return (
    <div className=' flex h-dvh items-center justify-center'>
      {componentsToDisplay[page]}
    </div>
  );
}
