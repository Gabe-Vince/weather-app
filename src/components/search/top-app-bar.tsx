/* eslint-disable max-lines-per-function */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type City, getCities } from '@/api';
import { colors, TouchableOpacity, View } from '@/ui';
import { WIDTH } from '@/ui/utils';

import { SearchList } from './search-list';

export const TopAppBar = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState<City[]>([]);
  // Setting one shared value instead of multiple for each style value you are trying to animate increases performance and maintainability
  // then we use interpolation to get the desired effect we want for each style value
  const animatedValue = useSharedValue(0);

  const searchBarStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(animatedValue.value, [0, 1], [0, WIDTH - 37]),
    };
  });

  const infoButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(animatedValue.value, [0, 1], [0, 20]) },
      ],
      opacity: interpolate(animatedValue.value, [0, 1], [1, 0]),
    };
  });

  const handlePress = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      animatedValue.value = withTiming(0, { duration: 500 });
    } else {
      animatedValue.value = withTiming(1, { duration: 500 });
      setLocations([]);
    }
  };

  const handleTextDebounce = debounce(async (query: string) => {
    if (query.length > 2) {
      const cities = await getCities(query);
      setLocations(cities);
    } else {
      setLocations([]);
    }
  }, 1200);

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
                onChangeText={handleTextDebounce}
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
      {locations!.length > 0 && showSearch ? (
        <SearchList cities={locations} />
      ) : null}
    </View>
  );
};
