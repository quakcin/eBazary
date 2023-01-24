import { StatusBar } from 'expo-status-bar'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import { useEffect, useState } from 'react'
import {
  useFonts,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'
import uuid from 'react-native-uuid';

import {
  BanknotesIcon,
  NoSymbolIcon,
  ShoppingBagIcon,
  StarIcon
} from 'react-native-heroicons/outline'
import { Colors } from '../utils/Colors'

export function TransactionDetailsView({ navigation, route }) {
  const tw = useTailwind()

  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular
  })

  const genSuccesHeader = (src) => {
    return (
      <>
        <View>
          <Text style={{ textAlign: 'center', width: '90%', marginLeft: '5%' }}>
            <Text style={{ fontFamily: 'Ubuntu_400Regular' }}>
              Dnia {src.details.date} dokonałeś/aś zakupu od użytkownika
            </Text>
            <Text
              style={{
                color: Colors.greenish,
                fontFamily: 'Ubuntu_400Regular'
              }}
            >
              {'  '} {src.details.user} {'  '}
            </Text>
            <Text style={{ fontFamily: 'Ubuntu_400Regular' }}>
              - {src.details.seller}
            </Text>
          </Text>
        </View>
      </>
    )
  }

  const genFailHeader = (src) => {
    return (
      <>
        <View>
          <Text
            style={{
              textAlign: 'center',
              width: '90%',
              marginLeft: '5%',
              fontFamily: 'Ubuntu_400Regular',
              fontSize: 15
            }}
          >
            Próba dokonania zakupu w dniu {src.details.date} od użytkownika
            <Text
              style={{
                textAlign: 'center',
                color: Colors.greenish,
                fontFamily: 'Ubuntu_400Regular'
              }}
            >
              {'  '} {src.details.user} {'  '}
            </Text>
            <Text
              style={{ textAlign: 'center', fontFamily: 'Ubuntu_400Regular' }}
            >
              nie powiodła się.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.reddish,
                fontFamily: 'Ubuntu_400Regular'
              }}
            >
              {'\n'} {src.details.reason}
            </Text>
            <Text
              style={{ textAlign: 'center', fontFamily: 'Ubuntu_400Regular' }}
            >
              !
            </Text>
          </Text>
        </View>
      </>
    )
  }

  const genBuyerHeader = (src) => {
    return (
      <>
        <View>
          <Text
            style={{
              textAlign: 'center',
              width: '90%',
              marginLeft: '5%',
              fontFamily: 'Ubuntu_400Regular'
            }}
          >
            <Text style={{ fontFamily: 'Ubuntu_400Regular' }}>
              Dnia {src.details.date} użytkownik
            </Text>
            <Text
              style={{
                color: Colors.greenish,
                fontFamily: 'Ubuntu_400Regular'
              }}
            >
              {'  '} {src.details.buyer.user} {'  '}
            </Text>
            <Text style={{ fontFamily: 'Ubuntu_400Regular' }}>
              dokonał/a u ciebie zakupu.
            </Text>
          </Text>
        </View>
      </>
    )
  }

  // TODO: Move me into separate container type beat
  const genItemList = (items) => {
    const summedItems = [
      ...items.map((n) => {
        return { name: n.name, price: n.price, w: 'normal' }
      }),
      {
        name: 'RAZEM',
        price: items
          .map((n) => parseFloat(n.price))
          .reduce((sum = 0, n) => (sum += n)),
        w: 'bold'
      }
    ]

    return (
      <View>
        {summedItems.map((n) => (
          <View
            key={uuid.v4()}
            style={{
              width: '70%',
              marginLeft: '15%',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: n.w,
                  fontFamily: 'Karla_400Regular'
                }}
              >
                {n.name}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: n.w,
                  fontFamily: 'Karla_400Regular'
                }}
              >
                {n.price}zł
              </Text>
            </View>
          </View>
        ))}
      </View>
    )
  }

  const [starsCount, setStarsCount] = useState(3)

  const genStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++)
      stars.push(
        <TouchableOpacity>
          <StarIcon
            key={uuid.v4()}
            style={{ color: i <= starsCount ? Colors.yellowish : Colors.dark }}
            width='25'
            height='25'
            onPress={() => setStarsCount(i)}
          />
        </TouchableOpacity>
      )
    return stars
  }

  const [opinion, setOpinion] = useState('')

  const genSuccesFooter = (src) => {
    return (
      <View>
        <View
          style={{
            marginTop: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          {genStars().map((n) => n)}
        </View>
        <View style={{ marginTop: 25 }}>
          <TextInput
            style={{
              backgroundColor: '#fbfbfb',
              width: '80%',
              height: 150,
              marginLeft: '10%',
              padding: 15,
              textAlignVertical: 'top',
              fontFamily: 'Ubuntu_400Regular'
            }}
            placeholder="Opinia kupującego"
            multiline={true}
            value={opinion}
            onChangeText={(t) => setOpinion(t)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: Colors.buttons,
              paddingHorizontal: 45,
              paddingVertical: 10,
              alignItems: 'center',
              marginTop: 20,
              width: '80%',
              alignSelf: 'center'
            }}
            onPress={() => {
              console.log('opinia: ', opinion, 'gwiazdki', starsCount)
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                fontFamily: 'Karla_400Regular'
              }}
            >
              Dodaj Opinię
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const genBuyerFooter = (src) => {
    // console.log('metakye', src.details.buyer);
    const fields = Object.keys(src.details.buyer).map((n) =>
      n === 'user' ? (
        <Text style={{ fontFamily: 'RobotoMono_600SemiBold' }} key={uuid.v4}>
          Szczegóły kupującego:
        </Text>
      ) : (
        src.details.buyer[n]
      )
    )

    return (
      <View>
        {fields.map((n) => (
          <Text
            key={uuid.v4()}
            style={{
              textAlign: 'center',
              fontFamily: 'Ubuntu_400Regular',
              marginTop: 3
            }}
          >
            {n}
          </Text>
        ))}
      </View>
    )
  }

  const genFooter = {
    TransactionSuccess: genSuccesFooter,
    TransactionFailure: (src) => <Text></Text>,
    NewBuyer: genBuyerFooter
  }

  const genHeader = {
    TransactionSuccess: genSuccesHeader,
    TransactionFailure: genFailHeader,
    NewBuyer: genBuyerHeader
  }

  const genIcons = {
    TransactionSuccess: (
      <ShoppingBagIcon
        style={{ color: Colors.greenish }}
        width='50'
        height='50'
      />
    ),
    TransactionFailure: (
      <NoSymbolIcon style={{ color: Colors.reddish }} width='50' height='50' />
    ),
    NewBuyer: (
      <BanknotesIcon
        style={{ color: Colors.greenish }}
        width='50'
        height='50'
      />
    )
  }

  if (!fontsLoaded) return null

  return (
    <Viewport navigation={navigation} active='Bell'>
      <ScrollView>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 25,
            borderRadius: 100,
            width: 70,
            height: 70,
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
        >
          {genIcons[route.params.source.type]}
        </View>
        <View style={{ marginTop: 25 }}>
          {genHeader[route.params.source.type](route.params.source)}
        </View>
        <View
          style={{ width: '100%', backgroundColor: '#ffffff', marginTop: 25 }}
        >
          <View style={{ marginTop: 25, marginBottom: 25 }}>
            {genItemList(route.params.source.details.items)}
          </View>
        </View>
        <View style={{ marginTop: 25, marginBottom: 50 }}>
          {genFooter[route.params.source.type](route.params.source)}
        </View>
      </ScrollView>
    </Viewport>
  )
}
