import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Colors } from '../utils/Colors'
import { Viewport } from '../utils/Viewport'
import Constants from 'expo-constants'

import servRequest from '../utils/Server'

export function CreateAccountView({ navigation }) {
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [mail, setMail] = useState('')
  const [isChecked, setChecked] = useState(false)
  const [surname, setSurname] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const hasUnsavedChanges = Boolean(true)

  const onRegister = function (e)
  {
    servRequest
    (
      'register', 
      {
        username: user,
        password: password1,
        mail: mail,
        name: name,
        surname: surname
      },
      (s) => 
      {
        
        Alert.alert(
          "Rejestracja",
          "Dodano nowe konto!\n Zaloguj się.",
          [
            { text: "OK", onPress: navigation.navigate("AuthView") }
          ]
        );
      },
      (e) => 
      {
        Alert.alert(
          "Błąd rejestracji!",
          e.msg,
          [
            { text: "OK" }
          ]
        );
      }
    );
  }

  /*React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return
        }
        e.preventDefault()
        Alert.alert(
          'Czy chcesz przerwać rejestrację?',
          'Posiadasz niezapisane dane, jeżeli przerwiesz proces rejestracji Twoje konto nie zostanie utworzone!',
          [
            { text: 'Nie, pozostań', style: 'cancel', onPress: () => {} },
            {
              text: 'Tak, anuluj',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action)
            }
          ]
        )
      }),
    [navigation, hasUnsavedChanges]
  )*/

  return (
    <ScrollView style={{ backgroundColor: 'white', }}>
      <ImageBackground source={require('./../assets/prop2.png')} resizeMode="cover" style={{flex: 1, justifyContent: "center", width: "100%", height: "100%"}}>
        <View style={{ alignItems: 'center', marginTop: '50%' }}>
          <View style={{ width: '82%', alignItems: 'center' }}>
            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(txt) => setName(txt)}
              placeholder='Imię'
            />

            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(txt) => setSurname(txt)}
              placeholder='Nazwisko'
            />

            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(txt) => setUser(txt)}
              placeholder='Nazwa użytkownika'
            />

            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(txt) => setMail(txt)}
              placeholder='Adres e-mail'
            />

            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(txt) => setPassword1(txt)}
              placeholder='Hasło'
              secureTextEntry={true}
            />

            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={(txt) => setPassword2(txt)}
              placeholder='Powtórz hasło'
              secureTextEntry={true}
            />
          </View>
          <View style={styles.checkboxWrapper}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? Colors.buttons : undefined}
            />
            <Text style={styles.info}>Akceptuję regulamin serwisu.</Text>
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: Colors.buttons,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 15,
                width: '60%'
              }}
              onPress={() => onRegister() }
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular'
                }}
              >
                Zarejestruj się
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <Text style={styles.info}>
              Jeżeli posiadasz już konto kliknij
              <Text
                style={[styles.info, { color: Colors.buttons }]}
                onPress={() => {
                  navigation.navigate('AuthView')
                }}
              >
                {' '}
                tutaj.{' '}
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
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
    width: '90%',
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    paddingHorizontal: 20
  },

  info: {
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 25,
    fontFamily: 'Karla_400Regular'
  },
  buttonArea: {
    width: '100%',
    alignItems: 'center'
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 15,
    justifyContent: 'center'
  }
})
