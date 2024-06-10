import { Image } from 'expo-image';
import * as React from 'react';
import { Text } from 'react-native';

import { View } from '@/ui';

type LocationProps = {
  city: string;
  country: string;
};
export const Location = ({ city, country }: LocationProps) => {
  const day = 'Monday';
  const date = '10';
  const month = 'June';
  const time = '14:00';
  return (
    <>
      <View className="mb-2 items-center gap-3">
        <Text className="text-center text-3xl font-bold text-white">
          {city},
          <Text className="text-xl font-semibold text-gray-300">
            {' '}
            {country}
          </Text>
        </Text>
        <Text className="text-center text-xl font-semibold text-gray-300">
          Moderate Rain
        </Text>
      </View>
      <View className="relative my-24 items-center justify-center">
        <Text className="absolute top-[-120px] z-0 ml-10 text-center text-[210px] font-bold text-white">
          13&#176;
        </Text>
        <Image
          source={require('../../../assets/test_image.png')}
          className="z-10 h-72 w-72"
        />
      </View>
      <Text className="text-center text-lg font-semibold text-gray-300">
        {day}, {date} {month} | {time}
      </Text>
    </>
  );
};
