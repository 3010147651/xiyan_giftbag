import {service,service3,service6} from "../request";

//授权接口
export const getAuthorize =(uin,key)=>service3.post("/api/v1/pri/cammy/sy_cammy",{
    uin,
    key
})

//查询用户是否为授权用户
export const getUserById =(uin)=>service3.post("/api/v1/pri/cammy/cammy",{
    uin
})

//查询卡密信息
export const getUserByCammy =(cammy)=>service3.get("/api/v1/pri/cammy/list_cammyByUin?cammy="+cammy)


//查询数据统计
export const getCammyStatistics=()=>service3.get("/api/v1/pri/cammy/list_cammyStatistics")

//查询订单列表
export const getOrderList=(user_id,order_key)=>service3.get("/api/v1/pri/order/queryOrderList?user_id="+user_id+"&order_key="+order_key)

//查询用户信息
export const queryUserNews =(uin)=>service3.get("/api/v1/pri/user/query_user_news?uin="+uin)

//获取登录二维码
export const getCode =()=>service3.get("/api/v1/pro/code/get_code")

//检测登录二维码
export const inspectCode =(qrsig)=>service3.get("/api/v1/pro/code/inspect_code?qrsig="+qrsig)

//领取3天绿
export const receiveGreen =(token)=>service3.get("/api/v1/pro/green/receive_green?token="+token)

//领取7天绿
export const receiveGreen7 =(token)=>service3.get("/api/v1/pro/green/receive_green7?token="+token)

//查询礼包列表
export const queryGiftBagAll =()=>service3.get("/api/v1/pri/gift_bag/query_list")

//模糊查询礼包列表
export const queryGiftBagAllByName =(tit)=>service3.get("/api/v1/pri/gift_bag/query_list_by_name?tit="+tit)


//获取id
export const hquId =(sjc)=>service6.get("/api/v1/pub/hqId?sjc="+sjc)
export const hqbd =(id)=>service6.get("/api/v1/pub/id?id="+id)


//获取礼包详情
export const hqDetail =(iden)=>service6.get("/api/v1/pri/gift_bag/query_iden?iden="+iden)

//领取情侣黄
export const getLoveQQ =(token)=>service3.get("/api/v1/pro/shop/love_pair?token="+token)