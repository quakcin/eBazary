import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import { useEffect, useState, SafeAreaView } from 'react'
import AutoHeightImage from 'react-native-auto-height-image'
import VerticalSlider from '../components/ImageSlider'
import {
  useFonts,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono'
import {
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold
} from '@expo-google-fonts/ubuntu'
import { Karla_400Regular, Karla_500Medium } from '@expo-google-fonts/karla'
import { Colors } from '../utils/Colors'

export function OfferView({ navigation }) {
  const tw = useTailwind()

  const serverResp = {
    dbid: 0,
    images: [
      'https://ireland.apollo.olxcdn.com/v1/files/omg4oi2a48ye3-PL/image;s=644x461',
      'https://ireland.apollo.olxcdn.com/v1/files/frnhis0bnomh1-PL/image;s=644x461',
      'https://ireland.apollo.olxcdn.com/v1/files/lu8wi8cn3cki1-PL/image;s=644x461'
    ],
    title: 'Apple iPhone 13 mini 128GB (zielony)',
    desc: `Zapraszamy do skorzystania z naszej oferty i zapoznania się z jej opisem.

    Dostępne kolory:
    
    CZARNY
    FIOLETOWY
    BIAŁY
    CZERWONY
    ZIELONY
    ŻÓŁTY
    Pamiętaj o podaniu koloru przedmiotu podczas składnia zamówienia.
    
    Przekaż informację podczas składania zamówienia lub w wiadomości do sprzedającego.
    Zamówienie może zostać wstrzymane do momentu otrzymania informacji.
    PREMIUM APPLE IPHONE 11 128GB RÓŻNE KOLORY KL. A+ Słuchawki w komplecie tak
    Co oznacza klasa A+ urządzenia?
    Jest to najwyższa dostępna na rynku klasa urządzenia, która jest idealnym kompromisem pomiędzy urządzeniem używanym a nowym! Zadowalający stan techniczny i wizualny.
    Każdy z naszych klientów otrzymuje urządzenie sprawne technicznie, sprawdzone przez sztab specjalistów pod każdym możliwym kątem sprawności telefonu.
    Nie powstydzisz się kupując telefon dla siebie lub kogoś bliskiego! Stan wizualny to wygląd, który zadowoli nawet najbardziej wymagających konsumentów.
    Idealny pomysł na prezent w najkorzystniejszej cenie na rynku!`,
    price: 2299.5,
    kind: 'Elektronika',
    seller: 'TanieIphonyPL',
    name: 'Mariusz',
    surname: 'Bimber'
  }

  const [offer, setOffer] = useState({ images: [] })

  useEffect(() => {
    navigation.setOptions({ title: `${serverResp.title}` })
    setOffer(serverResp)
  }, [])

  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular,
    Karla_500Medium,
    Ubuntu_700Bold
  })

  if (!fontsLoaded) return null

  return (
    <Viewport navigation={navigation} active='Home'>
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginTop: 25,
            marginBottom: 12,
            fontFamily: 'RobotoMono_600SemiBold'
          }}
        >
          {offer.seller}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 13,
            marginBottom: 15,
            fontFamily: 'Karla_500Medium'
          }}
        >
          prezentuje
        </Text>
        <VerticalSlider pictures={offer.images} navigation={navigation} />
        <View style={{ width: '80%', marginLeft: '10%' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'Karla_500Medium'
            }}
          >
            Opis
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Ubuntu_400Regular'
            }}
          >
            {offer.desc}
          </Text>
          <View style={{ width: '100%', marginTop: 40 }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Ubuntu_700Bold'
                }}
              >
                {offer.price.toFixed(2)}zł
              </Text>

              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.buttons,
                  paddingHorizontal: 45,
                  paddingVertical: 10,
                  alignItems: 'center'
                }}
                onPress={() => {
                  console.log('Do koszyka...')
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
                  Do Koszyka
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, marginBottom: 30 }}>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.buttons,
                  paddingHorizontal: 45,
                  paddingVertical: 10,
                  alignItems: 'center'
                }}
                onPress={() => navigation.navigate('BuyView')}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '400',
                    fontFamily: 'Karla_400Regular'
                  }}
                >
                  Kup Teraz!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Viewport>
  )
}
