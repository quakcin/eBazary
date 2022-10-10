
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

export function BellView ({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active="Bell">
      <ScrollView>

        <View style={{height: 300, backgroundColor: 'red'}}>
          <Text>
            Bell View
          </Text>
        </View>
        <View style={{height: 300, backgroundColor: 'yellow'}}>
          <Text>
            Bell View
          </Text>
        </View>
        <View style={{height: 300, backgroundColor: 'cyan'}}>
          <Text>
            Bell View
          </Text>
        </View>
        <View style={{height: 300, backgroundColor: 'red'}}>
          <Text>
            Bell View
          </Text>
        </View>
        <View style={{height: 300, backgroundColor: 'red'}}>
          <Text>
            Bell View
          </Text>
        </View>
        <View style={{height: 300, backgroundColor: 'red'}}>
          <Text>
            Bell View
          </Text>
        </View>
      </ScrollView>

    </Viewport>
  )
}
