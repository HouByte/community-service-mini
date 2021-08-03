import Tim from "../../model/tim";
import TIM from "tim-wx-sdk-ws"
import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim";
Page({
    data: {
        targetUserId:null,
        service:null
    },
    onLoad: function (options) {
        //全局状态绑定
        this.storeBindings = createStoreBindings(this,{
            store:timStore,
            fields:['sdkReady'],
            actions:['sendMessages']
        })

        if (!options.id){
            throw Error('会话异常')
        }

        const service = options.service?JSON.parse(options.service):null;
        this.setData({
            targetUserId:options.id,
            service
        })



    },
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },
    handleRefresh:async function (){
        const userInfo = await wx.getStorageSync("user-info");
        if (!userInfo){ //未登入情况
            wx.navigateTo({
                url:'/pages/login/index'
            })
        } else {
            this.timLogin();
        }
    },
    handleSendMessage:function (e){
        const {type,content} = e.detail;
        this.sendMessages(type,content,this.data.targetUserId)
    }
});