import BookSessionButton from './BookSessionButton';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Company from './Company';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className='w-full h-[200px] px-4 desktop:w-[85%] mt-20 max-sm:hidden flex desktop:justify-around justify-between items-center border-t-2'>
      <section className='flex flex-col justify-center w-[25%] space-y-3'>
        <Company showingFooter />
        <BookSessionButton />
      </section>
      <address className=' w-30%] h-full py-4 space-y-1'>
        <h2>{t('contact')}</h2>
        <ul className=' space-y-1'>
          <li className='flex gap-2 items-center'>
            <Phone size={16} />
            <a href='tel:+996-707-555-555'>+996-707-555-555</a>
          </li>
          <li className='flex gap-2 items-center'>
            <Mail size={16} />
            <a href='mailto:brr@gmail.com'> brr@gmail.com</a>
          </li>
          <li className='flex gap-2 items-center'>
            <MapPin size={16} />
            Baizak, Jumgal
          </li>
        </ul>
      </address>
      <address className=' w-[20%] h-full py-4 space-y-1'>
        <h2>{t('studio-hrs')}</h2>
        <span>7:00 - 22:00</span>
      </address>
    </footer>
  );
};

export default Footer;
