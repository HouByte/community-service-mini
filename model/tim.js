// 从v2.11.2起，SDK 支持了 WebSocket，推荐接入；v2.10.2及以下版本，使用 HTTP
import TIM from 'tim-wx-sdk-ws';
import TIMUploadPlugin from 'tim-upload-plugin';
import TimConfig from "../config/tim"
class Tim {
    static  Instance = null;
    _SDKInstance = null;

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

    static getInstance(){
        if (!this.Instance){
            Tim.Instance = new Tim();
        }

        return Tim.Instance;
    }

    getSdk(){
        return this._SDKInstance;
    }
}

export default Tim;