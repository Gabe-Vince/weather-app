import React from 'react';

import type { TxKeyPath } from '@/core';
import { Text, View } from '@/ui';

type Props = {
  children: React.ReactNode;
  title?: TxKeyPath;
};

export const ItemsContainer = ({ children, title }: Props) => {
  return (
    <>
      {title && <Text className="pb-2 pt-4 text-lg text-white" tx={title} />}
      {
        <View className=" bg-darkBlue/60 border-darkOrange rounded-md border-[1px]">
          {children}
        </View>
      }
    </>
  );
};
