import React, {Component} from 'react'
import {
  View,
  Image,
  StyleSheet,
} from 'react-native'
import { resetNavigationTo } from '../../utils/method-helpers'
import { connect } from 'react-redux';
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

class WelcomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isJump:false
    }
  }
  componentDidMount(){
    const { navigation, isLoginIn } = this.props;
    let jumpTimer = setTimeout(()=>{
        //  this.setState({
        //    isJump:true
        //  })
        if(isLoginIn){
           resetNavigationTo('Home', navigation);
        }else{
           resetNavigationTo('Login', navigation);
        }
        

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

const mapStateToProps = (state)=>({
  isLoginIn:state.user.userInfo.success,
})

export default connect(mapStateToProps)(WelcomeScreen);