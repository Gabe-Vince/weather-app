import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const ArrowRight = ({ color = '#CCC', ...props }: SvgProps) => (
  <Svg width={7} height={14} viewBox="0 0 7 14" fill="none" {...props}>
    <Path
      d="M.872 13.101a.874.874 0 0 0 .621-.253l5.252-5.253a.875.875 0 0 0 0-1.234L1.493 1.11A.875.875 0 0 0 .26 2.343l4.63 4.63-4.63 4.632A.876.876 0 0 0 .872 13.1Z"
      fill={color}
    />
  </Svg>
);
