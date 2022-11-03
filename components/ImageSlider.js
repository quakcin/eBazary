import { SafeAreaView, Text, View, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
 
 
const VerticalSlider = ({pictures, navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {pictures.map((item) => (
          <TouchableOpacity 
            activeOpacity={1}
            style={{justifyContent: "center"}}
            onPress={() =>
              navigation.navigate('showImage', {
                url: item
              })
              }
            >
            <AutoHeightImage
                width={500}
                source={{uri: item}}
                style={{margin: 20}}
              />
          </TouchableOpacity>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default VerticalSlider;
