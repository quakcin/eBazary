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

export function AuthView({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ScrollView style={{ marginTop: '12%', padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: '10%' }}>
        <AutoHeightImage
          width={240}
          style={styles.image}
          source={{ uri: 'https://i.postimg.cc/9fW1Sg1Y/clipart323390.png' }}
        />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder='Nazwa użytkownika'
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder='Hasło'
            //placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.replace('Drawer')}
        >
          <Text style={{ fontSize: 18 }}>ZALOGUJ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: '15%' }}
          onPress={() => {
            navigation.navigate('CreateAccountView')
          }}
        >
          <Text style={styles.createAccount}>
            Jeśli nadal nie posiadasz konta w naszym serwisie, możesz je założyć
            <Text style={[styles.createAccount, { color: '#b8215b' }]}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: {
    marginBottom: '15%',
    marginLeft: '5%'
  },

  inputView: {
    backgroundColor: '#bfbfbf',
    width: '80%',
    height: 45,
    margin: 20
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20
  },

  createAccount: {
    margin: 40,
    textAlign: 'center',
    fontSize: 16
  },

  loginBtn: {
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#bfbfbf'
  }
})
