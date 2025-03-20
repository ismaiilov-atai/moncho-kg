import Logo from '@/assets/logo.svg';

const Company = () => {
  return (
    <section className=' flex space-x-2 h-[32] items-center justify-center '>
      <img
        src={Logo}
        alt=' logo of the MonchoKG'
        className='h-6'
        height={32}
        width={32}
      />
      <span className=' tracking-wide text-lg text-primary font-arbutus'>
        MonchoKG
      </span>
    </section>
  );
};

export default Company;
