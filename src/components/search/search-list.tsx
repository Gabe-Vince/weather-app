/* eslint-disable react/no-unstable-nested-components */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { City } from '@/api';
import { useCurrentCityStore, useSelectedLanguage } from '@/core';
import { Text, TouchableOpacity, View } from '@/ui';

type Cities = {
  cities: City[];
  onItemSelect: () => void;
};

export const SearchList = ({ cities, onItemSelect }: Cities) => {
  const { setCurrentCity } = useCurrentCityStore();
  const { language } = useSelectedLanguage();

  const animatedValue = useSharedValue(0);

  React.useEffect(() => {
    animatedValue.value = withTiming(1, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  }, [animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      translateY: interpolate(animatedValue.value, [0, 1], [200, 0]),
    };
  });

  const renderItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      className={'my-0 flex-row items-center rounded-t-xl p-3 px-4'}
      onPress={() => {
        setCurrentCity({
          lat: item.lat,
          lon: item.lon,
          cityName:
            language === 'nl' && item.local_names!.nl!
              ? item.local_names!.nl
              : item.name,
        });
        onItemSelect();
      }}
    >
      <FontAwesome name="map-marker" size={20} color="white" />
      <Text className="ml-4 text-lg text-gray-200">
        {item.name}, {item.country} {item.state}
      </Text>
    </TouchableOpacity>
  );
  return (
    <Animated.View
      className="absolute top-16  z-40 w-full rounded-3xl bg-gray-600"
      style={[animatedStyle, { height: 50 * cities.length }]}
    >
      <FlashList
        data={cities}
        renderItem={renderItem}
        estimatedItemSize={5}
        ItemSeparatorComponent={() => (
          <View className=" h-[1px] w-full bg-gray-200" />
        )}
      />
    </Animated.View>
  );
};
