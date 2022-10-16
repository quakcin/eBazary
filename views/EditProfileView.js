
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
  image: "https://i.pinimg.com/originals/e5/71/4a/e5714a28c71efc5235c89db3cb2fa801.jpg"
}

export function EditProfileView ({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active="Cart">
      <Text>Edycja Profilu</Text>
    </Viewport>
  )
}
