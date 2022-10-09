import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn/dist'

export function AuthView({ navigation }) {
  const tw = useTailwind()

  return (
    <View style={tw('mt-10')}>
      <Button title='Zaloguj' onPress={() => navigation.navigate('HomeView')} />
    </View>
  )
}
