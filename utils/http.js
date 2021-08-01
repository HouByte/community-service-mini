import ApiConfig from "../config/api";
import exceptionMessage from "../config/exception-message";
import wxToPromise from "./wx";
import cache from "../enum/cache";

class Http{
    //url:baseUrl+path
    //
    static async request({uri,data=null,header={},method='GET',refetch=true}){
        header['token']=wx.getStorageSync(cache.TOKEN);
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
            //令牌相关操作
            if (res.data.code === responseCode.NOT_TOKEN){
                wx.navigateTo({
                    url:'/pages/login/index'
                })
                throw Error('请求未携带令牌');
            }

            if (refetch){
                return Http._refetch({uri,data,header,method});
            }

        }

        let errorCode;
        let errorMsg;
        if (res.statusCode === 200){
            const resp = res.data;
            errorCode = resp.code;
            errorMsg = resp.msg;
        } else {
            errorCode = res.statusCode;
            errorMsg = res.errMsg;
        }

        this._showError(errorCode,errorMsg);
        throw Error(errorMsg);
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
        wx.showToast({
            title,
            icon:'none',
            duration:3000
        })
    }

    static async _refetch(data){
        data.refetch = false;
        return await Http.request(data);
    }
}


export default Http;