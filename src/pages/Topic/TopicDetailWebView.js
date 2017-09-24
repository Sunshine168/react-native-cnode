import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  WebView,
  Button,
  TextInput,
} from 'react-native';
import { getTopicDetail } from '../../actions/topic';
import { TopicLabel } from '../../components/TopicListItem';
import { connect } from 'react-redux';
import { MarkdownView } from 'react-native-markdown-view';
import { FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements';
const URL = "https://cnodejs.org"
class TopicDetailScreen extends Component {
  static navigationOptions = ({ navigation })=>{
  console.log(navigation)
  return {
  }
}
  constructor(props){
    super(props)
    this.state = {
      url:"",
      isReplying:false,
    }
  }
  _reload=()=> {
    console.log(this)
        this.webview.reload();
    }
_injectJS = () => {
  const script = `
    var navBar = $('.navbar')[0];
        $(navBar).hide()
    `;
    if (this.webview) {
      this.webview.injectJavaScript(script);
    }
}
componentDidMount(){
   const { navigation,getTopicDetail } = this.props,
         { state } = navigation,
         { params } = state,
         { id } = params;
        //  getTopicDetail(id);
        let url = URL + `/topic/${id}`
        this.setState({
          url:url,
          scalesPageToFit:true,
        })
        getTopicDetail(id);
}
_setReplying = ()=>{
  this.setState({
    isReplying:true,
  })
  //getTopicDetail
  
}
_getHeader(){
      let {
        good,
        top,
        tab,
        is_collect,
        author
      } = this.props.topic,
      topicLabelType = {
          good,
          tab,
          top
      };
    return (
      <View style={style.header}>
        <TopicLabel
          type={topicLabelType}
        />

        <TouchableOpacity>
          <View style={style.author}>
            <Image
              style={style.avatar}
              source={{uri:author.avatar_url}}
            />
            <Text>{author.loginname}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
    )
    }
   _getFooter(){
    let {
      create_at,
      replies,
      visit_count
    } = this.props.topic;
    return (
      <View style={style.footer}>
        <Text style={style.createAt}>
          {create_at}
        </Text>
        <Text style={style.visitCount}>
          {visit_count}
        </Text>
      </View>
    )
   }
    render(){
      const { replying } = this.state,
      { topic } = this.props;
      return (
        <View style={style.container}>
          <WebView
            ref={webview => { this.webview = webview; }}
            source={{
              uri: this.state.url,
              method:"GET"
            }}
            startInLoadingState={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            style={style.contenWeb}
            onLoad={this._injectJS}
            scalesPageToFit={this.state.scalesPageToFit}
          />
        { ! replying 
        ? <View style={style.controlGroup}>
          {topic.is_collect?  
          <TouchableOpacity style={style.iconContainer}>
          <Icon
            name='star'
            type='font-awesome'
            color='#FF6347'
            size={32}
            />
          </TouchableOpacity> 
          :
          <TouchableOpacity style={style.iconContainer}>
          <Icon
            name='star-o'
            type='font-awesome'
            color='#BEBEBE'
            size={32}
            />
          </TouchableOpacity>}

            <TouchableOpacity style={style.iconContainer}>
            <Icon
            name='message-outline'
            type='material-community'
            color='#BEBEBE'
            size={32}
            iconStyle={style.iconContainer}
            />
            </TouchableOpacity>
            <TouchableOpacity style={style.reloadContainer} onPress={this._reload}>
             <Icon
            name='refresh'
            type='material-community'
            color='#1771fb'
            size={32}
     />
       </TouchableOpacity>
           
        </View>
        :<View style={style.controlGroup}>
         <View style={style.replyFrom}>
         <FormInput
          onChangeText={this._reply}
          />
          {/* <FormValidationMessage>{this.state.replyError}</FormValidationMessage> */}
         </View>
         <Button
          title='回帖' 
          onPress = {()=>{

          }}
  />
          </View>
          }

        
        </View>
      )
    }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    flexDirection:"column",
  },
  wrapper:{
    flex:1,
    
  },
  header:{
    // flex:1,
    backgroundColor:"#EEE9E9",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:5,
    paddingBottom:5,
  },
  collectLogo:{
    width:30,
    height:30
  },
  collectedLogo:{
    tintColor:"#FFFF00",
  },
  author:{
    // flex:1,
    alignItems:"center",
    flexDirection:"row",
  },
  title:{
    // flex:1,
    fontSize:24,
    padding:10,
  },
  avatar:{
    width:30,
    height:30,
  },
  footer:{
    // flex:1
  },
  loading:{
    marginTop:200,
    alignItems:"center",
    justifyContent:"center",
  },
  statusBar:{
    marginTop:20,
  },
  contentWrapper:{
    paddingLeft:20,
    paddingRight:20,
  },
  replyFrom:{
    flex:1,
    height:40,
  },
  controlGroup:{
    position:"relative",
    padding:10,
    flexDirection:'row',
    justifyContent:"flex-start",
  },
  iconContainer:{
    marginLeft:10,
  },
  reloadContainer:{
    position:"absolute",
    top:10,
    right:10,
  }
})

const mapStateToProps = (state)=>({
  topic:state.topic.topic,
  isPendingTopic:state.topic.isPendingTopic,
  currentTopicDetailId:state.topic.currentTopicDetailId,
})
const mapDispatchToProps = (dispatch)=>({
    getTopicDetail:(id)=>dispatch(getTopicDetail(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(TopicDetailScreen)
