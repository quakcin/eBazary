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

  const fallBackImage = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gBqTm8gaW1hZ2UgYXZhaWxhYmxlIHNpZ24uIEludGVybmV0IHdlYiBpY29uIHRvIGluZGljYXRlIHRoZSBhYnNlbmNlIG9mIGltYWdlIHVudGlsIGl0IHdpbGwgYmUgZG93bmxvYWRlZC7/2wBDAB4UFhoWEx4aGBohHx4jLEowLCkpLFtBRDZKa15xb2leaGZ2haqQdn6hgGZolMqWobC1v8C/c47R4M+53qq7v7f/2wBDAR8hISwnLFcwMFe3emh6t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7f/wgARCABAAEADAREAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB9EAIGUAAZnMUAjpLAxOcYyTpNQMTmNQMjqNQEZAAGowJJGICigEIQAUMBCAAGM//xAAgEAACAQMFAQEAAAAAAAAAAAAAARECECEDEhMgMjFB/9oACAEBAAEFAryTnpU4W+oSqGqkTBS5VtTzTmqpy6HDqw9PzbU8rDdO4S220/Nnk40caONHGj5dmT9yZF0kkknrBBBF/wD/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAEDAQE/AQH/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAECAQE/AQH/xAAbEAACAgMBAAAAAAAAAAAAAAAAEQEwAiExUP/aAAgBAQAGPwKro2hmpueI58T/xAAgEAADAAEEAwEBAAAAAAAAAAAAAREhEDFBYSBRcbHh/9oACAEBAAE/IdZrUbhOGU/HPrQNexzTcFnNLh5OcEt6/sLBMc3oYlcMSq8H9hoP0UU34E5vxDdbfvwUSRn1O1naz6iSSLVLBBp/Bs5LXf8ACudXgg24GZE6rq1SCCSNf//aAAwDAQACAAMAAAAQAEAAEkAAEgAAEkgAAkkAAkggEEkgEkkg/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAwEBPxAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAgEBPxAB/8QAJRABAAICAQQBBAMAAAAAAAAAAQARITEQQWFxkVEggcHwseHx/9oACAEBAAE/EOWqo2o1BAxGrN/Sz7LoneeiXeJkqlyudegtUSMqMOiKqU6edfhB0Rcy9nCoPibyLSQR9DiavLz/ABo5O1cBiOymkY7Ws0uVju7VzV5eVJ2PSd/3hdj2z/Zne94ZCg0cu6YTI/DAAwj0pwZzcRhYnNeH+pRBkoW3pzf4jQLbvzj9MIGz9zlUV6QaqvP7+IlTsXAFAtEK+9ShtKx13dwCGnkBTNeNCb+Zvw57zsvvvc7T5uBRXH//2Q==`;


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
    console.log('override: ', route.params.profileOverride);

    const override = route.params.profileOverride;
    navigation.setParams({userId: route.params.userId, profileOverride: null})

    servRequest
    (
      'userInfo',
      {
        id: override == null ? route.params.userId : override
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
                source={{ uri: image !== '' ? image : fallBackImage }}
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
