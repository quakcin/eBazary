import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import ShoppingHistoryItem from '../components/ShoppingHistoryItem'
import { Viewport } from '../utils/Viewport'

import OffersListing from '../components/OffersListing'

import servRequest from '../utils/Server';

export function MyShoppingView({ navigation }) {
  const tw = useTailwind()

  const [hist, setHist] = useState(null);

  useEffect(() => 
  {

    servRequest
    (
      'getShoppings',
      {
         userId: 0
      },
      (s) => 
      {
         setHist(s.list);
      },
      (e) =>
      {
         console.log('getShoppings failed', e);
      }
    )


    return () => console.log('left');
  }, [])

  return (
    <Viewport navigation={navigation} active='Cart'>
      {
        hist && (
          <OffersListing 
            infogram={hist} 
            onTitleClick = {(e, id) => console.log('shopping history title click', id) }
            onSubtitleClick = {(e, id) => console.log('shopping history subtitle click', id) }
            subtitle = '@'
          />
        )
      }
    </Viewport>
  )
}
