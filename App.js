import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'
import { AuthView } from './views/AuthView.js'
import { OfferView } from './views/OfferView'
import { BuyView } from './views/BuyView'
import { TransactionDetailsView } from './views/TransactionDetailsView'
import { Karla_400Regular, useFonts } from '@expo-google-fonts/karla'
import Drawer from './utils/Drawer'

const Stack = createStackNavigator()

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })

  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ animation: 'none' }}
          initialRouteName='AuthView'
        >
          <Stack.Screen
            name='Drawer'
            options={{ headerShown: false }}
            component={Drawer}
          />

          <Stack.Screen
            name='AuthView'
            options={{
              title: 'Auth',
              headerShown: false
            }}
            component={AuthView}
          />

          <Stack.Screen
            name='TransactionDetailsView'
            options={{ title: 'Szczegóły zakupu' }}
            initialParams={{ source: null }}
            component={TransactionDetailsView}
          />

          <Stack.Screen
            name='OfferView'
            options={{ title: 'Oferta' }}
            component={OfferView}
          />

          <Stack.Screen
            name='BuyView'
            options={{ title: 'Finalizacja zakupu' }}
            component={BuyView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  )
}
