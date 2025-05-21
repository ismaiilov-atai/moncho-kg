import { useTranslation } from 'react-i18next';
import { Database } from 'lucide-react';

const NoData = () => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-2 items-center'>
      <Database className=' h-10 w-10' />
      {t('no-data')}
    </div>
  );
};

export default NoData;
