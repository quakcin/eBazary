import { View, Text } from 'react-native'
import React from 'react'
import { CameraIcon, PlusCircleIcon } from 'react-native-heroicons/outline'

const MakePhotoWidget = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: '#7B7AC1',
        padding: 7,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50
      }}
    >
      <CameraIcon width={30} heigh={30} style={{ color: 'black' }} />
    </View>
  )
}

export default MakePhotoWidget
