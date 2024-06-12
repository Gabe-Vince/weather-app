export const formatLocalDateTime = (
  dt: number,
  timezone: number,
  locale: string
): string => {
  const timezoneOffset = timezone * 1000;
  const date = new Date(dt * 1000);
  const localDate = new Date(date.getTime() + timezoneOffset);
  const local = locale === 'nl' ? 'nl' : 'en-US';

  const hours = localDate.getUTCHours().toString().padStart(2, '0');
  const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  const formattedDate = localDate.toLocaleString(local, dateOptions);
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} | ${formattedTime}`;
};

export const getWindDirection = (degrees: number): string => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  degrees = degrees % 360;
  if (degrees < 0) {
    degrees += 360;
  }

  const index = Math.floor(degrees / 22.5 + 0.5) % 16;

  return directions[index];
};

export const isDayOrNight = async (
  dt: number,
  sunriseTime: number,
  sunsetTime: number
): Promise<'day' | 'night'> => {
  const current = new Date(dt * 1000);
  const sunrise = new Date(sunriseTime * 1000);
  const sunset = new Date(sunsetTime * 1000);

  if (current >= sunrise && current < sunset) {
    return 'day';
  } else {
    return 'night';
  }
};

export const weatherTypeToState = async (
  weatherType: string,
  timeOfDay: 'day' | 'night'
): Promise<number> => {
  switch (weatherType.toLowerCase()) {
    case 'clear':
      return timeOfDay === 'day' ? 1 : 7;
    case 'rain':
      return timeOfDay === 'day' ? 2 : 9;
    case 'clouds':
      return timeOfDay === 'day' ? 3 : 8;
    case 'thunderstorm':
      return 4;
    case 'drizzle':
      return 5;
    case 'snow':
      return 6;
    default:
      return 10;
  }
};
