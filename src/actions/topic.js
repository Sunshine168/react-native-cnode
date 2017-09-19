//action type
import{
  GET_HOME_TOPICS,
  ADD_TOPICS_PAGE,
  GET_TOPIC_DETAIL
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

export const addPage = ()=>{
  return {type:ADD_TOPICS_PAGE}
}

export const getTopicDetail = (id)=>({
    type:GET_TOPIC_DETAIL.REQUEST,
    id:id
  })
