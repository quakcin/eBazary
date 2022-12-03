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
import servRequest from '../utils/Server';

import {
  StarIcon, MapPinIcon, CubeIcon, BanknotesIcon, ShoppingBagIcon
} from 'react-native-heroicons/outline'

export function OfferView({ route, navigation }) {
  const tw = useTailwind()

  const [offer, setOffer] = useState({ imgs: [], price: 0, title: '', descr: '' })
  const [coords, setCoords] = useState({latitude: 0, longitude: 0});
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [isRenderingMap, setIsRenderingMap] = useState(false);

  const renderMap = (lat, lon, coords) => <View>
      <MapView 
        style = {{
          width: '100%',
          height: 300
        }}
        zoom = {1000}
        initialRegion = {{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09
        }}
      >
        <MapView.Marker
          coordinate={coords}
          title={"Sprzedający"}
          descrription={"Adres sprzedającego"}
          />
      </MapView>
    </View>
  useEffect(() => 
  {
    // console.log('offerId', route.params.offerId)
    // setOffer(serverResp);
    // setLat(serverResp.lat);
    // setLon(serverResp.lon);
    // setCoords({latitude: serverResp.lat, longitude: serverResp.lon});

    // const offerId = '013a0dd0-732f-11ed-8b10-4ccc6a8f7f0f';
    
    servRequest
    (
      'getOffer',
      {
        offerId: route.params.offerId
      },
      (s) =>
      {
        navigation.setOptions({ title: `Oferta od ${s.user}` })
        setOffer(s);
        setLat(s.lat);
        setLon(s.lon);
        setCoords({latitude: s.lat, longitude: s.lon});
        setIsRenderingMap(true);
        console.log(lat, lon, coords);
      },
      (e) =>
      {
        console.log(e);
      }
    )

    return () => {
    }

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

        <VerticalSlider pictures={offer.imgs} navigation={navigation} />


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
                Koszty i Opłaty 
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
            {offer.descr}
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
            {isRenderingMap && renderMap(lat, lon, coords)}
          </View>
        </View>
      </ScrollView>
    </Viewport>
    )
  }
