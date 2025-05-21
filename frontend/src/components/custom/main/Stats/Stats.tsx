import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { statsQueryOptions } from '@/lib/api';
import StatsLoading from './StatsLoading';
import { ChartLine } from 'lucide-react';
import moment from 'moment-timezone';
import NoData from '../../NoData';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartConfig = {
  stats: {
    label: 'Stats',
    color: 'hsl(var(--chart-1))',
    icon: ChartLine,
  },
} satisfies ChartConfig;

const Stats = () => {
  const { t } = useTranslation();
  const { data, isPending, isError } = useQuery(statsQueryOptions);

  if (isError) return <></>;
  if (isPending) return <StatsLoading />;

  const mapToChartData = (day: string) => {
    try {
      const index = data.stats.findIndex((current) => current.day === day);
      const stats = data.stats[index].hourlyStats;
      const sortedStats = stats.sort((first, second) =>
        first.hour.localeCompare(second.hour)
      );
      return sortedStats;
    } catch (error) {
      return [];
    }
  };

  return (
    <Card>
      <CardHeader>
        <span className='text-lg h-10 font-roboto block place-content-center font-semibold'>
          {t('stats-title')}
        </span>
        {data.stats.length && (
          <CardDescription className='text-xs '>
            {t('stats-description', {
              day: moment().utc(false).format('dddd'),
            })}
            <div className='text-[10px]'>{t('stats-hint')}</div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {!data.stats.length ? (
          <NoData />
        ) : (
          <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
            <BarChart
              accessibilityLayer
              data={mapToChartData(
                moment().utc(false).locale('en').format('dddd')
              )}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey='hour' tickFormatter={(value) => value} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='stats' fill='var(--color-stats)' radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default Stats;
