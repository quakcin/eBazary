import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
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
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            name="surname"
            style={styles.input}
            placeholder="Nazwisko"
            onChangeText={(surname) => setSurname(surname)}
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
            onChangeText={(password1) => setPassword1(password1)}
          />
          <TextInput
            name="pass2"
            style={styles.input}
            placeholder="Powtórz hasło"
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
