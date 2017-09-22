import React, {Component} from 'react';
import {View, Text, StyleSheet,Picker} from 'react-native';
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

 class TopicPostScreen extends Component {
  static navigationOptions = {
    title: '发帖'
  }
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      context: "",
      titleValidationMessage: "",
      contextValidationMessage: "",
      tab:"dev"
    }
  }
  _postTopic = () =>{
 
     const {
       title,
       context,
       tab,
     } = this.state;
     const {
      postTopicRequest
     } = this.props;
     if(title.trim().length == 0){
        this.setState({
          titleValidationMessage:"标题不能为空"
        })
     }else{
       this.setState({
        titleValidationMessage:""
       })
     }
     if(context.trim().length == 0){
          this.setState({
            contextValidationMessage:"内容不能为空",
          })
     }else{
        this.setState({
          contextValidationMessage:""
        })
     }
     postTopicRequest({
      title,
      context,
      tab,
     })
  }
  render() {
    const {
      titleValidationMessage,
      contextValidationMessage
    }  = this.state;
    return (
      <View style={style.container}>
        <TabHeaderBar title={"发帖"}/>
        <View style={style.fromContainer}>
          <FormLabel>标题</FormLabel>
          <FormInput 
          inputStyle={{
            fontSize:20,
          }}
          onChangeText={(text) => this.setState({title: text})}
          placeholde = {"请输入标题"}
          />
          {titleValidationMessage 
            ? <FormValidationMessage>{titleValidationMessage}</FormValidationMessage>
            : null
}
          <FormLabel>内容</FormLabel>
          <FormInput 
          inputStyle={{
            fontSize:18,
            height:100,
          }}
          onChangeText={(text) => this.setState({text: text
          })}
          multiline = {true}
          placeholde = {"请输入内容"}
          /> 
          {contextValidationMessage
            ? <FormValidationMessage>{contextValidationMessage}</FormValidationMessage>
            : null
} 
<FormLabel>帖子类型</FormLabel>     
<Picker
  selectedValue={this.state.tab}
  onValueChange={(tab) => this.setState({tab})}>
  <Picker.Item label="测试" value="dev" />
  <Picker.Item label="问答" value="ask" />
  <Picker.Item label="分享" value="share" />
</Picker>  
      <View style={style.control}>
      <Button
      icon={{name: 'squirrel', type: 'octicon'}}
      title='OCTICON' 
      onPress = {this._postTopic}
      />
        </View>
        </View>
      </View>
    )
  }
}


const mapDispatchToProps = (dispatch) =>({
  postTopicRequest:(params)=>dispatch(postTopicRequest(...params))
})
const mapStateToProps = (state)=>({
  isLogin:state.user.userInfo.success,
})
export default connect(mapStateToProps,mapDispatchToProps)(TopicPostScreen)