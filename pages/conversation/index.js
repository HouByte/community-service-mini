import Tim from "../../model/tim";
import TIM from "tim-wx-sdk-ws"
import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim";
Page({
    data: {},
    onLoad: function (options) {
        const userId = 21000;


        //全局状态绑定
        this.storeBindings = createStoreBindings(this,{
            store:timStore,
            fields:['sdkReady','messageList'],
            actions:['getMessageList','setTargetUserId']
        })
        this.setTargetUserId('user1');
        const messageList = this.getMessageList();
        console.log("msg list ",messageList)
        // Tim.getInstance().timLogin();
        // Tim.getInstance().getSdk().on(TIM.EVENT.SDK_READY,async function (){
        //     const res = Tim.getInstance().getMessageList(userId);
        //     console.log("tim",res);
        // })

    },
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },
});