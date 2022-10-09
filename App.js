import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'

import { AuthView } from './views/AuthView.js'
import { HomeView } from './views/HomeView'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='AuthView'
            options={{ title: 'Auth' }}
            component={AuthView}
          />
          <Stack.Screen
            name='HomeView'
            options={{ title: 'Home' }}
            component={HomeView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  )
}
