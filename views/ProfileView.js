import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import Opinion from '../components/Opinion'
import { Viewport } from '../utils/Viewport'
import {
  useFonts,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'
import { Colors } from '../utils/Colors'

const serverResp = {
  name: 'Mariusz',
  surname: 'Kowalski',
  user: 'TanieIphonyPL',
  mail: 'tanieiphony@gmail.com',
  desc: 'Właścicielem konta OleOle_pl jest Euro-net  Sp. z o.o. z siedzibą w Warszawie, przy ul. Muszkieterów.',
  image:
    'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/09/professional-mens-hairstyles-light-styling-min.jpg',
  comments: [
    {
      image: 'https://bi.im-g.pl/im/5f/c1/1a/z28053599ICR.jpg',
      stars: 3,
      msg: 'W takiej cenie może być, ale wysyłka długa!'
    },
    {
      image:
        'https://www.muzeumjazzu.pl/wp-content/uploads/2021/09/40-Basia-Trzetrzelewska-1976.jpg',
      stars: 5,
      msg: 'Fantastyczna obsługa, produkt się zgadza - polecam!'
    }
  ]
}

export function ProfileView({ navigation }) {
  let [fontsLoaded] = useFonts({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular
  })

  const lightMode = true

  if (!fontsLoaded) return null

  return (
    <>
      <Viewport navigation={navigation} active='Profile'>
        <ScrollView>
          <View
            style={{
              padding: 30,
              width: '100%'
            }}
          >
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Image
                source={{ uri: serverResp.image }}
                style={{ width: 122, height: 122, borderRadius: 90 }}
              />
              <View
                style={{
                  marginLeft: 20,
                  justifyContent: 'space-around',
                  flexShrink: 1
                }}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    fontFamily: 'RobotoMono_600SemiBold',
                    color: lightMode ? Colors.dark : Colors.textColorDarkMode
                  }}
                >
                  {serverResp.user}
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 13,
                    fontFamily: 'Ubuntu_400Regular',
                    color: lightMode ? Colors.dark : Colors.textColorDarkMode
                  }}
                >
                  {serverResp.desc}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: lightMode
                  ? Colors.buttons
                  : Colors.buttonsDarkMode,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 25
              }}
              onPress={() => {
                navigation.navigate('MyOffersView')
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular',
                }}
              >
                Moje Oferty
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: lightMode
                  ? Colors.buttons
                  : Colors.buttonsDarkMode,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 15
              }}
              onPress={() => {
                navigation.navigate('MyShoppingView')
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular',
                }}
              >
                Moje Zakupy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: lightMode
                  ? Colors.buttons
                  : Colors.buttonsDarkMode,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 15
              }}
              onPress={() => {
                navigation.navigate('EditProfileView')
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular',
                }}
              >
                Edytuj Profil
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                alignSelf: 'center',
                marginTop: 22,
                fontFamily: 'Karla_400Regular',
                fontSize: 14,
                color: lightMode ? Colors.dark : Colors.textColorDarkMode
              }}
            >
              Posiadasz{' '}
              {
                <Text
                  style={{
                    color: 'lightMode ? Colors.greenish : Colors.blueishDarkMode',
                    fontWeight: '600'
                  }}
                >
                  2
                </Text>
              }{' '}
              opinie
            </Text>

            <Opinion
              image={serverResp.comments[0].image}
              rating={serverResp.comments[0].stars}
              message={serverResp.comments[0].msg}
            />
            <Opinion
              image={serverResp.comments[1].image}
              rating={serverResp.comments[1].stars}
              message={serverResp.comments[1].msg}
            />
          </View>
        </ScrollView>
      </Viewport>
    </>
  )
}
