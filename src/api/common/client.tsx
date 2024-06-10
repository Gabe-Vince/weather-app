import { Env } from '@env';
import axios from 'axios';
export const client = axios.create({
  baseURL: Env.OPEN_WEATHER_API_URL,
});
