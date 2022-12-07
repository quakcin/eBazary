import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import ShoppingHistoryItem from '../components/ShoppingHistoryItem'
import { Viewport } from '../utils/Viewport'
import OffersListing from '../components/OffersListing'
import { useIsFocused } from '@react-navigation/native'
import servRequest from '../utils/Server';


export function MyOffersView({ route, navigation }) {
  const [offers, setOffers] = useState([])
  const isFocused = useIsFocused()

  
  useEffect(() => 
  {
      servRequest 
      (
         'getUserOffers',
         {
            userId: route.params.userId
         },
         (s) => 
         {
            setOffers(s.offers.filter((n) => Object.keys(n).includes('title')));
         },
         (e) =>
         {
            console.log('getOffers fail', e);
         }
      )

   }, [isFocused])

  return (
    <Viewport navigation={navigation} active='Profile'>
      <OffersListing 
        infogram={offers} 
        onTitleClick = 
        {
            (e, v) => 
            {
               navigation.navigate('OfferView', {offerId: v.id, userId: route.params.userId});
            }
         }
        onSubtitleClick = {(e, v) => console.log('my offer subtitle click', v) }
        subtitle = 'usuń ofertę'
      />
    </Viewport>
  )
}
