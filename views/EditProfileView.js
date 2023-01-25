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
import { Viewport } from '../utils/Viewport'
import { PencilIcon } from 'react-native-heroicons/outline'
import { Controller, useForm } from 'react-hook-form'
import { Colors } from '../utils/Colors'
import servRequest from '../utils/Server';


const __premade_icons = [
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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'
];


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

  const toggleIcon = function (e)
  {
    const cIdx = __premade_icons.indexOf(image);
    const nIdx = (cIdx + 1) %  __premade_icons.length;
    // console.log(cIdx, nIdx, __premade_icons.length);
    setImage(__premade_icons[nIdx]);
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
              source={{ uri: image !== '' ? image : __premade_icons[0]}}
              style={{
                width: 130,
                height: 130,
                borderRadius: 90,
                alignSelf: 'center',
                position: 'absolute'
              }}
            />
            <TouchableOpacity onPress={toggleIcon} >
              <PencilIcon
                width={18}
                height={18}
                style={{
                  color: 'black',
                  position: 'absolute',
                  alignSelf: 'flex-end'
                }}
              />
            </TouchableOpacity>
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
