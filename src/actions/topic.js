//action type
import{
  GET_HOME_TOPICS,
  GET_TOPIC_DETAIL,
  POST_TOPIC,
}from './topic.type'


import {
  fetchTopics
}from '../api/index'


//action
export const getTopics = (params) => {
  return {
    type:GET_HOME_TOPICS.REQUEST,
    ...params,
  }
}


export const getTopicDetail = (id)=>({
    type:GET_TOPIC_DETAIL.REQUEST,
    id:id
  })


  export const postTopicRequest = (params)=>({
    type:POST_TOPIC.REQUEST,
    ...params
  })
