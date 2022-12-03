import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Colors } from '../utils/Colors'
import { Viewport } from '../utils/Viewport'
import servRequest from '../utils/Server';

export function PasswordCtlView({ route, navigation }) {
  const tw = useTailwind()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  return (
    <Viewport navigation={navigation} active='ProfileView'>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={[styles.defaultInput, styles.shortInput]}
            onChangeText={(txt) => setCurrentPassword(txt)}
            placeholder='Aktualne Hasło'
            secureTextEntry={true}
          />

          <TextInput
            style={[styles.defaultInput, styles.shortInput]}
            onChangeText={(txt) => setNewPassword(txt)}
            placeholder='Nowe hasło'
            secureTextEntry={true}
          />

          <TextInput
            style={[styles.defaultInput, styles.shortInput]}
            onChangeText={(txt) => setRepeatNewPassword(txt)}
            placeholder='Powtórz nowe hasło'
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: Colors.buttons,
            paddingHorizontal: 45,
            paddingVertical: 10,
            alignItems: 'center',
            width: '80%',
            alignSelf: 'center'
          }}
          onPress={() => 
          {
            /* password cahnge */
            if (newPassword !== repeatNewPassword)
            {
              Alert.alert(
                "Zmiana hasła",
                "Hasła się nie zgadzają!",
                [
                  { text: "OK" }
                ]
              );
              return;
            }
            servRequest
            (
              'pwdChange',
              {
                userId: route.params.userId,
                curPwd: currentPassword,
                newPwd: newPassword,
              },
              (s) =>
              {
                Alert.alert(
                  "Zmiana hasła",
                  "Pomyślnie zmieniono hasło",
                  [
                    { text: "OK", onPress: () => navigation.navigate("ProfileView", { userId: route.params.userId }) }
                  ]
                );
              },
              (e) =>
              {
                //console.log('failed to change password', JSON.stringify(e));
                Alert.alert(
                  "Zmiana hasła",
                  "Aktualne hasło nie jest poprawne!",
                  [
                    { text: "OK" }
                  ]
                );
              }
            )
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
            Zmień hasło
          </Text>
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={{ marginTop: 18 }}>
            <Text style={([styles.info], { color: Colors.reddish })}>
              Utrata hasła
            </Text>
            <Text style={styles.info}> spowoduje utratę dostępu do konta!</Text>
          </Text>
        </View>
      </ScrollView>
    </Viewport>
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
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 5
  },

  container: {
    padding: 25,
    marginTop: 25,
    alignItems: 'center'
  },

  info: {
    fontSize: 14,
    lineHeight: 25,
    alignSelf: 'center'
  }
})
