
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

const serverResp = `
  [{"image":"https://ireland.apollo.olxcdn.com/v1/files/jew2jy0i9mcj2-PL/image;s=644x461","title":"Wynajme lokal Andrychów, super lokalizacja, 45-65metrow; duzy parking","price":"2190","kind":"Andrychów"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/lh3m6p9ma2f61-PL/image;s=644x461","title":"Paleta Euro / Epal / 120×80","price":"54","kind":"Macierzysz"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/12vkuo75b1s11-PL/image;s=644x461","title":"Drukarnia druk dtf Metki","price":"55","kind":"Warszawa,"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/lu8wi8cn3cki1-PL/image;s=644x461","title":"Montaż, ustawianie, naprawa, sprzedaż anten sat. i DVB-T","price":"","kind":"Racibórz"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/n698i4nhurae1-PL/image;s=644x461","title":"Prasa kostkująca New Holland Bigbaler 1290 Cropcutter (duża kostka)","price":"235000","kind":"Małdyty"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/nuc1x9g9w8a53-PL/image;s=644x461","title":"Kosiarka bijakowa na wysięgniku MIKANN AGQ 105,,nowa, JAPAN TRAK","price":"7724","kind":"Radomsko"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/tswhvisxju2j1-PL/image;s=644x461","title":"Black & White Yorkshire Terrier sunia","price":"3900","kind":"Bytom"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/qrsdscp5vqie1-PL/image;s=644x461","title":"Deski szalunkowe Stemple Więźba Transport","price":"800","kind":"Wadowice"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/1vyg49jcugxw1-PL/image;s=644x461","title":"Swarovski pierścionek chic Blue Crystal rozm. 60","price":"500","kind":"Czernikowice"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/omg4oi2a48ye3-PL/image;s=644x461","title":"Garaż blaszany 6x5 Blaszak dwustanowiskowy WZMOCNIONY Garaże 6x5 6x6","price":"5519","kind":"Poznań,"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/frnhis0bnomh1-PL/image;s=644x461","title":"Myjka Karcher HD 10/25 4S ,1090, 13/18, 1290, 895","price":"4500","kind":"Chachalnia"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/w14xkl8axd4a-PL/image;s=644x461","title":"wynajem szalunków stropowych i ściennych / najtaniej","price":"10zadobę","kind":"Kutno"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/ww3j3cpxbpp4-PL/image;s=644x461","title":"Kolorowe - BLACHY Trapezowe - Najtaniej w Elblągu","price":"19,25","kind":"Kazimierzowo"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/7qjga8r6v6ek2-PL/image;s=644x461","title":"Nowe kozaczki, buty przejściowe Geox,buciki na jesień, przejściówki 24","price":"75","kind":"Brzozów"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/ngo2l7y7p2jo2-PL/image;s=644x461","title":"Szamba betonowe zbiorniki na deszczówkę szambo ścieki 12 10m3 14 6 5","price":"1500","kind":"Inowrocław"},{"image":"https://ireland.apollo.olxcdn.com/v1/files/cwozw21mqfz92-PL/image;s=644x461","title":"Serwis Konsol XBOX 360 ONE S X PS3 PS4 SLIM PRO KRAKÓW RGH przeróbka","price":"","kind":"Kraków,"}]
`

export function MyShoppingView ({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active="Cart">
      <Text>Moje Zakupy</Text>
    </Viewport>
  )
}