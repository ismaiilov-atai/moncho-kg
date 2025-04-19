import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { useTranslation } from 'react-i18next';

const ReservationDialogHeader = () => {
  const { t } = useTranslation();
  return (
    <DialogHeader className='text-left'>
      <DialogTitle>{t('ready-book')}</DialogTitle>
      <DialogDescription>{t('ready-book-description')}</DialogDescription>
    </DialogHeader>
  );
};

export default ReservationDialogHeader;
