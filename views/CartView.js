import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useTailwind } from 'tailwind-rn'

// import CartItem from '../components/CartItem'
import OfferTile from '../components/OfferTile'


import { Viewport } from '../utils/Viewport'
import { Karla_400Regular, useFonts } from '@expo-google-fonts/karla'
import { Colors } from '../utils/Colors'
import servRequest from '../utils/Server';

export function CartView({ route, navigation }) 
{
  // const tw = useTailwind()

  const [offers, setOffers] = useState([])

  const perfCartRefresh = () =>
  {
    servRequest
    (
      'getCart',
      {
        userId: route.params.userId
      },
      (s) =>
      {
        console.log(s);
        setOffers(s.offers.filter((n) => Object.keys(n).includes('title')));
      },
      (e) =>
      {
        // FIXME:ALERT
      }
    )
  }


  /*
    EB1-I23
    Prawdopodobnie nawigacja!!
  */
  useEffect(() => { 
    perfCartRefresh();
    return () => {
      console.log('left'); /* nigdy nie zamyka tej strony */
                           /* chyba nawigacja */
    }
  }, [])

  /*
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })
  */

  const buy = () => {
    console.log('Kupujesz produkty z koszyka!')
  }

  // if (!fontsLoaded) return null

  return (
    <Viewport navigation={navigation} active='Cart'>
      <View style={{ alignItems: 'center', width: '100%', alignSelf: 'center' }}>
        <ScrollView style={{ height: '90%', width: '100%' }}>
          <View style={{width: '100%', marginLeft: '10%', marginTop: 50, marginBottom: 75}}>
            {offers.map((o) => (
              <OfferTile
                title={o.title}
                price={o.price}
                subtitle = 'zrezygnuj'
                image={o.thumb}
                onSubtitleClick={() => {
                  console.log('handle item removal', o.offerId);
                  servRequest
                  (
                    'removeFromCart',
                    {
                      userId: route.params.userId,
                      offerId: o.offerId
                    },
                    (s) =>
                    {
                      perfCartRefresh();
                    },
                    (e) =>
                    {
                      // TODO:ALERT
                    }
                  )
                }}
                onTileClick={() => {
                  navigation.navigate('OfferView', { offerId: o.offerId, userId: route.params.userId })
                }}
                key={o.title}
              />
            ))}
          </View>
        </ScrollView>

        <View style={{ minHeight: '10%', justifyContent: 'center', width: '80%' }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: Colors.buttons,
              minWidth: '100%',
              paddingVertical: 10
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                fontFamily: 'Karla_400Regular',
                alignSelf: 'center'
              }}
              onPress={buy}
            >
              Dokonaj Zakupu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Viewport>
  )
}
