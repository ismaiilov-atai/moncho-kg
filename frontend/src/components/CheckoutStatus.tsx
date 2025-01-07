import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { CircleCheckBig, TriangleAlert } from 'lucide-react';
import { createResevation } from '@/helpers/resorvation';
import { useStripeStore } from '@/stores/stripe-store';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user-store';
import { Button } from './ui/button';
import moment from 'moment';

const apiRoute = getRouteApi('/');

const CheckoutStatus = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: createResevation,
  });
  const { slotId, guest } = apiRoute.useSearch();
  const { userId } = useUserStore((state) => state);
  const { updateStripeStatus } = useStripeStore((state) => state);
  const { updateReservations, reservations } = useUserStore((state) => state);

  const confirmClick = async () => {
    updateStripeStatus('');
    const resp = await mutateAsync({
      userId,
      slotId: slotId,
      withYou: guest || 0,
    });

    if (resp.isSuccess) {
      navigate({
        to: '/',
        search: {
          session_id: '',
          guest: 0,
          slotId: '',
        },
      });

      updateReservations(
        [resp.reservation, ...reservations].sort((a, b) =>
          moment(a.when).diff(moment(b.when))
        )
      );
    }
  };
  return (
    <>
      {isError ? (
        <div className='w-full flex flex-col items-center gap-6'>
          <TriangleAlert className=' w-10 h-10 text-red-500' />
          <span>Failed with reservation</span>
          <span className=' font-extralight text-xs text-pretty text-center'>
            contact with support team or try to book different time
          </span>
        </div>
      ) : (
        <div className='w-full flex flex-col items-center gap-6'>
          <CircleCheckBig className=' w-10 h-10 text-green-500' />
          <span>Successfully completed!</span>
          <Button className='w-full' onClick={confirmClick}>
            {isPending ? 'Loading...' : 'Ok'}
          </Button>
        </div>
      )}
    </>
  );
};

export default CheckoutStatus;
