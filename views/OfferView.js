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

import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

import {
  StarIcon, MapPinIcon, CubeIcon, BanknotesIcon, ShoppingBagIcon
} from 'react-native-heroicons/outline'

export function OfferView({ navigation }) {
  const tw = useTailwind()

  const serverResp = {
    dbid: 0,
    images: [
      'https://ireland.apollo.olxcdn.com/v1/files/wed4kza7piuy2-PL/image;s=1000x700',
      'https://ireland.apollo.olxcdn.com/v1/files/dll29qfbh1g02-PL/image;s=1000x700',
      'https://ireland.apollo.olxcdn.com/v1/files/ds0knw6hutf3-PL/image;s=1000x700',
      'https://ireland.apollo.olxcdn.com/v1/files/6gelwgg39542-PL/image;s=1000x700',
      'https://ireland.apollo.olxcdn.com/v1/files/jyxpeu8iog2b2-PL/image;s=1000x700'
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
    surname: 'Bimber',
    lat: 54.35360365985268,  
    lon: 18.648861800145415
  }

  const [offer, setOffer] = useState({ images: [] })
  const [coords, setCoords] = useState({latitude: 0, longitude: 0});
  const [lat, setLat] = useState(52.237049);
  const [lon, setLon] = useState(21.017532);

  useEffect(() => 
  {
    navigation.setOptions({ title: `Oferta od ${serverResp.seller}` })
    setOffer(serverResp);
    setLat(serverResp.lat);
    setLon(serverResp.lon);
    setCoords({latitude: serverResp.lat, longitude: serverResp.lon});

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



        <View style={{width: '80%', marginLeft: '10%'}}>
          <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 30, alignContent: 'flex-start'}}>
            <View>
              <ShoppingBagIcon width="50" height="50" style={{color: 'black'}}/>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28,
                  fontFamily: 'Karla_500Medium',
                  marginLeft: 10,
                  textAlign: 'left',
                  width: '55%'
                }}
              >
                {offer.title}
              </Text>
            </View>
          </View>
        </View>

        <VerticalSlider pictures={offer.images} navigation={navigation} />


        <View style={{width: '80%', marginLeft: '10%'}}>


          <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 30, alignItems: 'center'}}>
            <View>
              <BanknotesIcon width="50" height="50" style={{color: 'black'}}/>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28,
                  fontFamily: 'Karla_500Medium',
                  marginLeft: 10
                }}
              >
                Koszta i Opłaty 
              </Text>
            </View>
          </View>


          {/* ZAKUPY */}
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
                  fontSize: 24,
                  fontFamily: 'Ubuntu_700Bold'
                }}
              >
                {offer.price.toFixed(2)}zł
              </Text>

              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.buttons,
                  paddingHorizontal: 30,
                  paddingVertical: 14,
                  alignItems: 'center'
                }}
                onPress={() => {
                  console.log('Do koszyka...')
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
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
                  // backgroundColor: '#c91c48',
                  paddingHorizontal: 45,
                  paddingVertical: 14,
                  alignItems: 'center'
                }}
                onPress={() => navigation.navigate('BuyView')}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
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
        {/* ZAKUPY */}

        <View style={{ width: '80%', marginLeft: '10%', alignContent: 'center' }}>


          <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 30, alignItems: 'center'}}>
            <View>
              <CubeIcon width="50" height="50" style={{color: 'black'}}/>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28,
                  fontFamily: 'Karla_500Medium',
                  marginLeft: 10
                }}
              >
                Opis Oferty
              </Text>
            </View>
          </View>


          <Text
            style={{
              textAlign: 'justify',
              fontSize: 16,
              fontFamily: 'Ubuntu_400Regular'
            }}
          >
            {offer.desc}
          </Text>
          
          <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 30, alignItems: 'center'}}>
            <View>
              <MapPinIcon width="50" height="50" style={{color: 'black'}}/>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28,
                  fontFamily: 'Karla_500Medium',
                  marginLeft: 10
                }}
              >
                Lokalizacja
              </Text>
            </View>
          </View>


          <View style={{marginBottom: 60}}>
              <MapView 
                style = {{
                  width: '100%',
                  height: 300
                }}
                zoom = {1000}
                initialRegion = {{
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta: 0.0009,
                  longitudeDelta: 0.0009
                }}
              >
                <MapView.Marker
                    coordinate={coords}
                    title={"Sprzedający"}
                    description={"Adres sprzedającego"}
                />
              </MapView>
            </View>
          </View>
        </ScrollView>
      </Viewport>
    )
  }
