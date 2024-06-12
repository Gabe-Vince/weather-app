import { FontAwesome5 } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as React from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { getWindDirection, translate } from '@/core';

import { ForecastItem } from './forecast-item';

type ForecastCardProps = {
  windSpeed: number;
  windDegrees: number;
  humidity: number;
};

const cardIcons = [
  <Feather name="wind" size={32} color="white" />,

  <FontAwesome5 name="compass" size={32} color="white" />,

  <MaterialCommunityIcons name="air-humidifier" size={32} color="white" />,
];

export const ForecastCard = ({
  windSpeed,
  windDegrees,
  humidity,
}: ForecastCardProps) => {
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withTiming(1, {
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
    });
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(translateX.value, [0, 1], [500, 0]),
        },
      ],
    };
  });
  return (
    <Animated.View
      className="bg-darkBlue/60 my-4 flex-row justify-between rounded-3xl p-4"
      style={animatedStyle}
    >
      <ForecastItem
        icon={cardIcons[0]}
        description={translate('forecastCard.windSpeed')}
        value={`${windSpeed.toString()} m/s`}
      />
      <ForecastItem
        icon={cardIcons[1]}
        description={translate('forecastCard.windDirection')}
        value={getWindDirection(windDegrees)}
      />
      <ForecastItem
        icon={cardIcons[2]}
        description={translate('forecastCard.humidity')}
        value={`${humidity.toString()} %`}
      />
    </Animated.View>
  );
};
