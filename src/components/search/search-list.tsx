/* eslint-disable react/no-unstable-nested-components */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import type { City } from '@/api';
import { Text, TouchableOpacity, View } from '@/ui';

type Cities = {
  cities: City[];
  visible?: boolean;
};

export const SearchList = ({ cities, visible = true }: Cities) => {
  if (!visible) return null;

  const renderItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      className={'my-0 flex-row items-center rounded-t-xl p-3 px-4'}
    >
      <FontAwesome name="map-marker" size={20} color="white" />
      <Text className="ml-4 text-lg text-gray-200">
        {item.name}, {item.country} {item.state}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View
      className="absolute top-16  w-full rounded-3xl bg-gray-800/90"
      style={{ height: 47 * cities.length }}
    >
      <FlashList
        data={cities}
        renderItem={renderItem}
        estimatedItemSize={5}
        ItemSeparatorComponent={() => (
          <View className=" h-[1px] w-full bg-gray-700" />
        )}
      />
    </View>
  );
};
