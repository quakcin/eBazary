
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'


const serverResp = [
  {
    type: "Success", // Pomyślnie MY kupiliśmy
    hook: "1234",
    items: [
      {title: "Perfumy męskie Calivin Klein", price: 130},
      {title: "Frytkownica Pyrex", price: 52},
      {title: "Kurtka męska zimowa L", price: 253},
      {title: "Kalesony sportowe", price: 43}
    ],
    msg: `Dnia 12.02.2022 dokonałeś/aś zakupu od użytkownika TaniePerfumyPL - Janusz Kosalata - januszmail@gmail.com `
  },
  {
    type: "Fail", // Nie udało się kupić
    hook: "4321",
    items: [
      {title: "Perfumy męskie Calivin Klein", price: 130},
      {title: "Frytkownica Pyrex", price: 52},
      {title: "Kurtka męska zimowa L", price: 253},
      {title: "Kalesony sportowe", price: 43}
    ],
    msg: `Próba dokonania zakupu od użytkownika - Janusz Kosalata - januszmail@gmail.com nie powiodła się. Płatność odrzucona!`
  },
  {
    type: "New", // Ktoś od nas kupił
    hook: "1243",
    items: [
      {title: "Perfumy męskie Calivin Klein", price: 130},
      {title: "Frytkownica Pyrex", price: 52},
      {title: "Kurtka męska zimowa L", price: 253},
      {title: "Kalesony sportowe", price: 43}
    ],
    msg: `Dnia 03.07.2019 użytkownik Alicja2003 dokonała u ciebie zakupu.`
  }
];


export function TransactionDetailsView ({ navigation }) {
  const tw = useTailwind()
  return (
    <Viewport navigation={navigation} active="Cart">
      <Text>Szczeguły Zakupu</Text>
    </Viewport>
  )
}
