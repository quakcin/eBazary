import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn'

import { ShoppingBagIcon } from 'react-native-heroicons/outline'

import NavBar from '../utils/NavBar'

export function HomeView({ navigation }) {
  const tw = useTailwind()

  return (
    <>
      <View style={tw('bg-yellow-500 h-full justify-between px-5 py-5')}>
        <Text>Hello World</Text>
        <ShoppingBagIcon width={100} height={100} style={tw('text-black')} />
      </View>
      <NavBar navigation={navigation} />
    </>
  )
}
