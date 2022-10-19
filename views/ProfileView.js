import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import Opinion from '../components/Opinion'
import { Viewport } from '../utils/Viewport'

const serverResp = {
  name: 'Mariusz',
  surname: 'Kowalski',
  user: 'TanieIphonyPL',
  mail: 'tanieiphony@gmail.com',
  desc: 'Właścicielem konta OleOle_pl jest Euro-net  Sp. z o.o. z siedzibą w Warszawie, przy ul. Muszkieterów.',
  image:
    'https://i.pinimg.com/originals/e5/71/4a/e5714a28c71efc5235c89db3cb2fa801.jpg',
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
  return (
    <Viewport navigation={navigation} active='Profile'>
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
            <Text style={{ fontWeight: '700', fontSize: 16 }}>
              {serverResp.user}
            </Text>
            <Text>{serverResp.desc}</Text>
          </View>
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
          onPress={() => {
            navigation.navigate('MyOffersView')
          }}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
            Moje Oferty
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: '#68BAA6',
            paddingHorizontal: 45,
            paddingVertical: 10,
            alignItems: 'center',
            marginTop: 15
          }}
          onPress={() => {
            navigation.navigate('MyShoppingView')
          }}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
            Moje Zakupy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: '#68BAA6',
            paddingHorizontal: 45,
            paddingVertical: 10,
            alignItems: 'center',
            marginTop: 15
          }}
          onPress={() => {
            navigation.navigate('EditProfileView')
          }}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
            Edytuj Profil
          </Text>
        </TouchableOpacity>

        <Text style={{ alignSelf: 'center', marginTop: 22 }}>
          Posiadasz{' '}
          {<Text style={{ color: '#FFA901', fontWeight: '600' }}>2</Text>}{' '}
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
    </Viewport>
  )
}
