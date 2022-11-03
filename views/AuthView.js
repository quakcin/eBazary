import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Colors } from '../utils/Colors'
import {
  useFonts,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'

export function AuthView({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular
  })

  if (!fontsLoaded) return null

  return (
    <ScrollView
      style={{
        marginTop: '12%',
        padding: 20,
        backgroundColor: Colors.background,
        paddingTop: 50
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: '10%' }}>
        <View style ={{alignItems: 'center', height: 210, width: 210, backgroundColor: '#c46060',  borderRadius: 300, paddingTop: 45}}>
          <AutoHeightImage
            width={180}
            style={styles.image}
            source={{ uri: 'https://i.postimg.cc/9fW1Sg1Y/clipart323390.png' }}
          />
        </View>
        <View style={{ marginTop: 80, width: '100%', alignItems: 'center' }}>
          <View style={{ width: '80%' }}>
            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(email) => setEmail(email)}
              placeholder='Nazwa użytkownika'
            />
          </View>

          <View style={{ width: '80%' }}>
            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(password) => setPassword(password)}
              placeholder='Hasło'
              secureTextEntry={true}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: Colors.buttons,
            paddingHorizontal: 45,
            paddingVertical: 10,
            alignItems: 'center',
            marginTop: 60,
            width: '80%'
          }}
          onPress={() => {
            navigation.replace('Drawer')
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: '400',
              fontFamily: 'Karla_400Regular'
            }}
          >
            Zaloguj
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateAccountView')
          }}
        >
          <Text style={styles.createAccount}>
            Jeśli nadal nie posiadasz konta w naszym serwisie, możesz je założyć
            <Text style={[styles.createAccount, { color: Colors.reddish }]}>
              {' '}
              tutaj.
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  defaultInput: {
    marginTop: 20,
    fontFamily: 'Ubuntu_400Regular',
    borderRadius: 5
  },

  shortInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    height: 40,
    paddingHorizontal: 20
  },

  image: {
    marginBottom: '15%',
    marginLeft: '5%'
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20
  },

  createAccount: {
    margin: 40,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Karla_400Regular'
  }
})
