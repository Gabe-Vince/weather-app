import { Env } from '@env';
import axios from 'axios';

import { client, DEFAULT_LIMIT } from '../common';
import type { ApiResponse } from '../types';
import type { City } from './types';

export const getCities = async (
  query: string,
  locale: string
): Promise<ApiResponse<City>> => {
  try {
    const response = await client.get(`geo/1.0/direct`, {
      params: {
        q: query,
        limit: DEFAULT_LIMIT,
        appid: Env.OPEN_WEATHER_API_KEY,
        lang: locale,
      },
    });
    console.log('🚀 ~ getCities ~ response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching cities:', error.message);
      throw new Error('Failed to fetch cities. Please try again later.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};
