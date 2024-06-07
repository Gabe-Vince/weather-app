import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, FocusAwareStatusBar, Text, TouchableOpacity } from '@/ui';

export const InfoHeader = () => {
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  const backgroundColor =
    colorScheme === 'dark' ? colors.charcoal[500] : colors.white[500];
  return (
    <>
      <FocusAwareStatusBar />

      <SafeAreaView
        className=" flex-row items-center px-4 py-2"
        style={{ height: '18%' }}
      >
        <TouchableOpacity
          style={{ backgroundColor: backgroundColor }}
          className="m-1 rounded-full p-3"
        >
          <FontAwesome name="arrow-left" size={25} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-xl">Info</Text>
      </SafeAreaView>
    </>
  );
};
