import ApiConfig from "../config/api";
import exceptionMessage from "../config/exception-message";
import wxToPromise from "./wx";
import cache from "../enum/cache";
import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "../store/tim";

class Http{
    //url:baseUrl+path
    //
    static async request({uri,data=null,header={},method='GET',refetch=true}){
        header['Authorization']=wx.getStorageSync(cache.TOKEN);
       const res = await wxToPromise('request',{
            url:ApiConfig.baseUrl+uri,
            data,
            method,
            header
        })

        //全局处理
        //请求成功，并且业务码正常
        if (res.statusCode < 400 && res.data.code === 200) {
            return res.data.data;
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

        //请求失败
        if (res.statusCode === 401){
            //全局状态绑定
            this.storeBindings = createStoreBindings(this,{
                store:timStore,
                fields:['sdkReady'],
                actions:{timLogout:'logout'}
            })
            if (this.sdkReady){
                this.timLogout();
            }
            wx.navigateTo({
                url:'/pages/login/index'
            })

            //登入过期或者未登入都清除
            wx.clearStorageSync();

            errorMsg = "需要登入"

        }

        

        this._showError(errorCode,errorMsg);
        throw Error(errorMsg);
    }

    static async get(uri,data=null,header={}){
        return this.request({uri,data});
    }

    static async post(uri,data=null,header={
        'content-type': 'application/json'
    }){
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