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
  Alert
} from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Colors } from '../utils/Colors'
import { Viewport } from '../utils/Viewport'

export function CreateAccountView({ navigation }) {
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [mail, setMail] = useState('')
  const [isChecked, setChecked] = useState(false)
  const [surname, setSurname] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const hasUnsavedChanges = Boolean(true)

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault()

        // Prompt the user before leaving the screen
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
  )

  return (
    <ScrollView style={{ marginTop: '12%', padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: '10%' }}>
        <AutoHeightImage
          source={{ uri: 'https://i.postimg.cc/9fW1Sg1Y/clipart323390.png' }}
          width={130}
          style={{ marginBottom: 10 }}
        />
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
              width: '80%'
            }}
            onPress={() => console.log('Register...')}
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
