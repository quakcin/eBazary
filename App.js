import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'

import { AuthView } from './views/AuthView.js'
import { HomeView } from './views/HomeView'
import { CartView } from './views/CartView'
import { NewOfferView } from './views/NewOfferView'
import { BellView } from './views/BellView'
import { ProfileView } from './views/ProfileView'
import { OfferView } from './views/OfferView'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: 'none' }}>
          <Stack.Screen
            name='AuthView'
            options={{ title: 'Auth', headerShown: false }}
            component={AuthView}
          />
          <Stack.Screen
            name='CartView'
            options={{ title: 'Mój Koszyk' }}
            component={CartView}
          />
          <Stack.Screen
            name='NewOfferView'
            options={{ title: 'Dodaj Ofertę' }}
            component={NewOfferView}
          />
          <Stack.Screen
            name='HomeView'
            options={{ title: 'Home', headerShown: false }}
            component={HomeView}
          />
          <Stack.Screen
            name='BellView'
            options={{ title: 'Powiadomienia' }}
            component={BellView}
          />
          <Stack.Screen
            name='ProfileView'
            options={{ title: 'Mój Profil' }}
            component={ProfileView}
          />
          <Stack.Screen
            name='OfferView'
            options={{ title: 'Oferta' }}
            component={OfferView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  )
}
