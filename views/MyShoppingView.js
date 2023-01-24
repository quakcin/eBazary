import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import ShoppingHistoryItem from '../components/ShoppingHistoryItem'
import { Viewport } from '../utils/Viewport'

import OffersListing from '../components/OffersListing'

import servRequest from '../utils/Server';
import { useIsFocused } from '@react-navigation/native'

export function MyShoppingView({ route, navigation }) {
  const tw = useTailwind()

  const [hist, setHist] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => 
  {
    servRequest
    (
      'getShoppings',
      {
         userId: route.params.userId
      },
      (s) => 
      {
        const list = s.offers;
        list.pop();
        setHist(list.reverse());
      },
      (e) =>
      {
         console.log('getShoppings failed', e);
      }
    )


    return () => console.log('left');
  }, [isFocused])

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
