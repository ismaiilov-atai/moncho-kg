import GreetingQuote from '../../GreetingQuote';
import Upcoming from '../upcoming/Upcoming';
import Reward from '../../reward/Reward';
import Stats from '../Stats/Stats';

const Home = () => {
  return (
    <div className='space-y-6'>
      <GreetingQuote />
      <Upcoming />
      <Stats />
      <Reward />
    </div>
  );
};

export default Home;
