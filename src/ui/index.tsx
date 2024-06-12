import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export { default as colors } from './colors';
export * from './image';
export * from './text';
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
export { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
