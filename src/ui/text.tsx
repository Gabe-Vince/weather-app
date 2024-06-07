import React from 'react';
import type { TextProps } from 'react-native';
import { Text as NNText } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { TxKeyPath } from '@/core/i18n';
import { translate } from '@/core/i18n';

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
}

export const Text = ({ className = '', tx, children, ...props }: Props) => {
  const textStyle = React.useMemo(
    () =>
      twMerge(
        'text-base text-black  dark:text-white  font-inter font-normal',
        className
      ),
    [className]
  );

  return (
    <NNText className={textStyle} {...props}>
      {tx ? translate(tx) : children}
    </NNText>
  );
};
