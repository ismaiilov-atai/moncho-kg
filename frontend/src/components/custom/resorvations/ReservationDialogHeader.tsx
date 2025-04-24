import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { useTranslation } from 'react-i18next';

const ReservationDialogHeader = () => {
  const { t } = useTranslation();
  return (
    <DialogHeader className='text-left space-y-3'>
      <DialogTitle>{t('ready-book')}</DialogTitle>
      <DialogDescription className='text-foreground'>
        {t('ready-book-description')}
      </DialogDescription>
    </DialogHeader>
  );
};

export default ReservationDialogHeader;
