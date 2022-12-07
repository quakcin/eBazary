import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import Opinion from '../components/Opinion'
import { Viewport } from '../utils/Viewport'
import {
  useFonts,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'
import { Colors } from '../utils/Colors'
import servRequest from '../utils/Server';

import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native'

export function ProfileView({ route, navigation }) 
{
  /*
  let [fontsLoaded] = useFonts
  ({
    RobotoMono_600SemiBold,
    Ubuntu_400Regular,
    Karla_400Regular
  })
  */

  const lightMode = true
  
  const isFocused = useIsFocused()


  // if (!fontsLoaded) return null

  /*
    States for website renderer
  */

    const [user, setUser] = useState('');
    const [descr, setDescr] = useState('');
    const [image, setImage] = useState('');
  
  /*
    Request user info from the server:
  */

  useEffect (() => 
  {
    console.log('userId: ', route.params.userId); 
    servRequest
    (
      'userInfo',
      {
        id: route.params.userId
      },
      (s) =>
      {
        console.log("Refreshing Data!")
        setUser(s.user.user);
        setDescr(s.user.descr);;
        setImage(s.user.image);
      },
      (e) =>
      {
        console.log('err!');
      }
    );

    return () => {
      console.log('bye');
    }

  }, [isFocused]);

  return (
    <>
      <Viewport navigation={navigation} active='Profile'>
        <ScrollView>
          <View
            style={{
              padding: 30,
              width: '100%'
            }}
          >
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 122, height: 122, borderRadius: 90 }}
              />
              <View
                style={{
                  marginLeft: 20,
                  justifyContent: 'space-around',
                  flexShrink: 1
                }}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    fontFamily: 'RobotoMono_600SemiBold',
                    color: lightMode ? Colors.dark : Colors.textColorDarkMode
                  }}
                >
                  {user}
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 13,
                    fontFamily: 'Ubuntu_400Regular',
                    color: lightMode ? Colors.dark : Colors.textColorDarkMode
                  }}
                >
                  {descr}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: lightMode
                  ? Colors.buttons
                  : Colors.buttonsDarkMode,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 25
              }}
              onPress={() => {
                navigation.navigate('MyOffersView', { userId: route.params.userId})
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular',
                }}
              >
                Moje Oferty
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: lightMode
                  ? Colors.buttons
                  : Colors.buttonsDarkMode,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 15
              }}
              onPress={() => {
                navigation.navigate('MyShoppingView')
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular',
                }}
              >
                Moje Zakupy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: lightMode
                  ? Colors.buttons
                  : Colors.buttonsDarkMode,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 15
              }}
              onPress={() => {
                navigation.navigate('EditProfileView')
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular',
                }}
              >
                Edytuj Profil
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                alignSelf: 'center',
                marginTop: 22,
                fontFamily: 'Karla_400Regular',
                fontSize: 14,
                color: lightMode ? Colors.dark : Colors.textColorDarkMode
              }}
            >
              Posiadasz{' '}
              {
                <Text
                  style={{
                    color: 'lightMode ? Colors.greenish : Colors.blueishDarkMode',
                    fontWeight: '600'
                  }}
                >
                  2
                </Text>
              }{' '}
              opinie
            </Text>

            {/*

            <Opinion
              image={serverResp.comments[0].image}
              rating={serverResp.comments[0].stars}
              message={serverResp.comments[0].msg}
            />
            <Opinion
              image={serverResp.comments[1].image}
              rating={serverResp.comments[1].stars}
              message={serverResp.comments[1].msg}
            />
            */}
          </View>
        </ScrollView>
      </Viewport>
    </>
  )
}
