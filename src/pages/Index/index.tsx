import React from 'react'
import api from '../../http/index';
import './index.css'
import ErrorTips from './error'
const { getMessage } = api;
class GetQQ extends React.Component{
    state = {
        qlogo:'',
        name:'',
        qq:'',
        loading:false, // 加载中提示
        errorTips:false,
        flag:false
    }
    // QQ改变时
    qqChange = async (e:any)=>{ 
        if(!e.target.value) return null
        this.setState({
            loading:true,
            errorTips:false
        })
        const value = e.target.value
        const res = await getMessage({qq:value})
        const {code,name,qlogo,qq} = res
        console.log(res)
        if(code===1){
            this.setState({
                qlogo,
                name,
                qq,
                loading:false,
                errorTips:false,
                flag:true
            })
        } else {
            this.setState({
                errorTips:true,
                loading:false
            })
        }
    }
    // 检验QQ号是否合法
    checkQQByRegular =(s:string)=>{
        return(/^[1-9]\d{4,9}$/.test(s)) ? true : false;
    }
    render() {
        const {qlogo,name,qq,loading,errorTips,flag} = this.state
        return(
            <div className="content_wrap">
                <h1> QQ号查询 </h1>
                <div className="qq_number">
                    <span>QQ</span>
                    <input type="text" className="qq_border" placeholder='输入qq号' onChange = { this.qqChange }/>
                </div>
                    {errorTips ? <ErrorTips/>:
                        loading&&!errorTips?<span>加载中...</span>:flag?
                        <div className="qq_wrap">
                            <img src={qlogo} alt="" className="img_name"/>
                            <div>
                                <div className='qq_name qq_text'>{name}</div>
                                <div className='qq_item qq_text'>{qq}</div>
                            </div>
                        </div>:null
                   }
                    
            </div>
            )
        }
}
export default GetQQ