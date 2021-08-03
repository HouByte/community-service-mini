// tim.js
import { observable, action } from 'mobx-miniprogram'
import Tim from "../model/tim";
import TIM from "tim-wx-sdk-ws"
import User from "../model/user";
import {setTabBarBadge} from "../utils/wx";

export const timStore = observable({

    // 数据字段
    sdkReady: false,

    messageList:[],
    _targetUserId:null,
    intoView:0,
    conversationList:[],

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
        sdk.on(TIM.EVENT.CONVERSATION_LIST_UPDATED,this._handlecConversationListUpdate,this);
    },

    _handleSDKReady(){
        this.sdkReady = true;
        const userInfo = User.getUserInfoByLocal();
        Tim.getInstance().updateUserProfile(userInfo);
        //登入后主动获取缓存消息
        this._getConversationList();
    },
    _handleSDKNotReady(){
        this.sdkReady = false;
    },
    async _handleMessageReceived(e){
        if (!this._targetUserId){
            return
        }

        const  currentConversationMessage = e.data.filter(item => this._targetUserId)

        if (currentConversationMessage.length){
            this.messageList = this.messageList.concat(currentConversationMessage);
            this.intoView = this.messageList.length -1;
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
        this.messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId);
        this.intoView = this.messageList.length -1;
        await Tim.getInstance().setMessageRead(this._targetUserId);
    }),

    pushMessage:action(function (message) {
        this.messageList = this.messageList.concat([message])
        this.intoView = this.messageList.length - 1
    }),

    sendMessages:action(async function (type,content,targetUsserId,extension=null){
        const message = Tim.getInstance().createMessage(type,content,targetUsserId,extension)
        const data = await Tim.getInstance().sendMessage(message);
        this.messageList = this.messageList.concat([data.message]);
        this.intoView = this.messageList.length -1;
    }),

    scrollMessageList:action(async function (){
        const messageList = await Tim.getInstance().getMessageList(this._targetUserId);
        if (!messageList){
            wx.showToast({
                title:"没有更多了",
                icon:"none"
            })
            Tim.getInstance().isCompleted = true;
            return
        }
        this.intoView = messageList.length -2;

        /**
         * tips
         * 1. MobX 中属性的值是 Array 的时候，他是一个被包装过的 Array，并非原生 Array，它是一个响应式对象
         * 2. 经过包装的 Array 同样具备大多数原生 Array 所具备的方法。
         * 3. 想把响应式的对象数组变成普通数组，可以调用slice()函数遍历所有对象元素生成一个新的普通数组
         */
        this.messageList = messageList.concat(this.messageList.slice());
    }),

    async _getConversationList(){
        this.conversationList = await Tim.getInstance().getConversationList();
        this._setTabBarBadge(this.conversationList);
    },

    getConversationList:action(async function (){
        this._getConversationList();
    }),

    _handlecConversationListUpdate(e){
        if (!e.data.length){
            return;
        }
        this.conversationList = e.data;
        this._setTabBarBadge(e.data);


    },

    _setTabBarBadge(data){
        const unreadCount = data.reduce((sum, item)=> sum + item.unreadCount,0);

        setTabBarBadge(2,unreadCount);
    }

})