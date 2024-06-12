/* eslint-disable max-lines-per-function */

import Fontisto from '@expo/vector-icons/Fontisto';
import * as React from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { formatLocalDateTime, useSelectedLanguage } from '@/core';
import { Text, View } from '@/ui';

import { AnimatedWeatherIcon } from './animated-weather-icon';

type ForecastMainProps = {
  city: string;
  country: string;
  temperature: number;
  description: string;
  dt: number;
  timezone: number;
  weatherType: string;
  sunrise: number;
  sunset: number;
};

export const ForecastMain = ({
  city,
  country,
  temperature,
  description,
  dt,
  timezone,
  weatherType,
  sunrise,
  sunset,
}: ForecastMainProps) => {
  const roundedTemp = Math.round(temperature).toString();
  const { language } = useSelectedLanguage();

  const animatedValue = useSharedValue(0);

  React.useEffect(() => {
    animatedValue.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.ease),
    });
  }, [animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(animatedValue.value, [0, 1], [-500, 0]),
        },
      ],
    };
  });
  const animatedTempStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedValue.value, [0, 1], [500, 0]),
        },
      ],
    };
  });
  return (
    <>
      {/* City Country and Description Section */}
      <Animated.View className="mb-2 items-center gap-3" style={animatedStyle}>
        <Text className="text-center text-3xl font-bold text-white">
          {city},
          <Text className="text-xl font-semibold text-gray-300">
            {' '}
            {country}
          </Text>
        </Text>
        <Text className="text-center text-xl font-semibold capitalize text-gray-300">
          {description}
        </Text>
      </Animated.View>
      {/* Temperature and dynamic animation icon */}
      <View className="relative mb-8 mt-24 items-center justify-center">
        <Animated.Text
          className="absolute top-[-90px] z-0 ml-12 text-center text-[180px] font-bold text-white"
          style={animatedTempStyle}
        >
          {roundedTemp}&#176;
        </Animated.Text>
        <View className="z-10 h-80 w-80">
          <AnimatedWeatherIcon
            weatherType={weatherType}
            sunriseTime={sunrise}
            sunsetTime={sunset}
            currentTime={dt}
          />
        </View>
      </View>
      {/* Local time of the collection of the forecast */}
      <View className="flex w-full flex-row items-center justify-center gap-3">
        <Fontisto name="clock" size={20} color={'#D1D5DB'} />
        <Text
          className="text-center text-base text-gray-300"
          tx="forecastMain.localTime"
        />
      </View>
      <Text className="my-4 text-center text-lg font-semibold capitalize text-white">
        {formatLocalDateTime(dt, timezone, language)}
      </Text>
    </>
  );
};
