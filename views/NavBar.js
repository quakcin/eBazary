
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export function NavBar ({ navigation })
{
  return (
    <View>
      <Button
        title = "Dom"
        onPress={ () => navigation.navigate('HomeView')}
      />
      <Button
        title = "Logowanie"
        onPress={ () => navigation.navigate('AuthView')}
      /> 
    </View>
  )
}