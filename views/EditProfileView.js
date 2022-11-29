import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
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

  const onSubmit = (obj) => {
    obj['userId'] = route.params.userId;
    obj['image'] = image;
    // add image!

    servRequest
    (
      'editUser', obj,
      (s) =>
      {
        console.log('updated user with this datagram: ', obj);
        console.log('edited user data!\n');
      },
      (e) =>
      {
        console.log('fail to editUser, pls handle me!');
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
        console.log('failed to fetch user info, pls handle me')
      }
    )

  }, []);

  const onDeleteAccount = () => console.log('Removing account...')

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

          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={name}
                placeholder='Imie'
              />
            )}
            name='name'
          />
          {errors.imie && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Imie jest wymagane!
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={surname}
                placeholder='Nazwisko'
              />
            )}
            name='surname'
          />
          {errors.nazwisko && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Nazwisko jest wymagane!
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={userName}
                placeholder='Nazwa użytkownika'
              />
            )}
            name='username'
          />
          {errors.nazwa_uzytkownika && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Nazwa użytkownika jest wymagana!
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={mail}
                placeholder='Email'
              />
            )}
            name='mail'
          />
          {errors.email && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Email jest wymagany!
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.defaultInput, styles.longInput, {borderBottomWidth: 0, borderLeftWidth: 5, marginTop: 35, marginBottom: 20}]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={descr}
                placeholder='Opis'
                textAlign='left'
                textAlignVertical='top'
                multiline={true}
                numberOfLines={5}
              />
            )}
            name='descr'
          />
          {errors.opis && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Opis jest wymagany!
            </Text>
          )}

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
