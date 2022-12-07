import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity, 
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import { PencilIcon } from 'react-native-heroicons/outline'
import { Controller, useForm } from 'react-hook-form'
import { Colors } from '../utils/Colors'
import servRequest from '../utils/Server';




import { useEffect, useState } from 'react'


export function EditProfileView({ route, navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const fallBackImage = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gBqTm8gaW1hZ2UgYXZhaWxhYmxlIHNpZ24uIEludGVybmV0IHdlYiBpY29uIHRvIGluZGljYXRlIHRoZSBhYnNlbmNlIG9mIGltYWdlIHVudGlsIGl0IHdpbGwgYmUgZG93bmxvYWRlZC7/2wBDAB4UFhoWEx4aGBohHx4jLEowLCkpLFtBRDZKa15xb2leaGZ2haqQdn6hgGZolMqWobC1v8C/c47R4M+53qq7v7f/2wBDAR8hISwnLFcwMFe3emh6t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7f/wgARCABAAEADAREAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB9EAIGUAAZnMUAjpLAxOcYyTpNQMTmNQMjqNQEZAAGowJJGICigEIQAUMBCAAGM//xAAgEAACAQMFAQEAAAAAAAAAAAAAARECECEDEhMgMjFB/9oACAEBAAEFAryTnpU4W+oSqGqkTBS5VtTzTmqpy6HDqw9PzbU8rDdO4S220/Nnk40caONHGj5dmT9yZF0kkknrBBBF/wD/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAEDAQE/AQH/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAECAQE/AQH/xAAbEAACAgMBAAAAAAAAAAAAAAAAEQEwAiExUP/aAAgBAQAGPwKro2hmpueI58T/xAAgEAADAAEEAwEBAAAAAAAAAAAAAREhEDFBYSBRcbHh/9oACAEBAAE/IdZrUbhOGU/HPrQNexzTcFnNLh5OcEt6/sLBMc3oYlcMSq8H9hoP0UU34E5vxDdbfvwUSRn1O1naz6iSSLVLBBp/Bs5LXf8ACudXgg24GZE6rq1SCCSNf//aAAwDAQACAAMAAAAQAEAAEkAAEgAAEkgAAkkAAkggEEkgEkkg/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAwEBPxAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAgEBPxAB/8QAJRABAAICAQQBBAMAAAAAAAAAAQARITEQQWFxkVEggcHwseHx/9oACAEBAAE/EOWqo2o1BAxGrN/Sz7LoneeiXeJkqlyudegtUSMqMOiKqU6edfhB0Rcy9nCoPibyLSQR9DiavLz/ABo5O1cBiOymkY7Ws0uVju7VzV5eVJ2PSd/3hdj2z/Zne94ZCg0cu6YTI/DAAwj0pwZzcRhYnNeH+pRBkoW3pzf4jQLbvzj9MIGz9zlUV6QaqvP7+IlTsXAFAtEK+9ShtKx13dwCGnkBTNeNCb+Zvw57zsvvvc7T5uBRXH//2Q==`;

  const validate = () => {
    if(name.length == 0) 
    {
      Alert.alert(
        "Edycja użytkownika",
        "Pole imię nie może być puste!",
        [
          { text: "OK" }
        ]
      );
      return false;
    }
    if(surname.length == 0) 
    {
      Alert.alert(
        "Edycja użytkownika",
        "Pole nazwisko nie może być puste!",
        [
          { text: "OK" }
        ]
      );
      return false;
    }
    if(userName.length == 0) 
    {
      Alert.alert(
        "Edycja użytkownika",
        "Pole nazwa użytkownika nie może być puste!",
        [
          { text: "OK" }
        ]
      );
      return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(mail) === false || mail.length == 0) {
      Alert.alert(
        "Edycja użytkownika",
        "Niepoprawny adres e-mail!",
        [
          { text: "OK" }
        ]
      );
      return false;
    }
     

    
    return true;
  }

  const onSubmit = () => {
    if(validate() == false)
      return;

    servRequest
    (
      'editUser', 
      {
        userId: route.params.userId,
        image: image,
        username: userName,
        name: name,
        surname: surname,
        mail: mail,
        descr: descr,
      },
      (s) =>
      {
        Alert.alert(
          "Edycja użytkownika",
          "Pomyślnie edytowano informacje o użytkowniku",
          [
            { text: "OK", onPress: () => { navigation.navigate("ProfileView", { userId: route.params.userId }) } }
          ]
        );
      },
      (e) =>
      {
        Alert.alert(
          "Error",
           e.msg,
          [
            { text: "OK" }
          ]
        );
      }
    )
  }


  const [userName, setUserName] = useState('');
  const [mail, setMail] = useState('');
  const [descr, setDescr] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() =>
  {

    servRequest
    (
      'userInfo',
      {
        id: route.params.userId
      },
      (s) =>
      {
        setName(s.user.name);
        setSurname(s.user.surname);
        setMail(s.user.mail);
        setDescr(s.user.descr);
        setImage(s.user.image);
        setUserName(s.user.user);
      },
      (e) =>
      {
        console.log('failed to fetch user info, pls handle me') // TODO:ALERT
      }
    )

  }, []);

  const onDeleteAccount = () =>
  {
    Alert.alert(
      'Czy chcesz usunąć konto?',
      'Jest to operacja nieodwracalnam utracisz wszystkie dane oraz historię zakupów w serwisie e-Bazary!',
      [
        { text: 'Nie, anuluj', style: 'cancel', onPress: () => {} },
        {
          text: 'Tak, usuń',
          style: 'destructive',
          onPress: () => delUser()
        }
      ]
    )
  }

  const delUser = () =>
    servRequest
    (
      'rmUser',
      {
        userId: route.params.userId
      },
      (s) => 
      {
        navigation.replace("AuthView")
        //console.log('removed user'); // TODO:ALERT
      },
      (e) =>
      {
        console.log('failed ', JSON.stringify(e)); // TODO:ALERT
      }
    )

  const onPasswordChange = () => {
    navigation.navigate('PassCtrlView')
  }

  return (
    <Viewport navigation={navigation} active='Profile'>
      <ScrollView>
        <View style={{ paddingHorizontal: 45, paddingVertical: 30 }}>
          <View
            style={{
              position: 'relative',
              width: 130,
              height: 130,
              alignSelf: 'center',
              marginBottom: 12
            }}
          >
            <Image
              source={{ uri: image !== '' ? image : fallBackImage}}
              style={{
                width: 130,
                height: 130,
                borderRadius: 90,
                alignSelf: 'center',
                position: 'absolute'
              }}
            />
            <PencilIcon
              width={18}
              height={18}
              style={{
                color: 'black',
                position: 'absolute',
                alignSelf: 'flex-end'
              }}
            />
          </View>

              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onChangeText={(txt) => setName(txt)}
                value={name}
                placeholder='Imie'
              />

              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onChangeText={(txt) => setSurname(txt)}
                value={surname}
                placeholder='Nazwisko'
              />

              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onChangeText={(txt) => setUserName(txt)}
                value={userName}
                placeholder='Nazwa użytkownika'
              />

              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onChangeText={(txt) => setMail(txt)}
                value={mail}
                placeholder='Email'
                keyboardType='email-address'
              />

              <TextInput
                style={[styles.defaultInput, styles.longInput, {borderBottomWidth: 0, borderLeftWidth: 5, marginTop: 35, marginBottom: 20}]}
                onChangeText={(txt) => setDescr(txt)}
                value={descr}
                placeholder='Opis'
                textAlign='left'
                textAlignVertical='top'
                multiline={true}
                numberOfLines={5}
              />

          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: Colors.buttons,
              paddingHorizontal: 45,
              paddingVertical: 10,
              alignItems: 'center',
              marginTop: 25
            }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
              Zapisz
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: Colors.reddish,
              paddingHorizontal: 45,
              paddingVertical: 10,
              alignItems: 'center',
              marginTop: 13
            }}
            onPress={onDeleteAccount}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
              Usuwanie Konta
            </Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: 'center', marginTop: 15 }}>
            Możesz też zmienić{' '}
            <Text style={{ color: Colors.bluish }} onPress={onPasswordChange}>
              tutaj
            </Text>{' '}
            swoje aktualne hasło
          </Text>
        </View>
      </ScrollView>
    </Viewport>
  )
}

const styles = StyleSheet.create({
  defaultInput: {
    marginTop: 15
  },

  shortInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    height: 40,
    paddingHorizontal: 20
  },

  longInput: {
    width: '100%',
    height: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    paddingHorizontal: 20,
    paddingVertical: 12
  }
})
