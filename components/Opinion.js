import { View, Text, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/outline'
import { Nunito_400Regular, useFonts } from '@expo-google-fonts/nunito'
import { Colors } from './../utils/Colors'

const Opinion = ({ image, rating, message }) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular
  })

  const MAX_STARS = 5

  const lightMode = false

  const generateStarsJSX = () => {
    const stars = []

    for (let i = 0; i < MAX_STARS; i++)
      stars.push(
        <StarIcon
          style={{
            color: `${
              i < rating
                ? Colors.yellowish
                : lightMode
                ? 'black'
                : Colors.textColorDarkMode
            }`
          }}
          width={18}
          height={18}
          key={i}
        />
      )

    return stars
  }

  if (!fontsLoaded) return null

  return (
    <View style={{ flexDirection: 'row', marginTop: 13 }}>
      <Image
        source={{ uri: image }}
        style={{ width: 65, height: 65, borderRadius: 90 }}
      />
      <View
        style={{
          paddingLeft: 15,
          justifyContent: 'space-around',
          flexShrink: 1
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {(() => generateStarsJSX())()}
        </View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Nunito_400Regular',
            fontWeight: '400',
            color: lightMode ? Colors.dark : Colors.textColorDarkMode
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  )
}

export default Opinion
