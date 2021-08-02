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
        const userId = 21000;


        //全局状态绑定
        this.storeBindings = createStoreBindings(this,{
            store:timStore,
            fields:['sdkReady']
        })

        const service = JSON.parse(options.service);
        this.setData({
            targetUserId:options.id,
            service
        })

    },
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },
    handleRefresh:function (){
        wx.navigateTo({
            url:'/pages/login/index'
        })
    },
    handleSendMessage:function (e){
        console.log(e);
        const {type,content} = e.detail;
        const message = Tim.getInstance().createMessage(type,content,this.data.targetUserId)
        Tim.getInstance().sendMessage(message);
    }
});