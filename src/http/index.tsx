import {getRequest} from './fetch'

function getMessage(param:any){
    return getRequest('/api/qq.info',param).then((res:any)=>res)
}
export default {
    getMessage
}