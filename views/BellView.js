import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import Notification from '../components/Notification'

import servRequest from '../utils/Server';

export function BellView({ route, navigation }) {
  const tw = useTailwind()

  const [notifications, setNotifications] = useState([])

  useEffect(() => 
  {
    setInterval((uid = route.params.userId) => {

      servRequest
      (
        'getNotifs',
        {
          userId: route.params.userId
        },
        (s) => 
        {
          const list = s.list;
          list.pop();
          setNotifications(list);
        },
        (e) =>
        {
          console.log('getNotifs Failed', e);
        }
      )
    }, 3000);
    // setNotifications(serverResp)
  }, [])

  return (
    <Viewport navigation={navigation} active='Bell'>
      <ScrollView>
        <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
          {notifications.map((n) => (
            <Notification
              kind={n.type} // przekazywane dane z API serwera
              source={n}
              key={n.hook}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </Viewport>
  )
}
