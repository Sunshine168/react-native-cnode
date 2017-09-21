import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import { TabHeaderBar } from '../../components/TabHeaderBar';
import { Button } from 'react-native-elements';
import { postTopicRequest } from '../../actions/topic';
import { connect } from 'react-redux'; 
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'column'
  },
  TestTitle: {},
  fromContainer: {
    flex: 1
  },
  control:{
    marginTop:50,
  }
})

export default class TopicPostScreen extends Component {
  static navigationOptions = {
    title: '发帖'
  }
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      context: "",
      titleValidationMessage: "",
      contextValidationMessage: ""
    }
  }
  render() {
    return (
      <View style={style.container}>
        <TabHeaderBar title={"发帖"}/>
        <View style={style.fromContainer}>
          <FormLabel>标题</FormLabel>
          <FormInput onChangeText={(text) => this.setState({title: text})}/>
          {this.state.titleValidationMessage
            ? <FormValidationMessage>{titleValidationMessage}</FormValidationMessage>
            : null
}
          <FormLabel>内容</FormLabel>
          <FormInput 
          onChangeText={(text) => this.setState({text: text
          
          })}
          multiline = {true}
          /> 
          {this.state.contextValidationMessage
            ? <FormValidationMessage>{contextValidationMessage}</FormValidationMessage>
            : null
}       
      <View style={style.control}>
      <Button
      icon={{name: 'squirrel', type: 'octicon'}}
      title='OCTICON' 
      />
        </View>
        </View>
      </View>
    )
  }
}


const mapDispatchToProp = (dispatch) =>({
  postTopicRequest:(params)=>dispatch(postTopicRequest(...params))
})