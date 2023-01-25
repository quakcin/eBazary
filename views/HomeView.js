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
import { Dropdown } from 'react-native-element-dropdown'
import { useIsFocused } from '@react-navigation/native'

const Drawer = createDrawerNavigator()

export function HomeView({ route, navigation }) {

  const [offers, setOffers] = useState([])
  const [isShowingFilters, setIsShowingFilters] = useState(false)
  
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  
  const [filterVal, setFilter] = useState(null)
  const [kategoriaVal, setKategoria] = useState(null)
  const [pMin, setpMin] = useState('');
  const [pMax, setpMax] = useState('');

  const kategoria = [
    { label: 'Wszystkie', value: 'Wszystkie' },
    { label: 'Dom', value: 'Dom'},
    { label: 'Elektronika', value: 'Elektronika' },
    { label: 'Moda', value: 'Moda' },
    { label: 'Motoryzacja', value: 'Motoryzacja'},
    { label: 'Inne', value: 'Inne'}
  ];

  const filter = [
    { label: 'Trafność', value: 0 },
    { label: 'Ocena', value: 1 },
    { label: 'Oszczędnie', value: 2 },
    { label: 'Bogato', value: 3 }
  ]

  // fix drop down hooks
  let querying = null;

  const perfSearch = (custom = null, kind = null, cpMin = null, cpMax = null, cFilter = null) => 
  {
    const qr = custom !== null 
     ? custom 
      : query;

    setOffers([]);
    querying = qr;
    servRequest
    (
      'search',
      {
        page: page,
        query: qr,
        pmin: cpMin ?? (pMin === '' ? '0' : pMin),
        pmax: cpMax ?? (pMax === '' ? '9999999' : pMax),
        ordr: cFilter ?? (filterVal ?? 0),

        kind: kind ?? (kategoriaVal ?? 'Wszystkie')
      },
      (s) => 
      {
        // console.log(qr.substr(0, qr.length - 1), querying);
        if (qr == querying)
        {
          setOffers(s.offers);
          setPageCount(s.pages)
          // console.log(s.offers);
        }
      },
      (e) =>
      {
        console.log('error', JSON.stringify(e));
      }
    )
  }


  const isFocused = useIsFocused();

  useEffect(() => 
  {
    const searchStr = route.params.userSearch != null 
      ? `@${route.params.userSearch}` 
      : '';
    navigation.setParams({userId: route.params.userId, userSearch: null});

    perfSearch(searchStr);
  }, [isFocused])

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
                <Dropdown
                  style={{margin: 10, marginLeft: 0, height: 50, width: '40%', borderBottomWidth: 2}}
                  placeholderStyle={{fontSize: 14}}
                  selectedTextStyle={{fontSize: 14}}
                  containerStyle = {{backgroundColor: '#f1f1f1'}}
                  data={kategoria}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Kategoria"
                  value={kategoriaVal}
                  onChange={(item) => {
                    setKategoria(item.value);
                    // console.log('risen for', item.label)
                    setTimeout(() => {
                      // console.log('ovh', kategoriaVal)
                      perfSearch(query, item.value);
                    }, 100);
                  }}
                />
                <Dropdown
                  style={{margin: 10, marginLeft: '7%', height: 50, width: '40%', borderBottomWidth: 2}}
                  placeholderStyle={{fontSize: 14}}
                  selectedTextStyle={{fontSize: 14}}
                  containerStyle = {{backgroundColor: '#f1f1f1'}}
                  data={filter}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Filtr"
                  value={filterVal}
                  onChange={item => {
                    setFilter(item.value);
                    perfSearch(null, null, null, null, item.value)
                  }}
                />
                {/*<DropDownPicker
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
                />*/}
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
                  value={pMin}
                  onChangeText={(v) => {
                    setpMin(v);
                    perfSearch(null,null, v === '' ? '0' : v, null);
                  }}
                  keyboardType="numeric"
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
                  keyboardType="numeric"
                  value={pMax}
                  onChangeText={(v) => {
                    setpMax(v);
                    perfSearch(null,null, null, v === '' ? '0' : v);
                  }}
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
        <View style={{ alignItems: 'center', marginTop: 15}}>
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
                navigation.navigate('OfferView', {offerId: o.offerId, userId: route.params.userId})
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
            alignSelf: 'center',
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
