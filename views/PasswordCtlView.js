
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'

export function PasswordCtlView ({ navigation }) {
  const tw = useTailwind()

  return (
    <Viewport navigation={navigation} active="ProfileView">
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            name="oldPas"
            style={styles.input}
            placeholder="Aktualne hasło"
            secureTextEntry={true}
          />
          <TextInput
            name="newPas1"
            style={styles.input}
            placeholder="Nowe hasło"
            secureTextEntry={true}
          />
          <TextInput
            name="newPas2"
            style={styles.input}
            placeholder="Powtórz nowe hasło"
            secureTextEntry={true}
          />
        </View>
        <View style={{padding: 35, marginTop: 10 }}>
          <Button
            title="Zmień hasło"
            onPress={() => console.log('Zmiana hasła')}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.info}>Utrata hasła spowoduje utratę dostępu do konta!</Text>
        </View>
      </ScrollView>
    </Viewport>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginTop: 25
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: "#bfbfbf"
  },
  info: {
    padding: 25,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
  }
});
