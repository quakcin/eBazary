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

const serverResp = {
  name: 'Mariusz',
  surname: 'Kowalski',
  user: 'TanieIphonyPL',
  mail: 'tanieiphony@gmail.com',
  desc: 'Właścicielem konta OleOle_pl jest Euro-net  Sp. z o.o. z siedzibą w Warszawie, przy ul. Muszkieterów.',
  image:
    'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/09/professional-mens-hairstyles-light-styling-min.jpg'
}

export function EditProfileView({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => console.log(data)

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
              source={{ uri: serverResp.image }}
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
                defaultValue={serverResp.name}
                placeholder='Imie'
              />
            )}
            name='imie'
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
                defaultValue={serverResp.surname}
                placeholder='Nazwisko'
              />
            )}
            name='nazwisko'
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
                defaultValue={serverResp.user}
                placeholder='Nazwa użytkownika'
              />
            )}
            name='nazwa_uzytkownika'
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
                defaultValue={serverResp.mail}
                placeholder='Email'
              />
            )}
            name='email'
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
                style={[styles.defaultInput, styles.longInput, {borderBottomWidth: 0, borderLeftWidth: 2}]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={serverResp.desc}
                placeholder='Opis'
                textAlign='left'
                textAlignVertical='bottom'
                multiline={true}
                numberOfLines={6}
              />
            )}
            name='opis'
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
    minHeight: 150,
    height: 150,
    maxHeight: 150,
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 12
  }
})
