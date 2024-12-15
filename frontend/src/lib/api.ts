import { queryOptions } from '@tanstack/react-query';
import { fetchDays } from '@/helpers/fetchDays';
import { type ApiRoutes } from '@server/app';
import { hc } from 'hono/client';

const client = hc<ApiRoutes>('/');

export const api = client.api;


export const daysQueryOptions = queryOptions({
  queryKey: ["days"],
  queryFn: fetchDays,
});