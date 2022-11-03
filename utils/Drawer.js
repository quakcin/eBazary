import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import { AuthView } from '../views/AuthView'
import { BellView } from '../views/BellView'
import { CartView } from '../views/CartView'
import { EditProfileView } from '../views/EditProfileView'
import { HomeView } from '../views/HomeView'
import { MyOffersView } from '../views/MyOffersView'
import { MyShoppingView } from '../views/MyShoppingView'
import { NewOfferView } from '../views/NewOfferView'
import { PasswordCtlView } from '../views/PasswordCtlView'
import { ProfileView } from '../views/ProfileView'
import { Karla_400Regular, useFonts } from '@expo-google-fonts/karla'
import { Text, View } from 'react-native'
import { Colors } from './Colors'

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })

  if (!fontsLoaded) return null

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        minHeight: '100%'
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            height: '90%'
          }}
        >
          <DrawerItemList {...props} />
        </View>
        <View
          style={{
            height: '10%'
          }}
        >
          <DrawerItem
            label={() => (
              <Text style={{ color: '#FFF', fontFamily: 'Karla_400Regular' }}>
                Wyloguj się
              </Text>
            )}
            onPress={() => alert('Logged out')}
            style={{
              backgroundColor: '#616161'
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

export default function () {
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })

  if (!fontsLoaded) return null

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName='HomeView'
      backBehavior='history'
      screenOptions={{
        drawerActiveBackgroundColor: Colors.buttons,
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        },
        drawerStyle: {
          backgroundColor: '#F1F1F1'
        },
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: Colors.dark
      }}
    >
      <Drawer.Screen
        name='CartView'
        options={{
          title: 'Mój Koszyk',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={CartView}
        onPress={() => {
          this.navigate('CardView')
        }}
      />
      <Drawer.Screen
        name='NewOfferView'
        options={{
          title: 'Dodaj Ofertę',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={NewOfferView}
      />
      <Drawer.Screen
        name='HomeView'
        options={{
          title: 'Home',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={HomeView}
      />
      <Drawer.Screen
        name='BellView'
        options={{
          title: 'Powiadomienia',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
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
        options={{
          title: 'Moje zakupy',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={MyShoppingView}
      />
      <Drawer.Screen
        name='MyOffersView'
        options={{
          title: 'Moje Oferty',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={MyOffersView}
      />
      <Drawer.Screen
        name='EditProfileView'
        options={{
          title: 'Edycja profilu',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={EditProfileView}
      />
      <Drawer.Screen
        name='PassCtrlView'
        options={{
          title: 'Zmiana hasła',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={PasswordCtlView}
      />
    </Drawer.Navigator>
  )
}
