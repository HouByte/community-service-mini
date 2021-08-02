// 从v2.11.2起，SDK 支持了 WebSocket，推荐接入；v2.10.2及以下版本，使用 HTTP
import TIM from 'tim-wx-sdk-ws';
import TIMUploadPlugin from 'tim-upload-plugin';
import TimConfig from "../config/tim";
import {genTestUserSig} from "../lib/tim/GenerateTestUserSig"
import User from "./user";

class Tim {
    /**
     *
     * @type {Tim}
     */
    static  Instance = null;
    /**
     *
     * @type {Tim}
     */
    _SDKInstance = null;
    _nextReqMessageID = '';
    isCompleted = false;

    /**
     * 构造函数
     */
    constructor() {
        console.log(TimConfig.options)
        // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
        let tim = TIM.create(TimConfig.options); // SDK 实例通常用 tim 表示
        // 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
        tim.setLogLevel(TimConfig.logLevel); // 普通级别，日志量较多，接入时建议使用
        // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
        // 注册腾讯云即时通信 IM 上传插件
        tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
        this._SDKInstance = tim;
    }

    /**
     * 单例获取实例
     * @returns {null}
     */
    static getInstance() {
        if (!this.Instance) {
            Tim.Instance = new Tim();
        }

        return Tim.Instance;
    }

    /**
     * 获取tim对象
     * @returns {null}
     */
    getSdk() {
        return this._SDKInstance;
    }

    async getMessageList(targetUserId, count = 10) {
        console.log("1", targetUserId)
        if (this.isCompleted) {
            return
        }
        console.log("2")
        targetUserId = 'user1'
        const res = await this._SDKInstance.getMessageList({
            conversationID: `C2C${targetUserId}`,
            nextReqMessageID: this._nextReqMessageID,
            count: count > 15 ? 15 : count
        })

        console.log("3", res)
        this._nextReqMessageID = res.data._nextReqMessageID;
        this.isCompleted = res.data.isCompleted;
        this._messageList = res.data.messageList;
        console.log("4")
        return this._messageList;
    }

    reset() {
        this._nextReqMessageID = '';
        this.isCompleted = false;
        this._messageList = [];
        return this;
    }

    async timLogin() {
        const userInfo = await User.getUserInfoByLocal();
        const userId = userInfo.id.toString();
        const textUserSig = genTestUserSig(userId)
        this._SDKInstance.login({
            userID: userId,
            userSig: textUserSig.userSig
        })
        return this;
    }

    timLogout() {
        this._SDKInstance.timLogout();
    }

    async setMessageRead(targetUserId) {
        const res = await this._SDKInstance.setMessageRead({
            conversationID: `C2C${targetUserId}`,
        });
        return res.data;
    }

    createMessage(type,content,targetUsserId,extension=null){
        let message
        const params = {
            to:targetUsserId,
            conversationType:TIM.TYPES.CONV_C2C,
            payload:null
        }

        switch (type){
            case TIM.TYPES.MSG_TEXT:
                params.payload = {text:content}
                message = this._SDKInstance.createTextMessage(params);
                break;
            case TIM.TYPES.MSG_IMAGE:
                params.payload = {file:content}
                message = this._SDKInstance.createImageMessage(params);
                break;
            case TIM.TYPES.MSG_CUSTOM:
                params.payload = {
                    data:'service',
                    text:JSON.stringify(content),
                    extension
                }
                message = this._SDKInstance.createCustomMessage(params);
                break;
            default:
                throw Error('未知消息类型')
        }

        return message;
    }

    async sendMessage(message) {
        const res = await this._SDKInstance.sendMessage(message);
        return res.data
    }
}

export default Tim;