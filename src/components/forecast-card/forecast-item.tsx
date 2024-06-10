import * as React from 'react';

import { Text, View } from '@/ui';

type ForecastItemProps = {
  icon: React.ReactElement;
  description: string;
  value: string;
};

export const ForecastItem = ({
  icon,
  description,
  value,
}: ForecastItemProps) => {
  return (
    <View className="w-1/3 items-center">
      <View className="mb-2">{icon}</View>
      <Text className="text-xl font-bold text-white">{value}</Text>
      <Text className="text-base text-gray-400">{description}</Text>
    </View>
  );
};
