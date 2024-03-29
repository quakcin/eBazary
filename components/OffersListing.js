import { View, ScrollView } from 'react-native'
import React from 'react'
import {
  ShoppingCartIcon,
  PlusIcon,
  ShoppingBagIcon,
  BellIcon,
  UserCircleIcon
} from 'react-native-heroicons/outline'
import { useFonts, RobotoMono_500Medium } from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Colors } from '../utils/Colors'
import uuid from 'react-native-uuid';

import OfferTile from './OfferTile'

const OffersListing = ({
  onTitleClick,
  onSubtitleClick,
  subtitle,
  infogram
}) => {

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    RobotoMono_500Medium
  })

  if (!fontsLoaded) return null

  if (!infogram) return <View></View>

  return (
    <View style={{marginTop: 50, marginBottom: 50}}>
      <ScrollView style={{width: '100%', marginLeft: '10%'}}>
        {infogram.map((o) => (
          <OfferTile
            title={o.title}
            price={o.price}
            subtitle = {subtitle == '@' ? o.date : subtitle}
            image={o.image}
            onSubtitleClick={(e, v = o) => onSubtitleClick(e, v)}
            onTileClick={(e, v = o) => onTitleClick(e, v)}
            key={uuid.v4()}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default OffersListing
