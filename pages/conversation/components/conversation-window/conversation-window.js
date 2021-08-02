import {storeBindingsBehavior} from "mobx-miniprogram-bindings";
import {timStore} from "../../../../store/tim";
import {getEventParam} from "../../../../utils/utils";
import TIM from "tim-wx-sdk-ws";
Component({
    behaviors:[storeBindingsBehavior],
    properties: {
        targetUserId:String,
        service:Object
    },
    data: {
        text:''
    },
    storeBindings:{
        store:timStore,
        fields:['messageList'],
        actions:['getMessageList','setTargetUserId']
    },
    lifetimes:{
      attached() {
          this.setTargetUserId(this.data.targetUserId);
          this.getMessageList();
      }
    },
    methods: {
        handleSend:function (e){
            const service = getEventParam(e,'service');
            this.triggerEvent('sendmessage',{
                type:TIM.TYPES.MSG_CUSTOM,
                content:service
            })
        },
        handleSelect:function (e){
            const service = getEventParam(e,'service');
            wx.navigateTo({
                url:`/pages/service-detail/service-detail?id=${service.id}`
            })
        },
        handleSendImage:async function (){
            const chooseImage = await wx.chooseImage({
                count:1,
                sizeType:["compressed"],
                sourceType:['album','camera']
            });
            console.log(chooseImage)
            this.triggerEvent('sendmessage',{
                type:TIM.TYPES.MSG_IMAGE,
                content:chooseImage
            })
        },
        handleMessageSend:function (){
            console.log(this.data)
            const text = this.data.text.trim();
            if (text === ''){
                return
            }
            this.triggerEvent('sendmessage',{
                type:TIM.TYPES.MSG_TEXT,
                content:text
            })

            this.setData({
                text:''
            })
        },
        handleInput:function (e){
            this.data.text = getEventParam(e,'value');
        }
    }
});
