import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

const PopularTimes = () => {
  return (
    <Card>
      <CardHeader>
        <span className='text-lg h-10 font-roboto  block place-content-center font-semibold'>
          Popular Times
        </span>
        <CardDescription className='text-xs '>
          Last week this day and hr was 20 ppl
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>one two three</div>
      </CardContent>
    </Card>
  );
};

export default PopularTimes;
