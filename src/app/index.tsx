import { Image } from 'expo-image';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ForecastCard } from '@/components/forecast-card/forecast-card';
import { Location } from '@/components/forecast-header/location';
import { TopAppBar } from '@/components/search/top-app-bar';
import { useSoftKeyboardEffect } from '@/core/keyboard';

export default function Home() {
  useSoftKeyboardEffect();
  const insets = useSafeAreaInsets();

  return (
    <View className="relative flex-1">
      <StatusBar translucent={true} barStyle={'dark-content'} />
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
          <Location city="Amsterdam" country="Netherland" />
          <ForecastCard />
        </View>
      </View>

      {/* <LoginForm onSubmit={onSubmit} /> */}
    </View>
  );
}
