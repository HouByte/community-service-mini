import ApiConfig from "../config/api";
import exceptionMessage from "../config/exception-message";
import wxToPromise from "./wx";

class Http{
    //url:baseUrl+path
    //
    static async request({uri,data=null,header={},method='GET'}){
       const res = await wxToPromise('request',{
            url:ApiConfig.baseUrl+uri,
            data,
            method,
            header
        })

        console.log(res);
        //全局处理
        //请求成功，并且业务码正常
        if (res.statusCode < 400 && res.data.code === 0) {
            return res.data.data;
        }


        //请求失败
        if (res.statusCode === 401){
            //todo 令牌相关操作
            return ;
        }

        if (res.statusCode === 200){
            const resp = res.data;
            this._showError(resp.code,resp.msg);
        } else {
            this._showError(res.statusCode,res.errMsg);
        }
    }

    static async get(uri,data=null,header={}){
        return this.request({uri,data});
    }

    static async post(uri,data=null,header={}){
        return this.request({uri,data,method:'POST'});
    }

    static async getFrom(uri,data=null,header= {
        'content-type': 'application/x-www-form-urlencoded'
    }){
        return this.request({uri,data,header});
    }

    static async postFrom(uri,data=null,header= {
        'content-type': 'application/x-www-form-urlencoded'
    }){
        return this.request({uri,data,header,method:'POST'});
    }

    static _showError(errorCode,message){

        const errorMsg = exceptionMessage[errorCode];
        let title = errorMsg||message||'未知异常';
        typeof title === 'object' ? Object.values(title).join(','):title;
        wx.showToast({
            title,
            icon:'none',
            duration:3000
        })
    }
}


export default Http;