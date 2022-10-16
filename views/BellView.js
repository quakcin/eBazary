
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
      hook: "1234"
    },
    {
      type: "NewViews",
      hook: "1234"
    },
    {
      type: "TransactionSuccess",
      hook: "1234"
    },
    {
      type: "TransactionFailure",
      hook: "4321"
    },
    {
      type: "NewBuyer",
      hook: "1243"
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
              <Notification kind={n.type} handle={n.hook}/>
            ))
          }
        </View>
      </ScrollView>
    </Viewport>
  )
}
