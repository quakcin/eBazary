
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn'

import NavBar from './NavBar'

export function Viewport ({ children, navigation, active })
{
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {children}
      </View>
      <NavBar navigation={navigation} active={active}/>
    </View>
  )
}