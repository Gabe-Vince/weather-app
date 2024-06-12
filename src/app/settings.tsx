/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import { Github, Website } from '@/ui/icons';

export default function Settings() {
  const router = useRouter();

  return (
    <>
      <StatusBar />
      <Image
        source={require('../../assets/bg-diff.png')}
        className="absolute h-full w-full"
        blurRadius={80}
      />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="m-1 rounded-full p-3"
              onPress={() => router.push('/')}
            >
              <FontAwesome name="arrow-left" size={25} color="white" />
            </TouchableOpacity>
            <Text
              className="text-3xl font-bold text-gray-200"
              tx="settings.info"
            />
          </View>

          <ItemsContainer title="settings.general">
            <LanguageItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.appName" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item
              text="settings.github"
              icon={<Github color="white" />}
              onPress={() => {}}
            />
            <Item
              text="settings.linkedIn"
              icon={<Website color="white" />}
              onPress={() => {}}
            />
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  );
}
