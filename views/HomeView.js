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
import servRequest from '../utils/Server';

import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  FunnelIcon
} from 'react-native-heroicons/outline'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from '../utils/Colors'

const Drawer = createDrawerNavigator()

export function HomeView({ route, navigation }) {
  const tw = useTailwind()

  const [offers, setOffers] = useState([])
  const [isShowingFilters, setIsShowingFilters] = useState(false)
  const [category, setCategory] = useState('')
  const [filter, setFilter] = useState('')
  const [openCategroy, setOpenCategory] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const [query, setQuery] = useState('');

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

  const perfSearch = (custom = null) => 
  {
    setOffers([]);
    servRequest
    (
      'search',
      {
        page: page,
        query: custom !== null ? custom : query,
      },
      (s) => 
      {
        setOffers(s.offers);
        setPageCount(s.pages)
        // console.log(s.offers);
      },
      (e) =>
      {
        console.log('error', JSON.stringify(e));
      }
    )
  }

  useEffect(() => 
  {
    perfSearch();
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
            value={query}
            onChangeText={(txt) => 
            {
              setQuery(txt);
              perfSearch(txt); /* FIXED: EB1-I12 */
            }}
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
                    borderRadius: 10,
                    borderWidth: 0,
                    backgroundColor: Colors.background
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
                    borderRadius: 10,
                    borderWidth: 0,
                    backgroundColor: Colors.background
                  }}
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
          {offers.filter((n) => Object.keys(n).includes('title')).map((o) => (
            <OfferTile
              title={o.title}
              price={o.price}
              subtitle={o.kind}
              image={o.thumb}
              onSubtitleClick={() => {
                console.log('Do nothing cause ' + o.title)
              }}
              onTileClick={(n) => {
                // console.log('navigation to offerId: ', o.offerId);
                navigation.navigate('OfferView', {offerId: o.offerId})
              }}
              key={o.offerId}
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
          <TouchableOpacity onPress={(e) => {
            if (page <= 0)
              return;
            setPage(page - 1);
            perfSearch();
          }}>
            <ArrowSmallLeftIcon
              style={{ color: page <= 0 ? '#ffffff' : '#000000' }} /* EB1-I11 */
              width='30'
              height='30'
            />
          </TouchableOpacity>
          <View style={{ width: '50%' }}></View>
          <TouchableOpacity onPress={(e) => {
            if (page >= pageCount)
              return;
            setPage(page + 1);
            perfSearch();
          }}>
            <ArrowSmallRightIcon
              style={{ color: page >= pageCount ? '#ffffff' : '#000000' }} /* EB1-I11 */
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
