import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthView } from './views/AuthView.js'
import { OfferView } from './views/OfferView'
import { BuyView } from './views/BuyView'
import { TransactionDetailsView } from './views/TransactionDetailsView'
import { Karla_400Regular, useFonts } from '@expo-google-fonts/karla'
import 'react-native-get-random-values'




// co?
import MainDrawer from './utils/Drawer'





import Tabs from './utils/Tabs'
import { CreateAccountView } from './views/CreateAccountView'
import ShowImage from './utils/ShowImage'
import { StatusBar } from 'expo-status-bar'

const Stack = createStackNavigator()

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })

  return (
    <>
      <StatusBar  barStyle="light-content" translucent={true} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ animation: 'none' }}
          initialRouteName='AuthView'
        >
          <Stack.Screen
            name='Cofnij'
            options={{
              headerShown: false,
              headerTitleStyle: {
                fontFamily: 'Karla_400Regular'
              }
            }}
            initialParams={{ userId: '', cartCounter: null }}
            component={MainDrawer}
          />

          <Stack.Screen
            name='AuthView'

            options={{
              title: 'Auth',
              headerShown: false,
              headerTitleStyle: {
                fontFamily: 'Karla_400Regular'
              }
            }}
            component={AuthView}
            initialParams={{ userId: '' }}
          />

          <Stack.Screen
            name='TransactionDetailsView'
            options={{
              title: 'Szczegóły zakupu',
              headerTitleStyle: {
                fontFamily: 'Karla_400Regular'
              }
            }}
            initialParams={{ source: null, userId: '' }}
            component={TransactionDetailsView}
          />
          <Stack.Screen
            name='BuyView'
            options={{
              title: 'Finalizacja zakupu',
              headerTitleStyle: {
                fontFamily: 'Karla_400Regular'
              }
            }}
            component={BuyView}
            initialParams={{ userId: '' }}
          />

          <Stack.Screen
            name='CreateAccountView'
            options={{
              headerShown: false,
              swipeEnabled: false,
              title: 'Rejestracja',
              headerTitleStyle: {
                fontFamily: 'Karla_400Regular'
              }
            }}
            component={CreateAccountView}
            initialParams={{ userId: '' }}
          />
          <Stack.Screen
            name='showImage'
            options={{ headerShown: false }}
            component={ShowImage}
            initialParams={{ userId: '' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
