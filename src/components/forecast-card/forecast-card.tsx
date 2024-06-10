import { FontAwesome5 } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as React from 'react';

import { View } from '@/ui';

import { ForecastItem } from './forecast-item';
// Adjust the import path as needed

const dummyData = [
  {
    icon: <Feather name="wind" size={32} color="white" />,
    description: 'Wind Speed',
    value: '23°C',
  },
  {
    icon: (
      <MaterialCommunityIcons name="air-humidifier" size={32} color="white" />
    ),
    description: 'Humidity',
    value: '60%',
  },
  {
    icon: <FontAwesome5 name="compass" size={32} color="white" />,
    description: 'Wind',
    value: '15 km/h',
  },
];

export const ForecastCard = () => {
  return (
    <View className="bg-darkBlue/60 flex-row justify-between rounded-3xl p-4">
      {dummyData.map((item, index) => (
        <ForecastItem
          key={index}
          icon={item.icon}
          description={item.description}
          value={item.value}
        />
      ))}
    </View>
  );
};
