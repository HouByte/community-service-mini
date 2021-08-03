import {storeBindingsBehavior} from "mobx-miniprogram-bindings";
import {timStore} from "../../../../store/tim";
import {getEventParam} from "../../../../utils/utils";
import TIM from "tim-wx-sdk-ws";
import Tim from "../../../../model/tim";
Component({
    behaviors:[storeBindingsBehavior],
    properties: {
        targetUserId:String,
        service:Object
    },
    data: {
        text:'',
        scrollHeight:100
    },
    storeBindings:{
        store:timStore,
        fields:['messageList','intoView'],
        actions:['getMessageList','setTargetUserId','scrollMessageList','pushMessage']
    },
    lifetimes:{
      async attached() {
          this._setScrollHeight();
          this._setNavigationBarTitle();
          await this.setTargetUserId(this.data.targetUserId);
          await this.getMessageList();
          if (this.data.service) {
              const message = Tim.getInstance().createMessage(TIM.TYPES.MSG_CUSTOM, this.data.service, this.data.targetUserId,'link')
              this.pushMessage(message);
          }
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
        },
        async _setScrollHeight(){
          const systemInfo = await wx.getSystemInfo();
          const scrollHeight = systemInfo.windowHeight - (systemInfo.screenHeight - systemInfo.safeArea.bottom) - 95;
          this.setData({
              scrollHeight
          })
        },
        handleScrollUpper:function (){
            if (Tim.getInstance().isCompleted) {
                return
            }
            wx.showLoading({
                title:'正在加载...',
                mask:true
            });
            this.scrollMessageList();

            setTimeout(()=>wx.hideLoading(),1000);

        },
        async _setNavigationBarTitle(){
           const res = await Tim.getInstance().getUserProfile(this.data.targetUserId)
            wx.setNavigationBarTitle({
                title:res[0].nick || '家政服务'
            })
        }
    }
});
