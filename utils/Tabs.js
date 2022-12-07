
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


const Tab = createBottomTabNavigator();

export default function ({route, params}) // won't work anyways
{
  return (
    <Tab.Navigator
      initialRouteName='HomeView'
    >
      <Tab.Screen
        name="CartView"
        component={CartView}
        options={{
          tabBarLabel: 'Koszyk'
        }}
        initialParams={{ userId: route.params.userId }}
      />
      <Tab.Screen
        name="NewOfferView"
        component={NewOfferView}
        options={{
          tabBarLabel: 'Sprzedaj'
        }}
        initialParams={{ userId: route.params.userId }}
      />
      <Tab.Screen
        name="HomeView"
        component={HomeView}
        options={{ tabBarLabel: 'Bazary' }}
        initialParams={{ userId: route.params.userId }}
      />
      <Tab.Screen
        name="BellView"
        component={BellView}
        options={{
          tabBarLabel: 'Dzwonek'
        }}
        initialParams={{ userId: route.params.userId }}
      />

      <Tab.Screen
        name="ProfileView"
        component={ProfileView}
        options={{
          tabBarLabel: 'Mój Profil'
        }}
        initialParams={{ userId: route.params.userId }}
      />

      <Tab.Screen
        name='OfferView'
        options={{
          tabBarButton: (props) => null,
        }}
        component={OfferView}
      />


    </Tab.Navigator>
  )
}