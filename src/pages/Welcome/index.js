import React, {Component} from 'react'
import {
  View,
  Image,
  StyleSheet,
} from 'react-native'

import { resetNavigationTo } from '../../utils/method-helpers'
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    width:300,
    height:100,
  }
})

export default class WelcomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isJump:false
    }
  }
  componentDidMount(){
    const { navigation } = this.props
    let jumpTimer = setTimeout(()=>{
        //  this.setState({
        //    isJump:true
        //  })
        //  resetNavigationTo('Login', navigation);
        navigation.navigate('Login');

    },1000)
  }
  render(){
   return (
     <View style={styles.container}>
       <Image style={styles.logo} source={require('../../assets/cnodejs.png')} />
     </View>
   )
  }
}
