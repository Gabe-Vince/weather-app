import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useForecast } from '@/api';
import { ForecastCard } from '@/components/forecast-card/forecast-card';
import { ForecastMain } from '@/components/forecast-main/forecast-main';
import { TopAppBar } from '@/components/search/top-app-bar';
import { useCurrentCityStore, useSelectedLanguage } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { Image, Text } from '@/ui';

export default function Home() {
  useSoftKeyboardEffect();
  const insets = useSafeAreaInsets();
  const { currentCity } = useCurrentCityStore();
  const { language } = useSelectedLanguage();

  const { data, isError, isPending } = useForecast({
    variables: { lat: currentCity.lat, lon: currentCity.lon, locale: language },
  });

  if (isPending) {
    return (
      <View className="flex-1 justify-center">
        <StatusBar />
        <Image
          source={require('../../assets/bg-diff.png')}
          className="absolute h-full w-full"
          blurRadius={80}
        />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <StatusBar />
        <Text className="text-center">Error loading forecast</Text>
      </View>
    );
  }

  return (
    <View className="relative flex-1">
      <StatusBar />
      <Image
        source={require('../../assets/bg-diff.png')}
        className="absolute h-full w-full"
        blurRadius={80}
      />
      <View
        className="flex flex-1"
        style={{
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
        }}
      >
        <TopAppBar />
        <View className="mx-4 my-11 flex flex-1 justify-around ">
          <ForecastMain
            city={currentCity.cityName}
            country={data.sys.country}
            temperature={data.main.temp}
            description={data.weather[0].description}
            dt={data.dt}
            timezone={data.timezone}
            weatherType={data.weather[0].main}
            sunset={data.sys.sunset}
            sunrise={data.sys.sunrise}
          />
          <ForecastCard
            windSpeed={data.wind.speed}
            windDegrees={data.wind.deg}
            humidity={data.main.humidity}
          />
        </View>
      </View>
    </View>
  );
}
