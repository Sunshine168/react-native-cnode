import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
const { width } = Dimensions.get('window')
const style = StyleSheet.create({
  container:{
     height:60,
     width:width,
     alignItems:"center",
     justifyContent:"center",
     backgroundColor:"#F4F4F4",
     paddingTop:Platform.OS === 'ios' ? 20 : 0,
     paddingBottom:Platform.OS === 'ios' ? 10 : 0,
    //  flex:1,
  },
  title:{
    fontSize:18,
  }
})

export const TabHeaderBar = (props)=>{
  let { title } = props;
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
    </View>
  )
}
