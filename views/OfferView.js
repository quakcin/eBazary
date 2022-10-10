
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, FlatList, Image, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import { useEffect, useState } from 'react'
import AutoHeightImage from 'react-native-auto-height-image'

export function OfferView ({ navigation }) {
  const tw = useTailwind()

  const serverResp = {
    dbid: 0,
    images: [
      'https://ireland.apollo.olxcdn.com/v1/files/omg4oi2a48ye3-PL/image;s=644x461',
      'https://ireland.apollo.olxcdn.com/v1/files/frnhis0bnomh1-PL/image;s=644x461',
      'https://ireland.apollo.olxcdn.com/v1/files/lu8wi8cn3cki1-PL/image;s=644x461'
    ],
    title: 'Apple iPhone 13 mini 128GB (zielony)',
    desc: `Zapraszamy do skorzystania z naszej oferty i zapoznania się z jej opisem.

    Dostępne kolory:
    
    CZARNY
    FIOLETOWY
    BIAŁY
    CZERWONY
    ZIELONY
    ŻÓŁTY
    Pamiętaj o podaniu koloru przedmiotu podczas składnia zamówienia.
    
    Przekaż informację podczas składania zamówienia lub w wiadomości do sprzedającego.
    Zamówienie może zostać wstrzymane do momentu otrzymania informacji.
    PREMIUM APPLE IPHONE 11 128GB RÓŻNE KOLORY KL. A+ Słuchawki w komplecie tak
    Co oznacza klasa A+ urządzenia?
    Jest to najwyższa dostępna na rynku klasa urządzenia, która jest idealnym kompromisem pomiędzy urządzeniem używanym a nowym! Zadowalający stan techniczny i wizualny.
    Każdy z naszych klientów otrzymuje urządzenie sprawne technicznie, sprawdzone przez sztab specjalistów pod każdym możliwym kątem sprawności telefonu.
    Nie powstydzisz się kupując telefon dla siebie lub kogoś bliskiego! Stan wizualny to wygląd, który zadowoli nawet najbardziej wymagających konsumentów.
    Idealny pomysł na prezent w najkorzystniejszej cenie na rynku!`,
    price: 2299.50,
    kind: 'Elektronika',
    seller: 'TanieIphonyPL',
    name: 'Mariusz',
    surname: 'Bimber'
  }

  const [offer, setOffer] = useState({images: []});

  useEffect(() => 
  {
    navigation.setOptions({title: `${serverResp.title}`})
    setOffer(serverResp);
  }, [])
  

  return (
    <Viewport navigation={navigation} active="Home">
      <ScrollView>
        <Text
          style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 25, marginBottom: 12}}
        >
          {offer.seller}
        </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 12, marginBottom: 15}}>
            prezentuje
          </Text>
        {offer.images.map((a) => 
          <View style={{alignItems: 'center', marginBottom: 25}}>
            <AutoHeightImage
              width={250}
              source={{uri: a}}
            />
          </View>
        )}
        <View style={{width: '80%', marginLeft: '10%'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>
            Opis
          </Text>
          <Text style={{textAlign: 'center', fontSize: 12}}>
            {offer.desc}
          </Text>
          <View style={{width: '100%', marginTop: 40}}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {offer.price}zł
              </Text>
              <Button title="Do Koszyka" />
            </View>
            <View style={{marginTop: 15, marginBottom: 30}}>
              <Button title="Kup Teraz!" />
            </View>
          </View>
        </View>
      </ScrollView>
    </Viewport>
  )
}
