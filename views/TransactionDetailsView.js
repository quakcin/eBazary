
import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View, Button, Touchable, TouchableOpacity, TextInput } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Viewport } from '../utils/Viewport'
import { useEffect, useState } from 'react'

import { BanknotesIcon, NoSymbolIcon, ShoppingBagIcon, StarIcon } from 'react-native-heroicons/outline'

export function TransactionDetailsView ({ navigation, route }) 
{
  const tw = useTailwind()

  const genSuccesHeader = (src) => {
    return (
      <>
        <View>
          <Text style={{textAlign: 'center', width: '90%', marginLeft: '5%'}}>
            <Text>
              Dnia {src.details.date} dokonałeś/aś zakupu od użytkownika
            </Text>
            <Text style={{color: '#c7265e'}}>
              {"  "} {src.details.user} {"  "}
            </Text>
            <Text>
              - {src.details.seller} 
            </Text>
          </Text>
        </View>
      </>
    )
  }

  const genFailHeader = (src) => {
    return (
      <>
        <View>
          <Text style={{textAlign: 'center', width: '90%', marginLeft: '5%'}}>
            Próba dokonania zakupu w dniu {src.details.date} od użytkownika
            <Text style={{textAlign: 'center', color: '#c7265e'}}>
              {"  "} {src.details.user} {"  "}
            </Text>
            <Text style={{textAlign: 'center'}}>
              nie powiodła się.  
            </Text>
            <Text style={{textAlign: 'center', color: '#ff2e2e'}}>
              {"\n"} {src.details.reason}
            </Text>
            <Text style={{textAlign: 'center'}}>
              !
            </Text>
          </Text>
        </View>
      </>
    )
  }

  const genBuyerHeader = (src) => {
    return (
      <>
        <View>
          <Text style={{textAlign: 'center', width: '90%', marginLeft: '5%'}}>
            <Text>
              Dnia {src.details.date} użytkownik  
            </Text>
            <Text style={{color: '#c7265e'}}>
              {"  "} {src.details.buyer.user} {"  "}
            </Text>
            <Text>
              dokonał/a u ciebie zakupu.
            </Text>
          </Text>
        </View>
      </>
    )
  }

  // TODO: Move me into separate container type beat
  const genItemList = (items) => {

    const summedItems = [
      ...items.map((n) => { return {name: n.name, price: n.price, w: 'normal'} }), 
      {name: "RAZEM", price: items.map((n) => parseFloat(n.price)).reduce((sum = 0, n) => sum += n), w: 'bold'}
    ];

    return (
      <View>
      {summedItems.map((n) => (
        <View style={{width: '70%', marginLeft: '15%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 12, fontWeight: n.w}}>{n.name}</Text>
          </View>
          <View>
            <Text style={{fontSize: 12, fontWeight: n.w}}>{n.price}zł</Text>
          </View>
        </View>
      ))}
      </View>
    )
  }

  const [starsCount, setStarsCount] = useState(3);

  const genStars = () => 
  {
    const stars = [];
    for (let i = 0; i < 5; i++)
      stars.push(
        <TouchableOpacity>
          <StarIcon
            style={{color: i <= starsCount ? '#f7ab39' : '#878787'}}
            width="25" height="25"
            onPress={() => setStarsCount((i))}
          />
        </TouchableOpacity>
      )
    return stars;
  }

  const [opinion, setOpinion] = useState("");

  const genSuccesFooter = (src) =>
  {
    return (
      <View>
        <View style={{marginTop: 25, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
          {   genStars().map((n) => (n))   }
        </View>
        <View style={{marginTop: 25}}>
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              width: '80%',
              height: 150,
              marginLeft: '10%',
              padding: 10,
              textAlignVertical: 'top'
            }}
            multiline={true}
            value={opinion}
            onChangeText={(t) => setOpinion(t)}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => console.log('opinia: ', opinion, 'gwiazdki', starsCount)}
          >
            <Text style={{backgroundColor: '#bfbfbf', width: '80%', marginLeft: '10%', textAlign: 'center', padding: 8, marginTop: 25, marginBottom: 50}}>
              Dodaj Opinię
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const genBuyerFooter = (src) =>
  {
    const fields = Object.keys(src.details.buyer).map((n) => n === "user" 
      ? <Text style={{fontWeight: 'bold'}}>Szczegóły kupującego:</Text> 
      : src.details.buyer[n]);

    return (
      <View>
        {fields.map((n) => (
          <Text style={{textAlign: 'center'}}>{n}</Text>
        ))}
      </View>
    )
  }

  const genFooter = {
    TransactionSuccess: genSuccesFooter,
    TransactionFailure: (src) => <Text></Text>,
    NewBuyer: genBuyerFooter
  }

  const genHeader = {
    TransactionSuccess: genSuccesHeader,
    TransactionFailure: genFailHeader, 
    NewBuyer: genBuyerHeader
  }

  const genIcons = {
    TransactionSuccess: <ShoppingBagIcon style={{color: '#4bdb74'}} width="50" height="50" />,
    TransactionFailure: <NoSymbolIcon style={{color: '#e33939'}} width="50" height="50" />,
    NewBuyer: <BanknotesIcon style={{color: '#4bdb74'}} width="50" height="50" />
  }

  return (
    <Viewport navigation={navigation} active="Bell">
      <ScrollView>
        <View style={{alignSelf: 'center', alignItems: 'center', marginTop: 25, borderRadius: 100, width: 70, height: 70, justifyContent: 'center', backgroundColor: 'white'}}>
          {genIcons[route.params.source.type]}
        </View>
        <View style={{marginTop: 25}}>
          {genHeader[route.params.source.type](route.params.source)}
        </View>
        <View style={{width: '100%', backgroundColor: '#ffffff', marginTop: 25}}>
          <View style={{marginTop: 25, marginBottom: 25}}>
            {genItemList(route.params.source.details.items)}
          </View>
        </View>
        <View style={{marginTop: 25, marginBottom: 50}}>
          {genFooter[route.params.source.type](route.params.source)}
        </View>
      </ScrollView>
    </Viewport>
  )
}
