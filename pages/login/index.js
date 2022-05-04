import cache from "../../enum/cache";
import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim";
import {setTabBarBadge} from "../../utils/wx";
import User from "../../model/user";

Page({
    data: {},
    onLoad: function (options) {
        //全局状态绑定
        this.storeBindings = createStoreBindings(this,{
            store:timStore,
            fields:['sdkReady'],
            actions: {timLogin:'login',getConversationList:'getConversationList'}
        })
    },
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },
    onShow() {
        const data = wx.getSystemInfoSync(cache.UNREAD_COUNT);
        if (data){
            setTabBarBadge(data.index, data.count)
        }
    },
    handleLogin:async function (){
       const res = await wx.getUserProfile({
           desc:"完善用户信息"
       })

        console.log(res)
        

        var userInfo = res.userInfo

        let that = this
        //登入操作
        wx.login({
            success (res) {
              if (res.code) {
                User.login(res.code,userInfo).then(()=>{
                    //sdk登入
                    that.timLogin();
                    //通知页面事件
                    const events = that.getOpenerEventChannel();
                    events.emit('login');
                    wx.navigateBack();
                })
                
                //发起网络请求
                // wx.request({
                //   url: 'https://example.com/onLogin',
                //   data: {
                //     code: res.code
                //   }
                // })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })

        
        
    },
    handleBackHome:function (){
        wx.switchTab({
            url:'/pages/home/index'
        })
    }
});