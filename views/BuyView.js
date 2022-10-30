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

const serverResp = {
  items: [
    { name: 'Perfumy męskie Calivin Klein', price: 130 },
    { name: 'Frytkownica Pyrex', price: 52 },
    { name: 'Kurtka męska zimowa L', price: 253 },
    { name: 'Kalesony sportowe', price: 43 }
  ]
}

export function BuyView({ navigation }) {
  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular
  })

  const tw = useTailwind()

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
        <View style={{ marginTop: 25 }}>{genItemList(serverResp.items)}</View>
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
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: Colors.dark
              }}
              dropdownStyles={{
                borderRadius: 0,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: Colors.dark
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
            marginTop: 10
          }}
          onPress={() => console.log('Płacenie...')}
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
    backgroundColor: 'white',
    fontFamily: 'Ubuntu_400Regular'
  },

  shortInput: {
    borderWidth: 2,
    height: 40,
    borderColor: Colors.dark,
    paddingHorizontal: 20
  }
})
