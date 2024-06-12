import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import * as React from 'react';

import { useSelectedLanguage } from '@/core';
import { Text, TouchableOpacity, View } from '@/ui';

import { Item } from './item';
export type Ref = BottomSheetModal;

export const LanguageItem = () => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <>
      <Item
        text="settings.language"
        onPress={() => bottomSheetRef.current?.present()}
      />
      <LanguageSheetModal ref={bottomSheetRef} />
    </>
  );
};

const LanguageSheetModal = React.forwardRef<Ref>((_, ref) => {
  const { dismiss } = useBottomSheetModal();
  const { setLanguage } = useSelectedLanguage();
  const snapPoints = React.useMemo(() => ['50%'], []);

  const handleSelectLanguage = React.useCallback(
    (language: 'en' | 'nl') => {
      setLanguage(language);
      dismiss();
    },
    [setLanguage, dismiss]
  );

  const renderBackdrop = React.useCallback(
    (
      backProps: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...backProps}
        opacity={0.8}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: '#2E4A78' }}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      containerStyle={{ borderTopLeftRadius: 32 }}
      style={{ borderRadius: 32, overflow: 'hidden' }}
    >
      <View className="flex-1 items-center p-5">
        <View className="absolute left-5 top-5">
          <TouchableOpacity onPress={() => dismiss()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="mb-5 mt-10 items-center">
          <FontAwesome name="language" size={50} color="black" />
          <Text
            className="text-darkBlue mt-2 text-center text-lg font-bold"
            tx="settings.changeLang"
          />
        </View>

        <TouchableOpacity
          className="bg-darkBlue border-darkOrange mb-3 w-2/3 items-center rounded-full border p-3"
          onPress={() => handleSelectLanguage('en')}
        >
          <Text className="text-lg text-white" tx="settings.english" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-darkBlue border-darkOrange w-2/3 items-center rounded-full border p-3"
          onPress={() => handleSelectLanguage('nl')}
        >
          <Text className="text-lg text-white" tx="settings.dutch" />
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});
