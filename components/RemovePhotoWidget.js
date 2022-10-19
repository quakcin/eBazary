import { View, Image } from 'react-native'
import React from 'react'
import { MinusCircleIcon } from 'react-native-heroicons/outline'

const RemovePhotoWidget = ({ uri }) => {
  return (
    <View
      style={{
        display: 'flex',
        width: 50,
        height: 50,
        position: 'relative',
        justifyContent: 'center'
      }}
    >
      <Image
        source={{ uri: uri }}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          zIndex: 1,
          opacity: 0.6
        }}
      />
      <MinusCircleIcon
        width={50}
        heigh={50}
        style={{
          color: 'black',
          position: 'absolute',
          zIndex: 2
        }}
      />
    </View>
  )
}

export default RemovePhotoWidget
