// tim.js
import { observable, action } from 'mobx-miniprogram'
import Tim from "../model/tim";
import TIM from "tim-wx-sdk-ws"

export const timStore = observable({

    // 数据字段
    sdkReady: false,

    messageList:[],
    _targetUserId:null,

    // actions
    login: action(function () {
        this._runListener();
        Tim.getInstance().timLogin();

    }),
    logout:action(function (){
        Tim.getInstance().timLogout();
    }),

    _runListener(){
        const sdk = Tim.getInstance().getSdk();
        sdk.on(TIM.EVENT.SDK_READY,this._handleSDKReady,this);
        sdk.on(TIM.EVENT.SDK_NOT_READY,this._handleSDKNotReady,this);
        sdk.on(TIM.EVENT.KICKED_OUT,this._handleSDKNotReady,this);
        sdk.on(TIM.EVENT.MESSAGE_RECEIVED,this._handleMessageReceived,this);
    },

    _handleSDKReady(){
        this.sdkReady = true;
    },
    _handleSDKNotReady(){
        this.sdkReady = false;
    },
    async _handleMessageReceived(e){
        console.log(e.data)
        if (!this._targetUserId){
            return
        }

        const  currentConversationMessage = e.data.filter(item => this._targetUserId)

        if (currentConversationMessage.length){
            this.messageList = this.messageList.concat(currentConversationMessage);
            await Tim.getInstance().setMessageRead(this._targetUserId);
        }
    },
    setTargetUserId:action(function (targetUserId){
        this._targetUserId = targetUserId;

    }),
    getMessageList:action(async function (){

        if (!this._targetUserId){
            throw Error('未指定目标用户 id')
        }

        console.log("test 121")
        this.messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId);
        console.log("t21 ",this.messageList)
        await Tim.getInstance().setMessageRead(this._targetUserId);

    })

})