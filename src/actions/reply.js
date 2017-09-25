import { REPLY_TOPIC } from './reply.type';
export const postReply = (params)=>({
    ...params,
   type:REPLY_TOPIC.REQUEST,
})