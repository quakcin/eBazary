import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  ShoppingCartIcon,
  PlusIcon,
  ShoppingBagIcon,
  BellIcon,
  UserCircleIcon
} from 'react-native-heroicons/outline'
import { useTailwind } from 'tailwind-rn'
import { useFonts, RobotoMono_500Medium } from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'

const OfferTile = ({
  title,
  subtitle,
  price,
  image,
  onTileClick,
  onSubtitleClick
}) => {
  const tw = useTailwind()

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    RobotoMono_500Medium
  })

  if (!fontsLoaded) return null

  return (
    <View>
      <TouchableOpacity
        onPress={onTileClick}
        style={{ flexDirection: 'row', width: '80%', marginBottom: 20 }}
      >
        <View>
          <Image style={{ width: 70, height: 70 }} source={{ uri: image }} />
        </View>

        <View style={{ width: '70%', alignContent: 'center', height: 70 }}>
          <View>
            <Text
              style={{
                padding: 5,
                fontFamily: 'RobotoMono_500Medium',
                fontWeight: '500',
                fontSize: 13
              }}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5
            }}
          >
            <View>
              <Text
                onPress={onSubtitleClick}
                style={{
                  color: '#b8215b',
                  fontFamily: 'Ubuntu_400Regular',
                  fontSize: 11
                }}
              >
                {subtitle}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Ubuntu_400Regular'
                }}
              >
                {price}zł
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default OfferTile
