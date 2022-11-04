import { View, Text } from 'react-native'
import React from 'react'
import { CameraIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const MakePhotoWidget = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: Colors.backgroundColor,
        borderWidth: 1,
        padding: 7,
        borderRadius: 8,
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
