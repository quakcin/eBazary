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

const NavBar = ({ navigation }) => {
  const tw = useTailwind()

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch'}}>
      <ShoppingCartIcon style={tw('text-[#393939]')} width={30} height={30} />
      <PlusIcon style={tw('text-[#393939]')} width={30} height={30} />
      <ShoppingBagIcon
        style={tw('text-[#393939]')}
        width={30}
        height={30}
        onPress={() => navigation.navigate('HomeView')}
      />
      <BellIcon style={tw('text-[#393939]')} width={30} height={30} />
      <UserCircleIcon
        style={tw('text-[#393939]')}
        width={30}
        height={30}
        onPress={() => navigation.navigate('AuthView')}
      />
    </View>
  )
}

export default NavBar
