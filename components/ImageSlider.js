import { SafeAreaView, Text, View, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
 
 
const VerticalSlider = ({pictures, navigation}) => {
  
  const picts = [];
  for (let p of pictures)
    if (p !== '')
      picts.push(p);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
       {/* FIXED: EB1-I14 */}
        {picts.map((item, idx) => (
          <TouchableOpacity 
            activeOpacity={1}
            style={{justifyContent: "center"}}
            key={idx}
            onPress={() =>
              navigation.navigate('showImage', {
                url: item
              })
              }
            >
            <AutoHeightImage
                width={300}
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
