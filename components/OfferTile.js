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

const OfferTile = ({ title, subtitle, price, image, onTileClick, onSubtitleClick }) => 
{
  const tw = useTailwind()
  return (
    <View>
      <TouchableOpacity onPress={onTileClick} style={{flexDirection: 'row', width: '80%', marginBottom: 20}}>
        <View>
          <Image
            style={{width: 70, height: 70}}
            source={{uri: image}}
          />
        </View>

        <View style={{width: '70%', alignContent: 'center', height: 70}}>

          <View>
            <Text style={{fontWeight: 'bold', padding: 5, fontSize: 14}}>
              {title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
            <View> 
              <Text
                onPress={onSubtitleClick}
                style={{color: '#b8215b', fontSize: 10}}
              >
                {subtitle}
              </Text>          
            </View>
            <View>
              <Text>
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
