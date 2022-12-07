import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Viewport } from '../utils/Viewport'
import { useForm, Controller } from 'react-hook-form'
import MakePhotoWidget from '../components/MakePhotoWidget'
import RemovePhotoWidget from '../components/RemovePhotoWidget'
import SelectList from 'react-native-dropdown-select-list'
import { useState } from 'react'
import { useFonts, RobotoMono_500Medium } from '@expo-google-fonts/roboto-mono'
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu'
import { Karla_400Regular } from '@expo-google-fonts/karla'
import { Colors } from '../utils/Colors'
import servRequest from '../utils/Server';
import UUIDGenerator from 'react-native-uuid-generator';
import { Camera, CameraType } from 'expo-camera';
import { Dimensions } from 'react-native'

import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import { useEffect, createRef, useRef } from 'react';

import * as ImageManipulator from 'expo-image-manipulator';
import { useFocusEffect } from '@react-navigation/native'
import { ArrowsUpDownIcon } from 'react-native-heroicons/outline'
import { Dropdown } from 'react-native-element-dropdown'
import { v4 as uuid } from 'uuid'


export function NewOfferView({ route, navigation }) 
{
  // -- map 
  // const [disp, setDisp] = useState({current: 'cameraView'})
  const [disp, setDisp] = useState({current: 'normalView'})
  const mapRef = createRef();
  const [loc, setLoc] = useState(null);
  const [coords, setCoords] = useState({latitude: 0.2137, longitude: 0.69420});

  const [imgBuffer, setImgBuffer] = useState(Array(5).fill(null))
  const [imgIdx, setImgIdx] = useState(0);
  const [rerender, setRerender] = useState(0);

  const [tytul, setTytul] = useState('');
  const [cena, setCena] = useState('');
  const [opis, setOpis] = useState('');
  const [value, setValue] = useState(null);

  useEffect(() => 
  {
    (async () => 
    {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') 
      {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLoc(location);
    })();
  }, []);

  useEffect(() => {
    if (loc != null)
    {
      mapRef.current.animateToRegion
      ({
        latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.009, longitudeDelta: 0.009
      });
      setCoords({latitude: loc.coords.latitude, longitude: loc.coords.longitude});
    }
  }, [loc, rerender]);


  const addOffer = function (e) 
  {
    const offerId = uuid();
    servRequest
    (
      'newOffer',
      {
        userId: route.params.userId,
        offerId: offerId,
        price: cena,
        descr: opis.replaceAll('\n', ' '),
        title: tytul,
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
        kind: value
      },
      (s) =>
      {
        for (let img of imgBuffer)
        {
          if (img == null)
            continue;
          
          const imgId = uuid();

          servRequest
          (
            'addImageToOffer',
            {
              imageId: imgId,
              offerId: offerId
            },
            (s) => {}, (e) => {}
          )
          const packets = [];
          for (let i = 0; i < img.length; i += 1500)
            packets.push(img.substr(i, i + 1500));

          for (let p = 0; p < packets.length; p++)
            setTimeout((id = imgId, pc = p, pak = packets[p]) => {
              servRequest
              (
                'uploadImage',
                {
                  imageId: id,
                  packetId: pc,
                  content: pak
                },
                (s) => 
                {
                  console.log('finished uploading image!', id)
                },
                (e) =>
                {
                  console.log('failed to upload image', id, e);
                }
              )
            }, p * 500);
        }
        Alert.alert(
          "Dodano ogłoszenie",
          "Pomyślnie ogłoszenie w serwisie e-Bazary",
          [
            { text: "OK", onPress: () => { navigation.navigate("OfferView", { userId: route.params.userId, offerId: offerId }) } }
          ])
      },
      (e) =>
      {
        console.log('newOffer', e);
      }
    )
    setTytul("")
    setOpis("")
    setCena("")
  }

  const data = [
    { label: 'Dom' },
    { label: 'Elektronika' },
    { label: 'Moda' },
    { label: 'Motoryzacja' },
    { label: 'Inna' }
  ]

  /*
  mapRef.current?.animateToRegion
  ({
    latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.009, longitudeDelta: 0.009
  });
  setCoords({latitude: loc.coords.latitude, longitude: loc.coords.longitude});  
  */
  const normalView = function ()
  {
    return (
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'column',
              width: '70%',
              paddingTop: 25,
              paddingBottom: 25,
            }}
      >
            <TextInput
              style={[styles.defaultInput, styles.shortInput]}
              onChangeText={setTytul}
              value={tytul}
              placeholder='Tytuł'
            />
            <Dropdown
              style={{margin: 10, marginLeft: 0, height: 50, borderBottomWidth: 2}}
              placeholderStyle={{fontSize: 14}}
              selectedTextStyle={{fontSize: 14 }}
              data={data}
              search={false}
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder="Wybierz kategorię"r
              value={value}
              onChange={item => setValue(item.label)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25
              }}
            >
              <TextInput
                style={[
                  styles.defaultInput,
                  styles.shortInput,
                  { width: '85%', borderBottomRightRadius: 0 }
                ]}
                keyboardType='numeric'
                onChangeText={setCena}
                value={cena}
                placeholder='Cena'
              />
              <View style={{ width: '15%', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>PLN</Text>
              </View>
            </View>
              <TextInput
                placeholder='Opis (max 500 znaków)'
                style={[
                  styles.defaultInput,
                  styles.longInput,
                  { marginTop: 40, marginBottom: 30, border: 0, borderRadius: 0, borderLeftWidth: 5, borderColor: '#424242', backgroundColor: '#f4f4f4' }
                ]}
                textAlign={'left'}
                textAlignVertical={'top'}
                multiline={true}
                onChangeText={setOpis}
                value={opis}
              />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 20
              }}
            >
              {imgBuffer.map((n, i) => (
                n == null
                  ? <TouchableOpacity
                      onPress={(e, z = i) => graspImage(e, z)}
                      key={'z' + i}
                    >
                      <MakePhotoWidget key={'a' + i} />
                    </TouchableOpacity>
                  : <RemovePhotoWidget uri={n} key={'b' + i} />
                ))
              }
            </View>

            { /* -- */ }
            <View>
                <MapView 
                  ref = { mapRef }
                  style = {{
                    width: '100%',
                    height: 200,
                    marginTop: 60,
                    marginBottom: 30
                  }}
                  initialRegion = {{
                    latitude: 21,
                    longitude: 51,
                    latitudeDelta: 0.0009,
                    longitudeDelta: 0.0009
                  }}
                >
                  <MapView.Marker
                      coordinate={coords}
                      title={"Lokalizacja"}
                      description={"Widoczna w ofercie."}
                  />
                </MapView>
            </View>
            { /* -- */ }

            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: Colors.buttons,
                paddingHorizontal: 45,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 25
              }}
              onPress={addOffer}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  fontFamily: 'Karla_400Regular'
                }}
              >
                Dodaj Ogłoszenie
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }


  // --------------------------------------------------------------------------------
  // -- Camera Things

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cam, setCam] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePic = async () =>
  {
    const photo = await cam.takePictureAsync();
    console.log(photo.uri);
    console.log('imm: ', ImageManipulator);

    const manipResult = await ImageManipulator.manipulateAsync
    (
      photo.uri,
      [
        { 
          resize: { width: (Dimensions.get('window').width * 512) / Dimensions.get('window').height, height: 512 } 
        }
      ],
      { 
        format: ImageManipulator.SaveFormat.JPEG, 
        compress: 0.25,
        base64: true
      }
    );

    const imgr = manipResult.base64;

    setImgBuffer(imgBuffer.map((n, i) => 
      i == imgIdx
        ? `data:image/jpeg;base64,${imgr}`
        : n));

    setDisp({current: 'normalView'})
    setRerender(rerender + 1);
  }

  const cameraView = function () 
  {
    console.log('accessing camera');
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} onPress={(e) => console.log(this) } ref={(r) => setCam(r)}>
          <View style={{flex: 2}}>
            <TouchableOpacity style={{}} onPress={toggleCameraType}>
              <ArrowsUpDownIcon style={{color: '#ffffff', marginTop: 30, marginLeft: 20}} width={50} height={50}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={(e) => {
                takePic();
              }}
            >
              <View style={{ width: 80, height: 80, borderRadius: 360, borderColor: '#ffffff', borderWidth: 6}}></View>
            </TouchableOpacity>
          </View>
        </Camera>
        <Text>Contajner</Text>
      </View>
    );
  }

  const graspImage = function (e, idx)
  {
    setImgIdx(idx);
    setDisp({current: 'cameraView'});
  }

  // const [disp, setDisp] = useState({current: cameraView})

  const dispMap = {
    cameraView: cameraView,
    normalView: normalView
  };

  console.log('displaying: ', disp);

  return (
    <Viewport navigation={navigation} active='NewOffer'>
      <View style={{width: '100%'}} >
        {(disp.current !== undefined 
          ? dispMap[disp.current]() 
          : <Text>Please wait</Text>
        )}
      </View>
    </Viewport>
  )
}

const styles = StyleSheet.create({
  defaultInput: {
    fontFamily: 'Ubuntu_400Regular',
    marginBottom: 15
  },

  shortInput: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#424242',
    paddingHorizontal: 20,
    borderRadius: 5
  },

  longInput: {
    width: '100%',
    minHeight: 150,
    height: 150,
    maxHeight: 150,
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15
  },

  container: {
    justifyContent: 'center',
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: 'red'
  },
  camera: {
    width: '100%',
    backgroundColor: 'red',
    height: Dimensions.get('window').height
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
})
