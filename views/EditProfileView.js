
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'


export function EditProfileView ({ navigation }) {
  const tw = useTailwind()

  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [image, setImage] = useState('');
  const [user, setUser] = useState('');
  const [mail, setMail] = useState('');
  const [desc, setDesc] = useState('');

  const serverResp = {
    name: "Mariusz",
    surname: "Kowalski",
    user: "TanieIphonyPL",
    mail: "tanieiphony@gmail.com",
    desc: "Właścicielem konta OleOle_pl jest Euro-net  Sp. z o.o. z siedzibą w Warszawie, przy ul. Muszkieterów.",
    image: "https://i.pinimg.com/originals/e5/71/4a/e5714a28c71efc5235c89db3cb2fa801.jpg"
  }

  useEffect(() => {
    setProfile(serverResp);
    setName(serverResp.name);
    setSurname(serverResp.surname);
    setUser(serverResp.user)
    setDesc(serverResp.desc);
    setImage(serverResp.image);
    setMail(serverResp.mail);
  }, [])

  return (
    <Viewport navigation={navigation} active="Cart">
      <ScrollView style={{marginTop: 20, padding: 20}}>
        <View style={{alignItems:"center", marginBottom: "10%"}}>
          <AutoHeightImage
            source = {{uri: image}}
            width={150}
          />
          <View style = {{width: "100%", alignItems:"center"}}>

            <TextInput
              name="name"
              style={styles.input}
              placeholder="Imię"
              value={name}
              onChange={setName}
            />
            <TextInput
              name="surname"
              style={styles.input}
              placeholder="Nazwisko"
              value={surname}
              onChange={setSurname}
            />
            <TextInput
              name="nickname"
              style={styles.input}
              placeholder="Nazwa użytkownika"
              value={user}
              onChange={setUser}
            />
            <TextInput
              name="mail"
              style={styles.input}
              placeholder="Adres e-mail"
              value={mail}
              onChange={setMail}
            />
            <TextInput
              name="desc"
              multiline={true}
              style={[styles.input, {height: 80}]}
              placeholder="Krótki opis użtykownika"
              value={desc}
              onChange={setDesc}
            />
          </View>
          <View style = {styles.buttonArea}>
            <View style={{width:"80%", marginBottom: '8%'}}>
              <Button
                title="Zapisz"
                onPress={() => console.log('Zapisz zmiany')}
              />
            </View>
            <View style={{width:"80%", marginBottom: '15%'}}>
              <Button
                title="Usuń konto"
                onPress={() => console.log('Usunięcie konta')}
              />
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.info}>Możesz też zmienić
                <Text style={[styles.info, {color: '#b8215b'}]} onPress={() => { navigation.navigate('PassCtrlView') }}> tutaj </Text>
              swoje aktualne hasło</Text>
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
    marginTop: 40,
    padding: 10,
    backgroundColor: "#bfbfbf"
  },
  info: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25
  },
  buttonArea: {
    width: "100%",
    alignItems:"center", 
    marginTop: 70
  }
});
