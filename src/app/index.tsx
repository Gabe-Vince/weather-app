import { Image } from 'expo-image';
import React from 'react';

import { TopAppBar } from '@/components/top-app-bar';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, SafeAreaView } from '@/ui';

export default function Login() {
  useSoftKeyboardEffect();

  return (
    <>
      <FocusAwareStatusBar />
      <Image
        source={require('../../assets/bg-dark.png')}
        className="absolute h-full w-full"
        blurRadius={80}
      />
      <SafeAreaView className="flex flex-1 border border-green-700">
        <TopAppBar />
      </SafeAreaView>

      {/* <LoginForm onSubmit={onSubmit} /> */}
    </>
  );
}
