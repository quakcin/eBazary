import { StatusBar } from 'expo-status-bar'
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  StyleSheet
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import OfferTile from '../components/OfferTile'
import { useEffect, useState } from 'react'
import { Ubuntu_400Regular, useFonts } from '@expo-google-fonts/ubuntu'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { CartView } from './CartView'
import { NewOfferView } from './NewOfferView'

import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  FunnelIcon
} from 'react-native-heroicons/outline'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from '../utils/Colors'

const Drawer = createDrawerNavigator()

export function HomeView({ navigation }) {
  const tw = useTailwind()

  const [offers, setOffers] = useState([])
  const [isShowingFilters, setIsShowingFilters] = useState(false)
  const [category, setCategory] = useState('')
  const [filter, setFilter] = useState('')
  const [openCategroy, setOpenCategory] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  const [categories, setCateogries] = useState([
    { label: 'Wszystkie', value: 0 },
    { label: 'Dom', value: 1 },
    { label: 'Elektronika', value: 2 },
    { label: 'Moda', value: 3 },
    { label: 'Motoryzacja', value: 4 },
    { label: 'Inne', value: 5 }
  ])

  const [filters, setFilters] = useState([
    { label: 'Tranfość', value: 0 },
    { label: 'Ocena', value: 1 },
    { label: 'Oszczędnie', value: 2 },
    { label: 'Bogato', value: 3 }
  ])

  // fix drop down hooks

  const serverResp = `
    [{"image":"https://ireland.apollo.olxcdn.com/v1/files/jew2jy0i9mcj2-PL/image;s=644x461","title":"Wynajme lokal Andrychów, super lokalizacja, 45-65metrow; duzy parking","price":"2190","kind":"Andrychów"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/lh3m6p9ma2f61-PL/image;s=644x461","title":"Paleta Euro / Epal / 120×80","price":"54","kind":"Macierzysz"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/12vkuo75b1s11-PL/image;s=644x461","title":"Drukarnia druk dtf Metki","price":"55","kind":"Warszawa,"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/lu8wi8cn3cki1-PL/image;s=644x461","title":"Montaż, ustawianie, naprawa, sprzedaż anten sat. i DVB-T","price":"350","kind":"Racibórz"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/n698i4nhurae1-PL/image;s=644x461","title":"Prasa kostkująca New Holland Bigbaler 1290 Cropcutter (duża kostka)","price":"235000","kind":"Małdyty"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/nuc1x9g9w8a53-PL/image;s=644x461","title":"Kosiarka bijakowa na wysięgniku MIKANN AGQ 105,,nowa, JAPAN TRAK","price":"7724","kind":"Radomsko"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/tswhvisxju2j1-PL/image;s=644x461","title":"Black & White Yorkshire Terrier sunia","price":"3900","kind":"Bytom"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/qrsdscp5vqie1-PL/image;s=644x461","title":"Deski szalunkowe Stemple Więźba Transport","price":"800","kind":"Wadowice"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/1vyg49jcugxw1-PL/image;s=644x461","title":"Swarovski pierścionek chic Blue Crystal rozm. 60","price":"500","kind":"Czernikowice"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/omg4oi2a48ye3-PL/image;s=644x461","title":"Garaż blaszany 6x5 Blaszak dwustanowiskowy WZMOCNIONY Garaże 6x5 6x6","price":"5519","kind":"Poznań,"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/frnhis0bnomh1-PL/image;s=644x461","title":"Myjka Karcher HD 10/25 4S ,1090, 13/18, 1290, 895","price":"4500","kind":"Chachalnia"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/w14xkl8axd4a-PL/image;s=644x461","title":"wynajem szalunków stropowych i ściennych / najtaniej","price":"10","kind":"Kutno"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/ww3j3cpxbpp4-PL/image;s=644x461","title":"Kolorowe - BLACHY Trapezowe - Najtaniej w Elblągu","price":"19,25","kind":"Kazimierzowo"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/7qjga8r6v6ek2-PL/image;s=644x461","title":"Nowe kozaczki, buty przejściowe Geox,buciki na jesień, przejściówki 24","price":"75","kind":"Brzozów"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/ngo2l7y7p2jo2-PL/image;s=644x461","title":"Szamba betonowe zbiorniki na deszczówkę szambo ścieki 12 10m3 14 6 5","price":"1500","kind":"Inowrocław"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/cwozw21mqfz92-PL/image;s=644x461","title":"Serwis Konsol XBOX 360 ONE S X PS3 PS4 SLIM PRO KRAKÓW RGH przeróbka","price":"220","kind":"Kraków,"}]
  `

  useEffect(() => {
    const resp = JSON.parse(serverResp)
    for (let r of resp)
      if (r.title.length > 37) r.title = r.title.substr(0, 37) + '...'
    setOffers(resp)
  }, [])

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular
  })

  if (!fontsLoaded) return null

  return (
    <Viewport navigation={navigation} active='Home' isFullScreen={true}>
      <ScrollView>
        <View
          style={{
            width: '80%',
            marginTop: 15,
            marginLeft: '10%',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <TextInput
            style={[styles.defaultInput, styles.shortInput]}
            placeholder='Szukaj'
          />

          <TouchableOpacity>
            <FunnelIcon
              width={30}
              height={30}
              style={{ color: '#000000', marginLeft: '10%' }}
              onPress={(e) => {
                setIsShowingFilters(!isShowingFilters)
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '80%',
            marginLeft: '10%',
            marginBottom: 20,
            marginTop: 5
          }}
        >
          {isShowingFilters && (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <DropDownPicker
                  items={categories}
                  setItems={setCateogries}
                  value={category}
                  setValue={setCategory}
                  open={openCategroy}
                  setOpen={setOpenCategory}
                  placeholder='Kategoria'
                  textStyle={{ fontSize: 14 }}
                  containerStyle={{ width: '50%', padding: 10 }}
                  dropDownContainerStyle={{
                    marginLeft: 10,
                    borderRadius: 0,
                    backgroundColor: '#e2e2e2'
                  }}
                  listMode='SCROLLVIEW'
                  style={{
                    backgroundColor: '#f1f1f1',
                    borderWidth: 0,
                    borderRadius: 0,
                    borderBottomWidth: 2
                  }}
                />
                <DropDownPicker
                  items={filters}
                  setItems={setFilters}
                  value={filter}
                  setValue={setFilter}
                  open={openFilter}
                  setOpen={setOpenFilter}
                  placeholder='Filtr'
                  listMode='SCROLLVIEW'
                  textStyle={{ fontSize: 14 }}
                  containerStyle={{ width: '50%', padding: 10 }}
                  dropDownContainerStyle={{
                    marginLeft: 10,
                    borderRadius: 0,
                    backgroundColor: '#e2e2e2'
                  }}
                  listMode='SCROLLVIEW'
                  style={{
                    backgroundColor: '#f1f1f1',
                    borderWidth: 0,
                    borderRadius: 0,
                    borderBottomWidth: 2
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: 'Karla_400Regular' }}>
                  Cena{' '}
                </Text>
                <TextInput
                  style={[
                    styles.defaultInput,
                    styles.shortInput,
                    {
                      width: 50
                    }
                  ]}
                  placeholder='0'
                />

                <Text style={{ fontSize: 16, fontFamily: 'Karla_400Regular' }}>
                  {' '}
                  do{' '}
                </Text>

                <TextInput
                  style={[
                    styles.defaultInput,
                    styles.shortInput,
                    {
                      width: 50,
                      paddingHorizontal: 12
                    }
                  ]}
                  placeholder='100'
                />
                <Text style={{ fontSize: 16, fontFamily: 'Karla_400Regular' }}>
                  {' '}
                  zł{' '}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          {offers.map((o) => (
            <OfferTile
              title={o.title}
              price={o.price}
              subtitle={o.kind}
              image={o.image}
              onSubtitleClick={() => {
                console.log('Do nothing cause ' + o.title)
              }}
              onTileClick={() => {
                navigation.navigate('OfferView')
              }}
              key={o.title}
            />
          ))}
        </View>
        <View
          style={{
            marginBottom: 50,
            marginTop: 25,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
          }}
        >
          <TouchableOpacity>
            <ArrowSmallLeftIcon
              style={{ color: '#000000' }}
              width='30'
              height='30'
            />
          </TouchableOpacity>
          <View style={{ width: '50%' }}></View>
          <TouchableOpacity>
            <ArrowSmallRightIcon
              style={{ color: '#000000' }}
              width='30'
              height='30'
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Viewport>
  )
}

const styles = StyleSheet.create({
  defaultInput: {
    fontFamily: 'Ubuntu_400Regular'
  },

  shortInput: {
    width: '90%',
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    height: 40,
    paddingHorizontal: 20
  }
})
