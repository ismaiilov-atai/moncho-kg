import GreetingQuote from '../GreetingQuote';
import Upcoming from './upcoming/Upcoming';
import PopularTimes from './PopularTimes';
import Reward from '../reward/Reward';

const Home = () => {
  return (
    <div className=' space-y-3'>
      <GreetingQuote />
      <Upcoming />
      <PopularTimes />
      <Reward />
    </div>
  );
};

export default Home;
