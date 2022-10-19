
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import Notification from '../components/Notification'

export function BellView ({ navigation }) {
  const tw = useTailwind()

  const serverResp = [
    {
      type: "NewOpinion",
      hook: "1238"
    },
    {
      type: "NewViews",
      hook: "1239"
    },
    {
      type: "TransactionSuccess",
      hook: "1234",
      details: {
        seller: "Janusz Garwoliński - janusz@gmail.com",
        user: "TaniePerfumyPL",
        date: "12.02.2022",
        items: [
          {name: "Perfumy męskie Calvin Klein", price: "250"},
          {name: "Frytkownica", price: "120"},
          {name: "Kurtka męska zimowa L", price: "450"},
          {name: "Kosiarka spalinowa", price: "220"},
          {name: "Kurier DPD", price: "20"}
        ]
      }
    },
    {
      type: "TransactionFailure",
      hook: "4321",
      details: {
        user: "TaniePerfumyPL",
        date: "10.01.2022",
        reason: "Płatność odrzucona",
        items: [
          {name: "Kombajn Karoca", price: "2250"},
          {name: "Czołg T4", price: "3320"},
          {name: "Suwmiarka Logarytmiczna", price: "15"},
          {name: "Poczta Polska", price: "320"}
        ]
      }
    },
    {
      type: "NewBuyer",
      hook: "1243",
      details: {
        buyer: {
          user: "Alicja2003",
          name: "Alicja Dębska",
          adr1: "25-001 Kielce",
          adr2: "Warszawska 153",
          mail: "adebska@gmail.com"
        },
        date: "12.10.2022",
        items: [
          {name: "Dzban", price: "4999"},
          {name: "Białoruskie Kryształy", price: "3320"},
          {name: "Bomboniera Skaje", price: "720"},
          {name: "Pizza z Masłowa", price: "40"}
        ]
      }
    }
  ];

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(serverResp);
  }, []);

  return (
    <Viewport navigation={navigation} active="Bell">
      <ScrollView>
        <View style={{width: '90%', marginLeft: '10%', justifyContent: 'center'}}>
          {
            notifications.map((n) => (
              <Notification kind={n.type} source={n} key={n.hook} navigation={navigation} />
            ))
          }
        </View>
      </ScrollView>
    </Viewport>
  )
}
