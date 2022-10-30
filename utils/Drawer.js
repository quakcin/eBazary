import { createDrawerNavigator } from '@react-navigation/drawer'
import { AuthView } from '../views/AuthView'
import { BellView } from '../views/BellView'
import { BuyView } from '../views/BuyView'
import { CartView } from '../views/CartView'
import { CreateAccountView } from '../views/CreateAccountView'
import { EditProfileView } from '../views/EditProfileView'
import { HomeView } from '../views/HomeView'
import { MyOffersView } from '../views/MyOffersView'
import { MyShoppingView } from '../views/MyShoppingView'
import { NewOfferView } from '../views/NewOfferView'
import { PasswordCtlView } from '../views/PasswordCtlView'
import { ProfileView } from '../views/ProfileView'
import { Karla_400Regular, useFonts } from '@expo-google-fonts/karla'

const Drawer = createDrawerNavigator()

export default function () {
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })

  if (!fontsLoaded) return null

  return (
    <Drawer.Navigator initialRouteName='HomeView' backBehavior='history'>
      <Drawer.Screen
        name='AuthView'
        options={{ title: 'Auth', headerShown: false, swipeEnabled: false }}
        component={AuthView}
      />
      <Drawer.Screen
        name='CartView'
        options={{ title: 'Mój Koszyk' }}
        component={CartView}
        onPress={() => {
          this.navigate('CardView')
        }}
      />
      <Drawer.Screen
        name='NewOfferView'
        options={{ title: 'Dodaj Ofertę' }}
        component={NewOfferView}
      />
      <Drawer.Screen
        name='HomeView'
        options={{ title: 'Home', headerShown: false }}
        component={HomeView}
      />
      <Drawer.Screen
        name='BellView'
        options={{ title: 'Powiadomienia' }}
        component={BellView}
      />

      {fontsLoaded ? (
        <Drawer.Screen
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
      <Drawer.Screen
        name='MyShoppingView'
        options={{ title: 'Moje zakupy' }}
        component={MyShoppingView}
      />
      <Drawer.Screen
        name='MyOffersView'
        options={{ title: 'Moje Oferty' }}
        component={MyOffersView}
      />
      <Drawer.Screen
        name='EditProfileView'
        options={{ title: 'Edycja profilu' }}
        component={EditProfileView}
      />
      <Drawer.Screen
        name='PassCtrlView'
        options={{ title: 'Zmiana hasła' }}
        component={PasswordCtlView}
      />
      <Drawer.Screen
        name='CreateAccountView'
        options={{
          headerShown: false,
          swipeEnabled: false,
          title: 'Rejestracja'
        }}
        component={CreateAccountView}
      />
    </Drawer.Navigator>
  )
}
