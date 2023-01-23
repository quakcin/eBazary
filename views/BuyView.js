import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { ArchiveBoxArrowDownIcon } from 'react-native-heroicons/outline'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import SelectList from 'react-native-dropdown-select-list'
import {
  useFonts,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'
import { Colors } from '../utils/Colors'
import servRequest from '../utils/Server';
import uuid from 'react-native-uuid';


// const serverResp = {
//   items: [
//     { name: 'Perfumy męskie Calivin Klein', price: 130 },
//     { name: 'Frytkownica Pyrex', price: 52 },
//     { name: 'Kurtka męska zimowa L', price: 253 },
//     { name: 'Kalesony sportowe', price: 43 }
//   ]
// }

import * as Location from 'expo-location';

export function BuyView({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular
  })

  const tw = useTailwind()

  useEffect(() => {
    console.log('offers', route.params.offers)
  }, [])

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
            style={{
              width: '70%',
              marginLeft: '15%',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            key = {n.name}
          >
            <View>
              <Text
                style={{
                  fontSize: 13,
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
                  fontSize: 13,
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

  const [selected, setSelected] = useState('')
  const data = [
    { key: 'pp', value: 'Poczta Polska' },
    { key: 'pl', value: 'Kurier DPD' },
    { key: 'ph', value: 'Kurier DHL' },
    { key: 'pi', value: 'Paczkomat InPost' }
  ]

  const [location, setLocation] = useState(null);

  const [tbxAdres, setTbxAdres] = useState('');
  const [tbxMiasto, setTbxMiasto] = useState('');
  const [tbxPoczt, setTbxPoczt] = useState('');
  const [btnEnabled, setBtnEnabled] = useState(true);


  useEffect(() => 
  {
    (async () => 
    {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') 
      {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  useEffect(() => 
  {
    if (location != null)
    {
      console.log(location);

      // prep request url
      const apiRequest = `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apiKey=24d24bff67b34d988d0adc504c1f8ed9`;

      // make request
      fetch(apiRequest)
        .then((response) => response.json())
        .then((resp) => {
          setTbxAdres(`${resp.features[0].properties.street} ${resp.features[0].properties.housenumber}`);
          setTbxMiasto(resp.features[0].properties.city);
          setTbxPoczt(resp.features[0].properties.postcode);
        });
    }
  }, [location])


  const payment = function ()
  {
    /*
      for each offer, make request
    */
    setBtnEnabled(false);
    for (const [i, offer] of route.params.offers.entries())
    {
      servRequest
      (
        'buyOffer',
        {
          offerId: offer.offerId,
          userId: route.params.userId,
          uuid: uuid.v4(),
          /* serialize more */
          adr1: `${tbxPoczt} ${tbxMiasto}`,
          adr2: `${tbxAdres}`,
          shp: selected
        },
        (s) =>
        {
          console.log("Bought!");
        },
        (e) =>
        {
          console.log(e);
        }
      )
    }

    setTimeout(() => {
      navigation.navigate("BellView", {
        userId: route.params.userId
      })
    }, 500);
  }

  // console.log(text);

  if (!fontsLoaded) return null

  return (
    <Viewport navigation={navigation} active='Cart'>
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
            backgroundColor: 'white',
            marginBottom: 10
          }}
        >
          <ArchiveBoxArrowDownIcon
            style={{ color: Colors.dark }}
            width='40'
            height='40'
          />
        </View>
        <View style={{ marginTop: 25 }}>{genItemList(route.params.offers)}</View>
        <View style={{ width: '80%', marginLeft: '10%', marginTop: 40 }}>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <TextInput
              style={[
                styles.defaultInput,
                styles.shortInput,
                {
                  flex: 1
                }
              ]}
              placeholder='Miasto'
              value={tbxMiasto}
              onChangeText={setTbxMiasto}
            />

            <TextInput
              style={[
                styles.defaultInput,
                styles.shortInput,
                {
                  marginLeft: 15,
                  width: 90,
                  padding: 5
                }
              ]}
              placeholder='Poczt.'
              value={tbxPoczt}
              onChangeText={setTbxPoczt}
            />
          </View>
          <View style={{ padding: 10 }}>
            <TextInput
              style={[
                styles.defaultInput,
                styles.shortInput,
                {
                  flex: 1
                }
              ]}
              placeholder='Adres'
              value={tbxAdres}
              onChangeText={setTbxAdres}
            />
          </View>
          <View style={{ padding: 10 }}>
            <SelectList
              setSelected={setSelected}
              data={data}
              search={false}
              placeholder={'Rodzaj dostawy'}
              boxStyles={{
                borderRadius: 0,
                backgroundColor: '#f1f1f1',
                borderWidth: 0,
                borderBottomWidth: 2,
                borderBottomColor: '#424242',
              }}
              dropdownStyles={{
                borderRadius: 0,
                backgroundColor: '#f3f3f3',
                borderWidth: 2,
                borderBottomColor: '#424242',
              }}
              inputStyles={{
                fontFamily: 'Karla_400Regular'
              }}
              dropdownTextStyles={{
                fontFamily: 'Karla_400Regular'
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: Colors.buttons,
            paddingHorizontal: 45,
            paddingVertical: 10,
            alignItems: 'center',
            width: '75%',
            alignSelf: 'center',
            marginTop: '12%'
          }}
          disabled={!btnEnabled}
          onPress={() => payment()}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: '400',
              fontFamily: 'Karla_400Regular'
            }}
          >
            Zapłać
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Viewport>
  )
}

const styles = StyleSheet.create({
  defaultInput: {
    fontFamily: 'Ubuntu_400Regular'
  },

  shortInput: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    paddingHorizontal: 20
  }
})
