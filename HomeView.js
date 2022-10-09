

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavBar } from './NavBar.js';

export function HomeView ({ navigation })
{
  return (
    <View>
      <NavBar navigation={navigation}/>
    </View>
  )
}