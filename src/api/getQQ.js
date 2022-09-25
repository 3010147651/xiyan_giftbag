import {service5} from "../request";

//获取qq头像
export const getHeadImage = (qq)=>service5.get("/vipapick/login.php?do=getqrpic&r="+qq)