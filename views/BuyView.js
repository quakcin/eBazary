
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native'
import { ArchiveBoxArrowDownIcon } from 'react-native-heroicons/outline'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import SelectList from 'react-native-dropdown-select-list'

const serverResp = {
  items: [
    {name: "Perfumy męskie Calivin Klein", price: 130},
    {name: "Frytkownica Pyrex", price: 52},
    {name: "Kurtka męska zimowa L", price: 253},
    {name: "Kalesony sportowe", price: 43}
  ]
}

export function BuyView ({ navigation }) {
  const tw = useTailwind()

  const genItemList = (items) => {

    const summedItems = [
      ...items.map((n) => { return {name: n.name, price: n.price, w: 'normal'} }), 
      {name: "RAZEM", price: items.map((n) => parseFloat(n.price)).reduce((sum = 0, n) => sum += n), w: 'bold'}
    ];

    return (
      <View>
      {summedItems.map((n) => (
        <View style={{width: '70%', marginLeft: '15%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 12, fontWeight: n.w}}>{n.name}</Text>
          </View>
          <View>
            <Text style={{fontSize: 12, fontWeight: n.w}}>{n.price}zł</Text>
          </View>
        </View>
      ))}
      </View>
    )
  }


  const [selected, setSelected] = useState("");
  const data = [
    {key:'pp', value: 'Poczta Polska'},
    {key:'pl', value: 'Kurier DPD'},
    {key:'ph', value: 'Kurier DHL'},
    {key:'pi', value: 'Paczkomat InPost'},
  ];

  return (
    <Viewport navigation={navigation} active="Cart">
      <ScrollView>
        <View style={{alignSelf: 'center', alignItems: 'center', marginTop: 25, borderRadius: 100, width: 70, height: 70, justifyContent: 'center', backgroundColor: 'white'}}>
          <ArchiveBoxArrowDownIcon
            style={{color: '#291a0c'}}
            width="40" height="40"
          />
        </View>
        <View style={{marginTop: 25}}>
          {genItemList(serverResp.items)}
        </View>
        <View style={{width: '80%', marginLeft: '10%', marginTop: 40}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <TextInput
              style={{
                flex: 1,
                padding: 5,
                backgroundColor: '#cfcfcf',
                marginRight: 15
              }}
              placeholder="Miasto"
            />
            <TextInput
              style={{
                padding: 5,
                width: 70,
                backgroundColor: '#cfcfcf'
              }}
              placeholder="Poczt."
            />
          </View>
          <View style={{padding: 10}}>
            <TextInput
              style={{
                padding: 5,
                backgroundColor: '#cfcfcf'
              }}
              placeholder="Adres"
            />
          </View>
          <View style={{padding: 10}}>
            <SelectList
              setSelected={setSelected} 
              data={data}
              search={false}
              placeholder = {"Rodzaj dostawy"}
              boxStyles={{borderRadius:0, backgroundColor: '#cfcfcf', borderWidth:0}}
              dropdownStyles={{borderRadius:0, backgroundColor: '#cfcfcf', borderWidth:0}}
            />
          </View>
        </View>
        <View style={{width: 150, alignSelf: 'center', marginVertical: 25}}>
          <Button title="Zapłać"/>
        </View>
      </ScrollView>
    </Viewport>
  )
}
