import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn'

import { ShoppingBagIcon } from "react-native-heroicons/outline";

import { NavBar } from './NavBar.js'

export function HomeView({ navigation }) {
  const tw = useTailwind()

  return (
    <View style={tw('bg-red-500')}>
      <Text>
        Hello World
      </Text>
      <ShoppingBagIcon width={100} height={100} style={tw('text-black')}/>
      <NavBar navigation={navigation} />
    </View>
  )
}
