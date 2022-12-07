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
              source={{ uri: image }}
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
