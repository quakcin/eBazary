import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Viewport } from '../utils/Viewport'


export function CreateAccountView ({ navigation }) {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [mail, setMail] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [surname, setSurname] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const hasUnsavedChanges = Boolean(true);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Czy chcesz przerwać rejestrację?',
          'Posiadasz niezapisane dane, jeżeli przerwiesz proces rejestracji Twoje konto nie zostanie utworzone!',
          [
            { text: 'Nie, pozostań', style: 'cancel', onPress: () => {} },
            {
              text: "Tak, anuluj",
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );


  return (
    <ScrollView style={{marginTop: "12%", padding: 20}}>
      <View style={{alignItems:"center", marginBottom: "10%"}}>
        <AutoHeightImage
          source={{uri:"https://i.postimg.cc/9fW1Sg1Y/clipart323390.png"}}
          width={130}
        />
        <View style = {{width: "100%", alignItems:"center"}}>

          <TextInput
            name="name"
            style={styles.input}
            placeholder="Imię"
            onChangeText= { setName }
          />
          <TextInput
            name="surname"
            style={styles.input}
            placeholder="Nazwisko"
            onChangeText= { setSurname }
          />
          <TextInput
            name="nickname"
            style={styles.input}
            placeholder="Nazwa użytkownika"
            onChangeText={(user) => setUser(user)}
          />
          <TextInput
            name="mail"
            style={styles.input}
            placeholder="Adres e-mail"
            onChangeText={(mail) => setMail(mail)}
          />
          <TextInput
            name="pass1"
            style={styles.input}
            placeholder="Hasło"
            secureTextEntry={true}
            onChangeText={(password1) => setPassword1(password1)}
          />
          <TextInput
            name="pass2"
            style={styles.input}
            placeholder="Powtórz hasło"
            secureTextEntry={true}
            onChangeText={(password2) => setPassword2(password2)}
          />
        </View>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#b8215b' : undefined}
          />
          <Text style={styles.info}>Akceptuję regulamin serwisu.</Text>
        </View>
        <View style = {styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Register")} >
            <Text style={{fontSize: 18}}>Zarejestruj się</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.info}>Jeżeli posiadasz już konto kliknij
              <Text style={[styles.info, {color: '#b8215b'}]} onPress={() => { navigation.navigate('AuthView') }}> tutaj. </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "80%",
    marginTop: 30,
    padding: 10,
    backgroundColor: "#bfbfbf"
  },
  info: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 25
  },
  buttonArea: {
    width: "100%",
    alignItems:"center", 
    marginTop: 50
  },
  button: {
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#bfbfbf",
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 30
  }
});
