import { View, Text, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/outline'

const Opinion = ({ image, rating, message }) => {
  const MAX_STARS = 5

  const generateStarsJSX = () => {
    const stars = []

    for (let i = 0; i < MAX_STARS; i++)
      stars.push(
        <StarIcon
          style={{ color: `${i < rating ? '#FFA901' : 'black'}` }}
          width={18}
          height={18}
          key={i}
        />
      )

    return stars
  }

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
        <Text style={{ fontSize: 12 }}>{message}</Text>
      </View>
    </View>
  )
}

export default Opinion
