import * as React from 'react';
import type { RiveRef } from 'rive-react-native';
import Rive from 'rive-react-native';

import { isDayOrNight, weatherTypeToState } from '@/core';

type AnimatedWeatherIconProps = {
  weatherType: string;
  currentTime: number;
  sunriseTime: number;
  sunsetTime: number;
};

export const AnimatedWeatherIcon = ({
  weatherType,
  currentTime,
  sunriseTime,
  sunsetTime,
}: AnimatedWeatherIconProps) => {
  const riveRef = React.useRef<RiveRef>(null);

  React.useEffect(() => {
    const setRiveState = async () => {
      try {
        const timeOfDay = await isDayOrNight(
          currentTime,
          sunriseTime,
          sunsetTime
        );
        const stateNumber = await weatherTypeToState(weatherType, timeOfDay);

        if (riveRef.current) {
          riveRef.current.setInputState(
            'State Machine 1',
            'States',
            stateNumber
          );
        }
      } catch (error) {
        console.error('Error setting Rive state:', error);
      }
    };

    setRiveState();
  }, [weatherType, currentTime, sunriseTime, sunsetTime]);

  return (
    <Rive
      resourceName="gabeweather"
      artboardName="conditions"
      stateMachineName="State Machine 1"
      ref={riveRef}
      animationName="idle"
      autoplay
      style={{ width: '100%', height: '100%' }}
    />
  );
};
