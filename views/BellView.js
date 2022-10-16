
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

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

  return (
    <Viewport navigation={navigation} active="Bell">
      <ScrollView>
      </ScrollView>
    </Viewport>
  )
}
