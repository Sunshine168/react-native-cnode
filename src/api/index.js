export const URL = "https://cnodejs.org/api/v1";
const TOPIC_LIMIT = 5;

/**
 * Topics
 * 获取主页主题
 * @param page 页数
 * @param tab 主题分类(不传就是获取全部)
 * @param mdrender 是否渲染为md
 */

export const fetchTopics = (params)=>{
  let url = URL + `/topics?`;
  for(let key in params){
    url += `&${key}=${params[key]}`
  }
  return new Promise((resolve,reject)=>{
      fetch(url,{
      method: 'GET',
      })
      .then(response=>response.json())
      .then((res)=>{
         resolve(res)
      })
      .catch((error)=>{
         reject(error)
      })
  })
}

/*
 获取topic详情
 */
export const fetchTopicDetail = (topicId,token)=>{
      let url = URL + `/topic/${topicId}?mdrender=false`,
          processUrl;
      if(token){
         processUrl = url + `&&accesstoken=${token}`
      }
      return new Promise((resolve,reject)=>{
        fetch(url,{
          method:'GET',
        })
        .then(response=>response.json())
        .then((res)=>{
           resolve(res)
        })
        .catch((error)=>{
          reject(error)
        })
      })
}
