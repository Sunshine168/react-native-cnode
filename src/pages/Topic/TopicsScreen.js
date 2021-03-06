import React, {Component} from 'react'
import {TopicListItem} from '../../components/TopicListItem'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Platform
} from 'react-native';
import {connect} from 'react-redux';
import {getTopics, addPage} from '../../actions/topic';
const TopicKey = [
  {
    key: 'all',
    value: '全部'
  }, {
    key: 'job',
    value: '招聘'
  }, {
    key: 'share',
    value: '分享'
  }, {
    key: 'ask',
    value: '问答'
  }, {
    key: 'dev',
    value: '测试'
  }
];
const TOPIC_LIMIT = 15;
class TopicsScreen extends Component {
  static navigationOptions = {
    title: '话题'
  }
  constructor(props) {
    super(props)
    this.state = {
      activeKey: 'all',
      tab: "all",
      topics: [],
      page: 0
    }
  }
  componentDidMount() {
    this.fetchTopics()
  }
  fetchTopics = () => {
    const {getTopics, isPendingTopics} = this.props, {tab} = this.state;
    if (isPendingTopics) {
      return;
    }
    if (tab == 'all') {
      getTopics({mdrender: "false", limit: TOPIC_LIMIT})
    } else {
      getTopics({mdrender: "false", limit: TOPIC_LIMIT, tab: tab})
    }

  }
  getTabs = () => {
    let {activeKey, tab} = this.state;
    return (TopicKey.map((item, index) => (
      <TouchableOpacity
        key={item.key}
        onPress={() => {
        this.setState({activeKey: item.key, tab: item.key})
      }}>
        <View
          style={[
          styles.tabView, item.key == tab
            ? styles.tabActive
            : null
        ]}>
          <Text
            style={[
            styles.tabText, item.key == tab
              ? styles.textActive
              : null
          ]}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )))
  }
  renderItem = (topic) => {
    const {navigation} = this.props;
    const {tab} = this.state;
    if (tab == 'all') {
      return (<TopicListItem
        key={topic.id}
        navigation={navigation}
        topic={topic}
        activeKey={tab}/>);
    } else {
      return (tab == topic.item.tab
        ? <TopicListItem
            key={topic.id}
            navigation={navigation}
            topic={topic}
            activeKey={tab}/>
        : null)
    }
  };

  render() {
    //测试
    let {isPendingTopics, topics} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.tabsView}>
          {this.getTabs()}
        </View>
        <FlatList
          refreshing={isPendingTopics}
          onRefresh={this.fetchTopics}
          contentContainerStyle={{
          flexGrow: 1
        }}
          removeClippedSubviews={false}
          data={topics}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    fontSize: 14,
    flex: 1
  },
  tabsView: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
    marginTop: Platform.OS === 'ios'
      ? 20
      : 0
  },
  tabView: {
    padding: 15
  },
  tabText: {
    fontSize: 14
  },
  tabActive: {
    borderBottomWidth: 1.5,
    borderColor: '#4181DE'
  },
  textActive: {
    fontWeight: 'bold',
    color: '#4181DE'
  }
})

const mapStateToProps = (state) => ({topics: state.topic.topics, isPendingTopics: state.topic.isPendingTopics})
const mapDispatchToProps = (dispatch, getState) => ({
  getTopics: params => dispatch(getTopics(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicsScreen);
