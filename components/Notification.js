import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  StarIcon,
  EyeIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  MegaphoneIcon
} from 'react-native-heroicons/outline'
import { useTailwind } from 'tailwind-rn'

export default function Notification ({ kind, source, navigation })
{
  const tw = useTailwind()

  const iconSize = 40;

  const kinds = {
    NewOpinion: {
      title: "Dodano opinię na twój temat",
      subtitle: "Kliknij tutaj aby zobaczyć",
      icon: <StarIcon width={iconSize} height={iconSize} style={{color: '#000000'}}/>
    },
    NewViews: {
      title: "Ktoś odwiedził twój profil",
      subtitle: "Oby tak dalej!",
      icon: <EyeIcon width={iconSize} height={iconSize} style={{color: '#000000'}}/>
    },
    TransactionSuccess: {
      title: "Pomyślnie dokonano zakupu",
      subtitle: "Kliknij tutaj po więcej informacji.",
      icon: <HeartIcon width={iconSize} height={iconSize} style={{color: '#000000'}}/>
    },
    TransactionFailure: {
      title: "Zakup nie powiódł się",
      subtitle: "Spróbuj ponownie później",
      icon: <ExclamationTriangleIcon width={iconSize} height={iconSize} style={{color: '#000000'}}/>
    },
    NewBuyer: {
      title: "Ktoś kupił twój produkt",
      subtitle: "Zobacz kto",
      icon: <MegaphoneIcon width={iconSize} height={iconSize} style={{color: '#000000'}}/>
    }
  }

  return (
    <View style={{marginTop: 15}}>
      <TouchableOpacity
        onPress={() => {
          console.log(source);
          if (["TransactionSuccess", "TransactionFailure", "NewBuyer"].includes(source.type))
          {
            navigation.navigate({name: "TransactionDetailsView", merge: true, params: { source: source}});
          }
        }}
      >
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <View style={{marginRight: 10}}>
            {kinds[kind].icon}
          </View>
          <View style={{alignContent: 'center'}}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {kinds[kind].title}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>
                {kinds[kind].subtitle}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

