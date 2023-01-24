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
import OfferTile from '../components/OfferTile'
import { Viewport } from '../utils/Viewport'
import { Colors } from '../utils/Colors'
import servRequest from '../utils/Server';
import { useIsFocused } from '@react-navigation/native'

export function CartView({ route, navigation }) 
{
  const isFocused = useIsFocused()

  const [offers, setOffers] = useState([])

  const [isEmpty, setIsEmpty] = useState(false);

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
        // console.log(s);
        setOffers(s.offers.filter((n) => Object.keys(n).includes('title')));
      },
      (e) =>
      {
        Alert.alert(
          "Błąd aplikacji",
          "Wystąpił nieoczekiwany błąd, spróbuj ponownie później!",
          s, [ { text: "OK" } ]
        );
      }
    )
  }


  useEffect(() => { 
    perfCartRefresh();
    return () => {
      //console.log('left');
    }
  }, [isFocused])


  const buy = () => {
    navigation.navigate('BuyView', {
      offers: offers.map((n) => 
      ({
        offerId: n.offerId,
        name: n.title,
        price: n.price
      })),
      userId: route.params.userId
    })
    // console.log('Kupujesz produkty z koszyka!', route.params.cartCounter)
  }

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
                  // console.log('handle item removal', o.offerId);
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
            onPress={buy}
            disabled={isEmpty? true : false}
          >
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular',
                  alignSelf: 'center'
                }}
              >
                Dokonaj Zakupu
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Viewport>
  )
}
