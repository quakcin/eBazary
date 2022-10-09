
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

export function BellView ({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active="Bell">
      <Text>Bell View</Text>
    </Viewport>
  )
}
