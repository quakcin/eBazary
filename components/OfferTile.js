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
import { Colors } from '../utils/Colors'

const MMX_LENGTH = 37;

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
        <View style={{ marginRight: 20 }}>
          <Image style={{ width: 70, height: 70, borderRadius: 10 }} source={{ uri: image }} />
        </View>

        <View
          style={{
            width: '70%',
            alignContent: 'center',
            height: 70,
            justifyContent: 'center'
          }}
        >
          <View>
            <Text
              style={{
                padding: 5,
                // fontFamily: 'RobotoMono_500Medium',
                fontWeight: 'bold',
                fontSize: 13
              }}
            >
              {title.length > MMX_LENGTH ? title.substr(0, MMX_LENGTH ) + '...' :  title}
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
                  color: Colors.removeAndDate,
                  fontFamily: 'Ubuntu_400Regular',
                  fontSize: 11,
                  marginTop: 3
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
