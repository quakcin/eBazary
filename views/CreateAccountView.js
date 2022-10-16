
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Viewport } from '../utils/Viewport'


export function CreateAccountView ({ navigation }) {
  return (
    <Viewport navigation={navigation} active="Cart">
      <ScrollView style={{marginTop: "12%", padding: 20}}>
        <View style={{alignItems:"center", marginBottom: "10%"}}>
          <AutoHeightImage
            source={{uri:"https://i.postimg.cc/9fW1Sg1Y/clipart323390.png"}}
            width={140}
          />
          <View style = {{width: "100%", alignItems:"center"}}>

            <TextInput
              name="name"
              style={styles.input}
              placeholder="Imię"
            />
            <TextInput
              name="surname"
              style={styles.input}
              placeholder="Nazwisko"
            />
            <TextInput
              name="nickname"
              style={styles.input}
              placeholder="Nazwa użytkownika"
            />
            <TextInput
              name="mail"
              style={styles.input}
              placeholder="Adres e-mail"
            />
            <TextInput
              name="pass1"
              style={styles.input}
              placeholder="Hasło"
            />
            <TextInput
              name="pass2"
              style={styles.input}
              placeholder="Powtórz hasło"
            />
          </View>
          <View style = {styles.buttonArea}>
            <TouchableOpacity style={styles.button} onPress={() => console.log("Zapisz")} >
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
    </Viewport>
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
    marginTop: 70
  },
  button: {
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#bfbfbf",
  },
});
