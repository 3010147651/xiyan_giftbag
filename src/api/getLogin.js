import {service,service2,service4} from "../request";


//获取二维码接口
export const getCode = (r)=>service.get("/vipapick/login.php?do=getqrpic&r="+r)

//权限二维码
export const getCodes = ()=>service4.get("/api/gethzqr/")

//二维码状态监控
export const getmonitor = (qrsig)=>service.get("/vipapick/login.php?do=qrlogin&qrsig="+qrsig)

//权限二维码监控
export const getmonitors = (qrsig)=>service.get("/hzqrlogin/?id="+qrsig)


//领取svip
export const getsvip = (uin,skey,pskey)=>service2.get("/666.php?qq_number="+uin+"&p_uin="+uin+"&p_skey="+pskey)

//获取礼物id1
export const getsvipid = (uin,pskey)=>service2.get("/svip.php?p_uin="+uin+"&p_skey="+pskey)
// export const getmonitor = (id)=>service2.get("/hzqrlogin/?id="+id)





//获取key接口
// export const getkey = (do:String,r:String)=>{
//     axios.post("/qqapi/login.php",{
//        "do":do,
//        "r":r
//     })
// }
