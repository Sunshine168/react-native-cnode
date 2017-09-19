import React, { Component } from 'react'
import { TopicListItem } from '../../components/TopicListItem'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { getTopics, addPage } from '../../actions/topic';
import { connect } from 'react-redux';
const TopicKey =  [{ key: 'all', value: '全部' },
{ key: 'good', value: '精华' },
{ key: 'share', value: '分享' },
{ key: 'ask', value: '问答' },
{ key: 'dev', value: '测试' }];
const TOPIC_LIMIT = 10;
class TopicScreen extends  Component {
  static navigationOptions = {
    title: '话题',
  }
  constructor(props){
    super(props)
    this.state = {
      activeKey:'all',
      tab:"all",
      topics:[],
      page:0,
    }
  }
   componentDidMount(){
    this.fetchTopics()
    }
    fetchTopics = () =>{
      console.log("..fetch")
    const { getTopics } = this.props;
    getTopics({
      mdrender:"false",
      limit:TOPIC_LIMIT,
    })
  }
  getTabs = () =>{
    let { activeKey, tab } = this.state;
    return (
      TopicKey.map((item,index)=>(
        <TouchableOpacity key={item.key}>
          <View style={[styles.tabView, item.key == tab ? styles.tabActive : null]}>
            <Text style={[styles.tabText, item.key == tab ? styles.textActive : null]}>{item.value}</Text>
          </View>
        </TouchableOpacity>
      ))
    )
  }
  renderItem = ( topic ) => {
    const { navigatie } = this.props;

    return (
      <TopicListItem
        key={topic.id}
        naigatie={navigatie}
        topic={topic}
      />
    );
  };

  render(){
    //测试
    let { isPendingTopics,topics } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.tabsView}>
          {this.getTabs()}
        </View>
        <FlatList
          refreshing={isPendingTopics}
          onRefresh={this.fetchTopics}
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={false}
          data={topics}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    flexDirection:"column",
    paddingLeft:15,
    paddingRight:15
  },
  text:{
    fontSize:14,
    flex:1,
  },
  tabsView:{
  backgroundColor: '#FFFFFF',
   flexDirection: 'row',
   justifyContent: 'space-around',
   borderBottomWidth: 0.5,
   borderColor: '#F0F0F0',
 },
  tabView: {
    padding: 15,
  },
  tabText: {
    fontSize: 14,
  },
  tabActive: {
    borderBottomWidth: 1.5,
    borderColor: '#4181DE',
  },
  textActive: {
    fontWeight: 'bold',
    color: '#4181DE',
  }
})


const mapStateToProps = (state) =>({
  topics:state.topic.topics,
  isPendingTopics:state.topic.isPendingTopics,
})
const mapDispatchToProps = (dispatch,getState) => ({
  getTopics:params => dispatch(getTopics(params))
})


export default connect(mapStateToProps,mapDispatchToProps)(TopicScreen);
