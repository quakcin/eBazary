
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import Constants from 'expo-constants'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn'

import NavBar from './NavBar'

export function Viewport ({ children, navigation, active, isFullScreen = false })
{
  return (
    <SafeAreaView style={{flex: 1, marginTop: isFullScreen ? Constants.statusBarHeight : 0}}>
      <View style={{flex: 1}}>
        {children}
      </View>
      <NavBar navigation={navigation} active={active}/>
    </SafeAreaView>
  )
}