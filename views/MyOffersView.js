import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

export function MyOffersView({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active='Profile'>
      <Text>Moje Oferty</Text>
    </Viewport>
  )
}
