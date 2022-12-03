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

  // console.log('creating offer tile', obj);

  if (image === '')
  {
    image = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAB4UFhoWEx4aGBohHx4jLEowLCkpLFtBRDZKa15xb2leaGZ2haqQdn6hgGZolMqWobC1v8C/c47R4M+53qq7v7f/2wBDAR8hISwnLFcwMFe3emh6t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7f/wgARCABAAEADAREAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB9EAIGUAAZnMUAjpLAxOcYyTpNQMTmNQMjqNQEZAAGowJJGICigEIQAUMBCAAGM//xAAgEAACAQMFAQEAAAAAAAAAAAAAARECECEDEhMgMjFB/9oACAEBAAEFAryTnpU4W+oSqGqkTBS5VtTzTmqpy6HDqw9PzbU8rDdO4S220/Nnk40caONHGj5dmT9yZF0kkknrBBBF/wD/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAEDAQE/AQH/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAECAQE/AQH/xAAbEAACAgMBAAAAAAAAAAAAAAAAEQEwAiExUP/aAAgBAQAGPwKro2hmpueI58T/xAAgEAADAAEEAwEBAAAAAAAAAAAAAREhEDFBYSBRcbHh/9oACAEBAAE/IdZrUbhOGU/HPrQNexzTcFnNLh5OcEt6/sLBMc3oYlcMSq8H9hoP0UU34E5vxDdbfvwUSRn1O1naz6iSSLVLBBp/Bs5LXf8ACudXgg24GZE6rq1SCCSNf//aAAwDAQACAAMAAAAQAEAAEkAAEgAAEkgAAkkAAkggEEkgEkkg/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAwEBPxAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAgEBPxAB/8QAJRABAAICAQQBBAMAAAAAAAAAAQARITEQQWFxkVEggcHwseHx/9oACAEBAAE/EOWqo2o1BAxGrN/Sz7LoneeiXeJkqlyudegtUSMqMOiKqU6edfhB0Rcy9nCoPibyLSQR9DiavLz/ABo5O1cBiOymkY7Ws0uVju7VzV5eVJ2PSd/3hdj2z/Zne94ZCg0cu6YTI/DAAwj0pwZzcRhYnNeH+pRBkoW3pzf4jQLbvzj9MIGz9zlUV6QaqvP7+IlTsXAFAtEK+9ShtKx13dwCGnkBTNeNCb+Zvw57zsvvvc7T5uBRXH//2Q==
    `
  }

  return (
    <View key={title}>
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
