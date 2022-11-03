import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import ShoppingHistoryItem from '../components/ShoppingHistoryItem'
import { Viewport } from '../utils/Viewport'

import OffersListing from '../components/OffersListing'

const serverResp = `
[
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/jew2jy0i9mcj2-PL/image;s=644x461",
     "title":"Wynajme lokal Andrychów, super lokalizacja, 45-65metrow; duzy parking",
     "price":"2190",
     "id":"123",
     "kind":"Andrychów",
     "date":"04-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/lh3m6p9ma2f61-PL/image;s=644x461",
     "title":"Paleta Euro / Epal / 120×80",
     "price":"54",
     "id":"123",
     "kind":"Macierzysz",
     "date":"05-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/12vkuo75b1s11-PL/image;s=644x461",
     "title":"Drukarnia druk dtf Metki",
     "price":"55",
     "id":"123",
     "kind":"Warszawa,",
     "date":"21-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/lu8wi8cn3cki1-PL/image;s=644x461",
     "title":"Montaż, ustawianie, naprawa, sprzedaż anten sat. i DVB-T",
     "price":"343",
     "id":"123",
     "kind":"Racibórz",
     "date":"13-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/n698i4nhurae1-PL/image;s=644x461",
     "title":"Prasa kostkująca New Holland Bigbaler 1290 Cropcutter (duża kostka)",
     "price":"235000",
     "id":"123",
     "kind":"Małdyty",
     "date":"12-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/nuc1x9g9w8a53-PL/image;s=644x461",
     "title":"Kosiarka bijakowa na wysięgniku MIKANN AGQ 105,,nowa, JAPAN TRAK",
     "price":"7724",
     "id":"123",
     "kind":"Radomsko",
     "date":"12-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/tswhvisxju2j1-PL/image;s=644x461",
     "title":"Black & White Yorkshire Terrier sunia",
     "price":"3900",
     "id":"123",
     "kind":"Bytom",
     "date":"30-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/qrsdscp5vqie1-PL/image;s=644x461",
     "title":"Deski szalunkowe Stemple Więźba Transport",
     "price":"800",
     "id":"123",
     "kind":"Wadowice",
     "date":"05-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/1vyg49jcugxw1-PL/image;s=644x461",
     "title":"Swarovski pierścionek chic Blue Crystal rozm. 60",
     "price":"500",
     "id":"123",
     "kind":"Czernikowice",
     "date":"06-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/omg4oi2a48ye3-PL/image;s=644x461",
     "title":"Garaż blaszany 6x5 Blaszak dwustanowiskowy WZMOCNIONY Garaże 6x5 6x6",
     "price":"5519",
     "id":"123",
     "kind":"Poznań,",
     "date":"12-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/frnhis0bnomh1-PL/image;s=644x461",
     "title":"Myjka Karcher HD 10/25 4S ,1090, 13/18, 1290, 895",
     "price":"4500",
     "id":"123",
     "kind":"Chachalnia",
     "date":"15-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/w14xkl8axd4a-PL/image;s=644x461",
     "title":"wynajem szalunków stropowych i ściennych / najtaniej",
     "price":"10",
     "id":"123",
     "kind":"Kutno",
     "date":"18-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/ww3j3cpxbpp4-PL/image;s=644x461",
     "title":"Kolorowe - BLACHY Trapezowe - Najtaniej w Elblągu",
     "price":"19,25",
     "id":"123",
     "kind":"Kazimierzowo",
     "date":"22-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/7qjga8r6v6ek2-PL/image;s=644x461",
     "title":"Nowe kozaczki, buty przejściowe Geox,buciki na jesień, przejściówki 24",
     "price":"75",
     "id":"123",
     "kind":"Brzozów",
     "date":"22-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/ngo2l7y7p2jo2-PL/image;s=644x461",
     "title":"Szamba betonowe zbiorniki na deszczówkę szambo ścieki 12 10m3 14 6 5",
     "price":"1500",
     "id":"123",
     "kind":"Inowrocław",
     "date":"26-11-2022"
  },
  {
     "image":"https://ireland.apollo.olxcdn.com/v1/files/cwozw21mqfz92-PL/image;s=644x461",
     "title":"Serwis Konsol XBOX 360 ONE S X PS3 PS4 SLIM PRO KRAKÓW RGH przeróbka",
     "price":"43",
     "id":"123",
     "kind":"Kraków,",
     "date":"29-11-2022"
  }
]
`

export function MyShoppingView({ navigation }) {
  const tw = useTailwind()

  const [hist, setHist] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const resp = JSON.parse(serverResp)
      setHist(resp);
    }, 500);
    return () => console.log('left');
  }, [])

  return (
    <Viewport navigation={navigation} active='Cart'>
      {
        hist && (
          <OffersListing 
            infogram={hist} 
            onTitleClick = {(e, id) => console.log('shopping history title click', id) }
            onSubtitleClick = {(e, id) => console.log('shopping history subtitle click', id) }
            subtitle = '@'
          />
        )
      }
    </Viewport>
  )
}
