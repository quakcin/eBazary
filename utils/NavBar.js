import { View, Text } from 'react-native'
import React from 'react'
import {
  ShoppingCartIcon,
  PlusIcon,
  ShoppingBagIcon,
  BellIcon,
  UserCircleIcon
} from 'react-native-heroicons/outline'
import { useTailwind } from 'tailwind-rn'

const NavBar = ({ navigation, active }) => {
  const tw = useTailwind()

  const colors =
  {
    Cart: '', NewOffer: '', Home: '', Bell: '', Profile: ''
  }

  Object.keys(colors).map((v) => colors[v] = '#393939');
  colors[active] = '#d62f64';

  return (
    <View style={tw('justify-around flex flex-row w-full bg-white p-3')}>

      <ShoppingCartIcon 
        style={tw(`text-[${colors.Cart}]`)} 
        width={30} height={30} 
        onPress={() => navigation.navigate('CartView')}
      />

      <PlusIcon 
        style={tw(`text-[${colors.NewOffer}]`)} 
        width={30} height={30} 
        onPress={() => navigation.navigate('NewOfferView')}
      />

      <ShoppingBagIcon
        style={tw(`text-[${colors.Home}]`)}
        width={30} height={30}
        onPress={() => navigation.navigate('HomeView')}
      />

      <BellIcon 
        style={tw(`text-[${colors.Bell}]`)} 
        width={30} height={30} 
        onPress={() => navigation.navigate('BellView')}
      />

      <UserCircleIcon
        style={tw(`text-[${colors.Profile}]`)}
        width={30} height={30}
        onPress={() => navigation.navigate('ProfileView')}
      />
    </View>
  )
}

export default NavBar
