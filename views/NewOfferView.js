import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Viewport } from '../utils/Viewport'
import { useForm, Controller } from 'react-hook-form'
import MakePhotoWidget from '../components/MakePhotoWidget'
import RemovePhotoWidget from '../components/RemovePhotoWidget'
import SelectList from 'react-native-dropdown-select-list'
import { useState } from 'react'
import { useFonts, RobotoMono_500Medium } from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'

export function NewOfferView({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    RobotoMono_500Medium,
    Karla_400Regular
  })

  const onSubmit = (data) => console.log(data)

  const [selected, setSelected] = useState('')
  const data = [
    { key: '1', value: 'Wszystkie' },
    { key: '2', value: 'Dom' },
    { key: '3', value: 'Elektronika' },
    { key: '4', value: 'Moda' },
    { key: '5', value: 'Motoryzacja' },
    { key: '6', value: 'Pozostałe' }
  ]

  if (!fontsLoaded) return null

  return (
    <Viewport navigation={navigation} active='NewOffer'>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'column',
              width: '70%',
              paddingTop: 25,
              paddingBottom: 25
            }}
          >
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
                  placeholder='Tytuł'
                />
              )}
              name='tytul'
            />
            {errors.tytul && (
              <Text
                style={{
                  color: '#fc0303',
                  fontWeight: '500',
                  fontSize: 13,
                  marginTop: 6
                }}
              >
                Tytuł jest wymagany!
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, selected } }) => (
                <SelectList
                  setSelected={setSelected}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  data={data}
                  search={false}
                  placeholder={'Kategoria'}
                  boxStyles={{
                    borderRadius: 0,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    marginTop: 15,
                    fontFamily: 'Ubuntu_400Regular'
                  }}
                  dropdownStyles={{
                    borderRadius: 0,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    fontFamily: 'Ubuntu_400Regular'
                  }}
                  inputStyles={{
                    fontFamily: 'Ubuntu_400Regular'
                  }}
                />
              )}
              name='kategoria'
            />
            {errors.kategoria && (
              <Text
                style={{
                  color: '#fc0303',
                  fontWeight: '500',
                  fontSize: 13,
                  marginTop: 6
                }}
              >
                Kategoria jest wymagana!
              </Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: 'Cena jest wymagana!',
                  pattern: {
                    value: /^\d+(\.\d{1,10})?$/,
                    message: 'Niepoprawna cena!'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.defaultInput,
                      styles.shortInput,
                      { width: '85%' }
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder='Cena'
                  />
                )}
                name='cena'
              />

              <View style={{ width: '15%', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>PLN</Text>
              </View>
            </View>

            {errors.cena?.message && (
              <Text
                style={{
                  color: '#fc0303',
                  fontWeight: '500',
                  fontSize: 13,
                  marginTop: 6
                }}
              >
                {errors.cena?.message}
              </Text>
            )}
            {errors.cena?.required && (
              <Text
                style={{
                  color: '#fc0303',
                  fontWeight: '500',
                  fontSize: 13,
                  marginTop: 6
                }}
              >
                {errors.cena?.required}
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='Opis (max 500 znaków)'
                  style={[
                    styles.defaultInput,
                    styles.longInput,
                    { marginTop: 15 }
                  ]}
                  textAlign={'left'}
                  textAlignVertical={'top'}
                  multiline={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='opis'
            />
            {errors.opis && (
              <Text
                style={{
                  color: '#fc0303',
                  fontWeight: '500',
                  fontSize: 13,
                  marginTop: 6
                }}
              >
                Opis jest wymagany!
              </Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 20
              }}
            >
              <RemovePhotoWidget uri='https://ireland.apollo.olxcdn.com/v1/files/jew2jy0i9mcj2-PL/image;s=644x461' />
              <RemovePhotoWidget uri='https://ireland.apollo.olxcdn.com/v1/files/lh3m6p9ma2f61-PL/image;s=644x461' />
              <MakePhotoWidget />
              <MakePhotoWidget />
              <MakePhotoWidget />
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: '#68BAA6',
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 25
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular'
                }}
              >
                Dodaj Ogłoszenie
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Viewport>
  )
}

const styles = StyleSheet.create({
  defaultInput: {
    backgroundColor: 'white',
    fontFamily: 'Ubuntu_400Regular'
  },

  shortInput: {
    width: '100%',
    borderWidth: 2,
    height: 50,
    borderColor: '#393939',
    paddingHorizontal: 20
  },

  longInput: {
    width: '100%',
    minHeight: 150,
    height: 150,
    maxHeight: 150,
    borderWidth: 2,
    height: 50,
    borderColor: '#393939',
    paddingHorizontal: 20,
    paddingVertical: 12
  }
})
