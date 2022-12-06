import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity
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


export function NewOfferView({ navigation }) 
{
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  
  // -- map 
  const [disp, setDisp] = useState({current: 'normalView'})
  const mapRef = createRef();
  const [loc, setLoc] = useState(null);
  const [coords, setCoords] = useState({latitude: 0, longitude: 0});

  const [imgBuffer, setImgBuffer] = useState(Array(5).fill(null))
  const [imgIdx, setImgIdx] = useState(0);

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

    // TODO: Fix map
    if (loc != null && mapRef.current != null)
    {
      mapRef.current.animateToRegion
      ({
        latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.009, longitudeDelta: 0.009
      });
      setCoords({latitude: loc.coords.latitude, longitude: loc.coords.longitude});
    }
  }, []);

  const onSubmit = (data) => console.log('subm', data)

  const [selected, setSelected] = useState('')
  const data = [
    { key: '1', value: 'Wszystkie' },
    { key: '2', value: 'Dom' },
    { key: '3', value: 'Elektronika' },
    { key: '4', value: 'Moda' },
    { key: '5', value: 'Motoryzacja' },
    { key: '6', value: 'Pozostałe' }
  ]

  const normalView = () => (
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
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.defaultInput, styles.shortInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Tytuł'
              />
            )}
            name='tytul'
          />
          {errors.tytul && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Tytuł jest wymagany!
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, selected } }) => (
              <SelectList
                setSelected={setSelected}
                onBlur={onBlur}
                onChangeText={onChange}
                data={data}
                search={false}
                placeholder={'Kategoria'}
                boxStyles={{
                  borderRadius: 0,
                  borderWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  marginTop: 15,
                  fontFamily: 'Ubuntu_400Regular'
                }}
                dropdownStyles={{
                  borderRadius: 5,
                  borderWidth: 2,
                  fontFamily: 'Ubuntu_400Regular'
                }}
                inputStyles={{
                  fontFamily: 'Ubuntu_400Regular'
                }}
              />
            )}
            name='kategoria'
          />
          {errors.kategoria && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Kategoria jest wymagana!
            </Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 25
            }}
          >
            <Controller
              control={control}
              rules={{
                required: 'Cena jest wymagana!',
                pattern: {
                  value: /^\d+(\.\d{1,10})?$/,
                  message: 'Niepoprawna cena!'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.defaultInput,
                    styles.shortInput,
                    { width: '85%', borderBottomRightRadius: 0 }
                  ]}
                  keyboardType='numeric'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Cena'
                />
              )}
              name='cena'
            />

            <View style={{ width: '15%', alignItems: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 14 }}>PLN</Text>
            </View>
          </View>

          {errors.cena?.message && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              {errors.cena?.message}
            </Text>
          )}
          {errors.cena?.required && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              {errors.cena?.required}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
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
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='opis'
          />
          {errors.opis && (
            <Text
              style={{
                color: Colors.reddish,
                fontWeight: '500',
                fontSize: 13,
                marginTop: 6
              }}
            >
              Opis jest wymagany!
            </Text>
          )}

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
            onPress={handleSubmit(onSubmit)}
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
  }

  const cameraView = function () 
  {
    console.log('accessing camera');
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} onPress={(e) => console.log(this) } ref={(r) => setCam(r)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
              <Button 
                title="Take Pick"
                onPress={(e) => {
                  takePic();
                }}
              />
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
      <View style={{width: '100%', height: 500}} >
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
