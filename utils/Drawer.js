import { createDrawerNavigator } from '@react-navigation/drawer'
import { EditProfileView } from '../views/EditProfileView'
import { MyOffersView } from '../views/MyOffersView'
import { AuthView } from '../views/AuthView'

const Drawer = createDrawerNavigator()

export default function () {
  return (
    <Drawer.Navigator initialRouteName='AuthView'>
      <Drawer.Screen name='EditProfileView' component={EditProfileView} />
      <Drawer.Screen name='MyOffersView' component={MyOffersView} />
    </Drawer.Navigator>
  )
}
