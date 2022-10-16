
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

const serverResp = {
  items: [
    {title: "Perfumy męskie Calivin Klein", price: 130},
    {title: "Frytkownica Pyrex", price: 52},
    {title: "Kurtka męska zimowa L", price: 253},
    {title: "Kalesony sportowe", price: 43}
  ]
}

export function BuyView ({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active="Cart">
      <Text>Finalizacja Zakupu</Text>
    </Viewport>
  )
}
