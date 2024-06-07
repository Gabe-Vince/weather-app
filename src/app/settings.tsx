/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { useAuth } from '@/core';
import {
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import { Github, Rate, Share, Support, Website } from '@/ui/icons';

export default function Settings() {
  const router = useRouter();
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  console.log('🚀 ~ Settings ~ colorScheme:', colorScheme);
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[200] : colors.neutral[800];
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="m-1 rounded-full p-3"
              onPress={() => router.push('/')}
            >
              <FontAwesome name="arrow-left" size={25} color={iconColor} />
            </TouchableOpacity>
            <Text className="text-3xl font-bold">Info</Text>
          </View>

          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
