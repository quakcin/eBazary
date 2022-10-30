import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'

const ShoppingHistoryItem = ({ data }) => {
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
          flexDirection: 'row'
        }}
      >
        <Image
          style={{ width: 80, height: 80, marginRight: 30 }}
          source={{ uri: data.image }}
        />
        <View style={{ justifyContent: 'space-evenly' }}>
          <Text>{data.title}</Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 11, color: Colors.removeAndDate }}>
              02.03.2019
            </Text>
            <Text>{data.price}zł</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ShoppingHistoryItem
