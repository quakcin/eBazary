
// Szatanie, panie zniszczenia gwiazdo zaranna, dopomusz
// Szatanie, panie zniszczenia gwiazdo zaranna, dopomusz
// Szatanie, panie zniszczenia gwiazdo zaranna, dopomusz
// Szatanie, panie zniszczenia gwiazdo zaranna, dopomusz
// Szatanie, panie zniszczenia gwiazdo zaranna, dopomusz
// Szatanie, panie zniszczenia gwiazdo zaranna, dopomusz

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartView } from '../views/CartView';
import { HomeView } from '../views/HomeView';
import { NewOfferView } from '../views/NewOfferView';
import { BellView } from '../views/BellView';
import { ProfileView } from '../views/ProfileView';
import { OfferView } from '../views/OfferView';
import { BellIcon, PlusIcon, ShoppingBagIcon, ShoppingCartIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { Button } from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { HeaderBackButton, HeaderShownContext } from '@react-navigation/elements';
import { DrawerToggleButton } from '@react-navigation/drawer';


const Tab = createBottomTabNavigator();
const __doShowLabel = true;

export default function ({route, navigation}) // won't work anyways
{
  return (
    <Tab.Navigator
      initialRouteName='HomeView'
      tabBarOptions={{ showLabel: __doShowLabel }}
    >
      <Tab.Screen
        name="CartView"
        component={CartView}
        options=
        {{
          headerTitle: 'Mój Koszyk',
          tabBarLabel: 'Koszyk',
          tabBarIcon: ({color, size}) => (
            <ShoppingCartIcon style={{color: '#000000'}} width={30} height={30}/>
          ),
          headerLeft: () => (
            <DrawerToggleButton
              onPress={(e, o = navigation) => o.openDrawer()}
            />
          )
        }}
        initialParams={{ userId: route.params.userId }}
      />
      <Tab.Screen
        name="NewOfferView"
        component={NewOfferView}
        options=
        {{
          headerTitle: 'Dodaj Nową Ofertę',
          tabBarLabel: 'Spzrzedaj',
          tabBarIcon: ({color, size}) => (
            <PlusIcon style={{color: '#000000'}} width={30} height={30}/>
          ),
          headerLeft: () => (
            <DrawerToggleButton
              onPress={(e, o = navigation) => o.openDrawer()}
            />
          )
        }}
        initialParams={{ userId: route.params.userId }}
      />
      <Tab.Screen
        name="HomeView"
        component={HomeView}
        options=
        {{
          headerShown: false,
          tabBarLabel: 'eBazary',
          tabBarIcon: ({color, size}) => (
            <ShoppingBagIcon style={{color: '#000000'}} width={30} height={30}/>
          )
        }}
        initialParams={{ userId: route.params.userId }}
      />
      <Tab.Screen
        name="BellView"
        component={BellView}
        options=
        {{
          headerTitle: 'Centrum Powiadomień',
          tabBarLabel: 'Notify',
          tabBarIcon: ({color, size}) => (
            <BellIcon style={{color: '#000000'}} width={30} height={30}/>
          ),
          headerLeft: () => (
            <DrawerToggleButton
              onPress={(e, o = navigation) => o.openDrawer()}
            />
          )
        }}
        initialParams={{ userId: route.params.userId }}
      />

      <Tab.Screen
        name="ProfileView"
        component={ProfileView}
        options=
        {{
          headerTitle: 'Mój Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({color, size}) => (
            <UserCircleIcon style={{color: '#000000'}} width={30} height={30}/>
          ),
          headerLeft: () => (
            <DrawerToggleButton
              onPress={(e, o = navigation) => o.openDrawer()}
            />
          )
        }}
        initialParams={{ userId: route.params.userId }}
      />

      <Tab.Screen
        name='OfferView'
        options=
        {{
          tabBarButton: (props) => null,
          headerLeft: () => (
            <HeaderBackButton
              onPress={(e, o = navigation) => o.navigate('HomeView')}
            />
          )
        }}
        component={OfferView}

      />


    </Tab.Navigator>
  )
}