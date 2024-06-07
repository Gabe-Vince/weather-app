/* eslint-disable max-lines-per-function */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, TouchableOpacity, View, WIDTH } from '@/ui';

export const TopAppBar = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const width = useSharedValue(0);
  const infoButtonY = useSharedValue(0);
  const infoButtonOpacity = useSharedValue(1);

  const searchBarStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, {
        duration: 500,
      }),
    };
  });

  const infoButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(infoButtonY.value, { duration: 300 }) },
      ],
      opacity: withTiming(infoButtonOpacity.value, { duration: 300 }),
    };
  });

  const handlePress = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      width.value = 0;
      infoButtonY.value = 0;
      infoButtonOpacity.value = 1;
    } else {
      width.value = WIDTH - 37;
      infoButtonY.value = 20;
      infoButtonOpacity.value = 0;
    }
  };

  return (
    <View className="relative z-50 mx-5 mt-6 ">
      <View className="flex-row items-center justify-between rounded-full">
        {/* Info Button */}
        <Animated.View style={[infoButtonStyle]}>
          {!showSearch && (
            <TouchableOpacity
              className="m-1 h-14 w-14 items-center justify-center rounded-full bg-white/20 p-3"
              onPress={() => router.push('/settings')}
            >
              <FontAwesome name="info" size={25} color={colors.white} />
            </TouchableOpacity>
          )}
        </Animated.View>
        {/* Search Bar */}
        <Animated.View
          style={[
            searchBarStyle,
            { overflow: 'hidden', position: 'absolute', left: 0 },
          ]}
        >
          {showSearch && (
            <View className="h-14 w-full items-start justify-center rounded-full bg-white/30">
              <TextInput
                placeholder="Search City"
                placeholderTextColor={colors.neutral[200]}
                className="h-10 pl-6 text-base text-white"
                style={{ width: 250 }}
              />
            </View>
          )}
        </Animated.View>

        {/* Search Button */}
        <TouchableOpacity
          className="  m-1 h-14 w-14 items-center justify-center rounded-full bg-white/20 p-3 "
          onPress={handlePress}
        >
          {showSearch ? (
            <FontAwesome name="close" size={25} color={colors.white} />
          ) : (
            <FontAwesome name="search" size={25} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
