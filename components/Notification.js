import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  StarIcon,
  EyeIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  MegaphoneIcon
} from 'react-native-heroicons/outline'
import { useTailwind } from 'tailwind-rn'
import { Colors } from '../utils/Colors'
import {
  useFonts,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'

export default function Notification({ kind, source, navigation }) {
  console.log('creating notification from: ', kind, source);
  const tw = useTailwind()

  const iconSize = 40

  const kinds = {
    NewOpinion: {
      title: 'Dodano opinię na twój temat',
      subtitle: 'Kliknij tutaj aby zobaczyć',
      icon: (
        <StarIcon
          width={iconSize}
          height={iconSize}
          style={{ color: 'black' }}
        />
      )
    },
    NewViews: {
      title: 'Ktoś odwiedził twój profil',
      subtitle: 'Oby tak dalej!',
      icon: (
        <EyeIcon
          width={iconSize}
          height={iconSize}
          style={{ color: 'black' }}
        />
      )
    },
    TransactionSuccess: {
      title: 'Pomyślnie dokonano zakupu',
      subtitle: 'Kliknij tutaj po więcej informacji.',
      icon: (
        <HeartIcon
          width={iconSize}
          height={iconSize}
          style={{ color: 'black' }}
        />
      )
    },
    TransactionFailure: {
      title: 'Zakup nie powiódł się',
      subtitle: 'Spróbuj ponownie później',
      icon: (
        <ExclamationTriangleIcon
          width={iconSize}
          height={iconSize}
          style={{ color: 'black' }}
        />
      )
    },
    NewBuyer: {
      title: 'Ktoś kupił twój produkt',
      subtitle: 'Zobacz kto',
      icon: (
        <MegaphoneIcon
          width={iconSize}
          height={iconSize}
          style={{ color: 'black' }}
        />
      )
    }
  }

  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular
  })

  if (!fontsLoaded) return null

  return (
    <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
      <TouchableOpacity
        style={{ width: '80%', alignItems: 'flex-start', paddingLeft: '2%' }}
        onPress={() => {
          console.log(source)
          if (
            ['TransactionSuccess', 'TransactionFailure', 'NewBuyer'].includes(
              source.type
            )
          ) {
            navigation.navigate({
              name: 'TransactionDetailsView',
              merge: true,
              params: { source: source }
            })
          }
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={{ marginRight: 10 }}>{kinds[kind].icon}</View>
          <View style={{ alignContent: 'center'}}>
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold' }}
              >
                {kinds[kind].title}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 15, fontFamily: 'Karla_400Regular' }}>
                {kinds[kind].subtitle}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
