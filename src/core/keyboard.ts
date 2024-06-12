import { useFocusEffect } from '@react-navigation/native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';

export const useSoftKeyboardEffect = () => {
  useFocusEffect(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setShowAnimationDelay(0);
    AvoidSoftInput.setShowAnimationDuration(150);
    AvoidSoftInput.setHideAnimationDuration(150);
    AvoidSoftInput.setHideAnimationDelay(0);
    return () => {
      AvoidSoftInput.setAvoidOffset(0);
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  });
};
