import React from "react"
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"

const ShowImage = (props) => {
  return (
    <View
      style={style.imgContainer}>
      <Image
        source={{uri: props.route.params.url}}
        style={style.image}
      />
    </View>
  )
}

const style = StyleSheet.create({
  imgContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
  },
  image: {
      resizeMode: 'contain',
      flex: 1,
      aspectRatio: 1
  }
});

export default ShowImage