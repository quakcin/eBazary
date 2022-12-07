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
import Tabs from './Tabs'
import { useEffect, useState } from 'react'

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
            onPress={() => props.navigation.replace("AuthView")}
            style={{
              backgroundColor: '#616161'
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  )
}


const RouterScreen = function ({ navigation, route })
{
    navigation.navigate(route.params.reroute, route.params);
    return (
    <View>
      <Text>Please wait..</Text>
    </View>
  )
}

export default function MainDrawer ({ navigation, route}) 
{
  let [fontsLoaded] = useFonts({
    Karla_400Regular
  })

  if (!fontsLoaded) return null

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={'HomeView' }
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
        name='HomeViewDrawer'
        options={{
          title: 'eBazary',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={Tabs}
        initialParams = {{ userId: route.params.userId }}
      />
      <Drawer.Screen
        name='CartViewRouter'
        options={{
          title: 'Mój Koszyk',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={RouterScreen}
        initialParams = {{ userId: route.params.userId, reroute: 'CartView' }}
      />
      <Drawer.Screen
        name='NewOfferViewRouter'
        options={{
          title: 'Dodaj Ofertę',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={RouterScreen}
        initialParams = {{ userId: route.params.userId, reroute: 'NewOfferView' }}
      />


      <Drawer.Screen
        name='BellViewRouter'
        options={{
          title: 'Powiadomienia',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={RouterScreen}
        initialParams = {{ userId: route.params.userId, reroute: 'BellView' }}
      />


      {fontsLoaded ? (
        <Drawer.Screen
          name='ProfileViewRouter'
          options={{
            title: 'Mój Profil',
            headerTitleStyle: {
              fontFamily: 'Karla_400Regular'
            }
          }}
          component={RouterScreen}
          initialParams = {{ userId: route.params.userId, reroute: 'ProfileView' }}
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
        initialParams = {{ userId: route.params.userId }}
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
        initialParams = {{ userId: route.params.userId}}
      />
      {/* <Drawer.Screen
        name='EditProfileView'
        options={{
          title: 'Edycja profilu',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={EditProfileView}
        initialParams = {{ userId: route.params.userId }}
      /> */}

      <Drawer.Screen
        name='EditProfileRouter'
        options={{
          title: 'Edytuj Profil',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={RouterScreen}
        initialParams = {{ userId: route.params.userId, reroute: 'EditProfileView' }}
      />

      <Drawer.Screen
        name='PassCtlRouter'
        options={{
          title: 'Zmień Hasło',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={RouterScreen}
        initialParams = {{ userId: route.params.userId, reroute: 'PassCtrlView' }}
      />

      {/* <Drawer.Screen
        name='PassCtrlView'
        options={{
          title: 'Zmiana hasła',
          headerTitleStyle: {
            fontFamily: 'Karla_400Regular'
          }
        }}
        component={PasswordCtlView}
        initialParams = {{ userId: route.params.userId }}
      /> */}



    </Drawer.Navigator>
  )
}


