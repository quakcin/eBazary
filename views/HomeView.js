import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn'

import { NavBar } from './NavBar.js'

export function HomeView({ navigation }) {
  const tw = useTailwind()

  return (
    <View style={tw('bg-red-500')}>
      <NavBar navigation={navigation} />
    </View>
  )
}
