import { View, Text, Image } from 'react-native'
import React from 'react'
import { useFonts, RobotoMono_500Medium } from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Colors } from '../utils/Colors'

const CartItem = ({ data }) => {
  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    RobotoMono_500Medium
  })

  const deleteItem = () => {
    console.log(`Removing ${JSON.stringify(data)}`)
  }

  if (!fontsLoaded) return null

  return (
    <View
      style={{
        minWidth: '100%',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          paddingVertical: 15,
          flexDirection: 'row',
          width: '90%'
        }}
      >
        <Image
          style={{ width: 80, height: 80, marginRight: 30 }}
          source={{ uri: data.image }}
        />
        <View
          style={{
            justifyContent: 'space-evenly'
          }}
        >
          <Text
            style={{
              fontFamily: 'RobotoMono_500Medium',
              fontWeight: '500',
              fontSize: 13
            }}
          >
            {data.title}
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: Colors.removeAndDate,
                fontFamily: 'Ubuntu_400Regular'
              }}
              onPress={deleteItem}
            >
              usuń
            </Text>
            <Text
              style={{
                fontFamily: 'Ubuntu_400Regular'
              }}
            >
              {data.price}zł
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartItem
