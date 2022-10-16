
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

const serverResp = {
  name: "Mariusz",
  surname: "Kowalski",
  user: "TanieIphonyPL",
  mail: "tanieiphony@gmail.com",
  desc: "Właścicielem konta OleOle_pl jest Euro-net  Sp. z o.o. z siedzibą w Warszawie, przy ul. Muszkieterów.",
  image: "https://i.pinimg.com/originals/e5/71/4a/e5714a28c71efc5235c89db3cb2fa801.jpg",
  comments: [
    {image: "https://bi.im-g.pl/im/5f/c1/1a/z28053599ICR.jpg", stars: 3, msg: "W takiej cenie może być, ale wysyłka długa!"},
    {image: "https://www.muzeumjazzu.pl/wp-content/uploads/2021/09/40-Basia-Trzetrzelewska-1976.jpg", stars: 5, msg: "Fantastyczna obsługa, produkt się zgadza - polecam!"}
  ]
}


export function ProfileView ({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active="Profile">
      <Text>Profile View</Text>
    </Viewport>
  )
}
