import { Env } from '@env';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { CurrentWeather } from './types';

type Variables = { lat: number; lon: number; locale: string };

type Response = CurrentWeather;

export const useForecast = createQuery<Response, Variables, AxiosError>({
  queryKey: ['forecast'],
  fetcher: (variables) => {
    return client
      .get('data/2.5/weather', {
        params: {
          lat: variables.lat,
          lon: variables.lon,
          appid: Env.OPEN_WEATHER_API_KEY,
          lang: variables.locale,
          units: 'metric',
        },
      })
      .then((response) => response.data);
  },
  staleTime: 300000,
});
