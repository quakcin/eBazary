
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export function AuthView ({ navigation })
{
  return (
    <View>
      <Button
        title = "Zaloguj"
        onPress={ () => navigation.navigate('HomeView')}
      />
    </View>  
  )
}