import GreetingQuote from '../GreetingQuote';
import Upcoming from './upcoming/Upcoming';
import Reward from '../reward/Reward';

const Home = () => {
  return (
    <div className=' p-4 space-y-3'>
      <GreetingQuote />
      <Upcoming />
      <Reward />
    </div>
  );
};

export default Home;
