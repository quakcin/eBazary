
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
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
import { EditProfileView } from '../views/EditProfileView';
import { PasswordCtlView } from '../views/PasswordCtlView';

import { useState, useEffect } from 'react';
import servRequest from './Server';
import { color } from 'react-native-reanimated';
import { Colors } from './Colors';


const Tab = createBottomTabNavigator();
const __doShowLabel = true;


export default function ({route, navigation}) // won't work anyways
{
  const [cartItemCount, setCartItemCount] = useState([]);

  useEffect(() => {
    // console.log('mount');
    setInterval(() => {
      servRequest
      (
        "getCart",
        {
          userId: route.params.userId
        },
        (s) => {
          const list = s.offers;
          list.pop();
          setCartItemCount(list);
        },
        (e) => {
        }
      )
      // setCartItemCount(cartItemCount + 1);
    }, 500);
    return () => {
      // console.log('umount!');
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='HomeView'
      screenOptions=
      {{ 
        showLabel: __doShowLabel,
        tabBarActiveTintColor: '#d9144b'
      }}
    >
      <Tab.Screen
        name="CartView"
        component={CartView}
        options = {{
          headerTitle: 'Mój Koszyk',
          tabBarLabel: 'Koszyk',
          tabBarIcon: ({color, size}) => (
            <ShoppingCartIcon style={{color: color}} width={30} height={30}/>
            ),
          headerLeft: () => (
            <DrawerToggleButton
              onPress={(e, o = navigation) => o.openDrawer()}
            />
          ),
          tabBarBadge: cartItemCount.length,
          tabBarBadgeStyle: { backgroundColor: Colors.reddish }          
        }}
        initialParams={{ userId: route.params.userId }}
      />
      <Tab.Screen
        name="NewOfferView"
        component={NewOfferView}
        options=
        {{
          headerTitle: 'Dodaj Nową Ofertę',
          tabBarLabel: 'Sprzedaj',
          tabBarIcon: ({color, size}) => (
            <PlusIcon style={{color: color}} width={30} height={30}/>
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
            <ShoppingBagIcon style={{color: color}} width={30} height={30}/>
          )
        }}
        initialParams={{ userId: route.params.userId, userSearch: null }}
      />
      <Tab.Screen
        name="BellView"
        component={BellView}
        options=
        {{
          headerTitle: 'Centrum Powiadomień',
          tabBarLabel: 'Reakcje',
          tabBarIcon: ({color, size}) => (
            <BellIcon style={{color: color}} width={30} height={30}/>
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
            <UserCircleIcon style={{color: color}} width={30} height={30}/>
          ),
          headerLeft: () => (
            <DrawerToggleButton
              onPress={(e, o = navigation) => o.openDrawer()}
            />
          )
        }}
        initialParams={{ userId: route.params.userId, profileOverride: route.params.profileOverride }}
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
        initialParams={route.params}
      />

      <Tab.Screen
        name='EditProfileView'
        options=
        {{
          headerTitle: 'Edytuj profil',
          tabBarButton: (props) => null,
          headerLeft: () => (
            <HeaderBackButton
              onPress={(e, o = navigation) => o.navigate('ProfileView')}
            />
          )
        }}
        component={EditProfileView}
        initialParams={route.params}
      />


      <Tab.Screen
        name='PassCtrlView'
        options=
        {{
          headerTitle: 'Zmiana hasła',
          tabBarButton: (props) => null,
          headerLeft: () => (
            <HeaderBackButton
              onPress={(e, o = navigation) => o.navigate('EditProfileView')}
            />
          )
        }}
        component={PasswordCtlView}
        initialParams={route.params}
      />

    </Tab.Navigator>
  )
}