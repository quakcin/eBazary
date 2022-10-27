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
import ShowImage from './utils/ShowImage'
import { BuyView } from './views/BuyView'
import { TransactionDetailsView } from './views/TransactionDetailsView'
import { MyShoppingView } from './views/MyShoppingView'
import { EditProfileView } from './views/EditProfileView'
import { PasswordCtlView } from './views/PasswordCtlView'
import { CreateAccountView } from './views/CreateAccountView'
import { MyOffersView } from './views/MyOffersView'
import { Karla_400Regular, useFonts } from '@expo-google-fonts/karla'

const Stack = createNativeStackNavigator()

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })

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

          {fontsLoaded ? (
            <Stack.Screen
              name='ProfileView'
              options={{
                title: 'Mój Profil',
                headerTitleStyle: {
                  fontFamily: 'Karla_400Regular'
                }
              }}
              component={ProfileView}
            />
          ) : (
            <></>
          )}

          <Stack.Screen
            name='OfferView'
            options={{ title: 'Oferta' }}
            component={OfferView}
          />
          <Stack.Screen
            name='showImage'
            options={{ headerShown: false }}
            component={ShowImage}
          />
          <Stack.Screen
            name='MyShoppingView'
            options={{ title: 'Moje zakupy' }}
            component={MyShoppingView}
          />
          <Stack.Screen
            name='MyOffersView'
            options={{ title: 'Moje Oferty' }}
            component={MyOffersView}
          />
          <Stack.Screen
            name='TransactionDetailsView'
            options={{ title: 'Szczegóły zakupu' }}
            initialParams={{ source: null }}
            component={TransactionDetailsView}
          />
          <Stack.Screen
            name='BuyView'
            options={{ title: 'Finalizacja zakupu' }}
            component={BuyView}
          />
          <Stack.Screen
            name='EditProfileView'
            options={{ title: 'Edycja profilu' }}
            component={EditProfileView}
          />
          <Stack.Screen
            name='PassCtrlView'
            options={{ title: 'Zmiana hasła' }}
            component={PasswordCtlView}
          />
          <Stack.Screen
            name='CreateAccountView'
            options={{ headerShown: false }}
            component={CreateAccountView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  )
}
