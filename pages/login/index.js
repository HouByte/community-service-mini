import cache from "../../enum/cache";
import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim";
import {setTabBarBadge} from "../../utils/wx";

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
        wx.showLoading({
            title:'正在授权',
            mask:true
        })

        //登入操作


        res.userInfo.id = 1;//res.userInfo.nickName.trim();
        //设置缓存
        await wx.setStorageSync(cache.USER_INFO,res.userInfo);
        setTimeout((res)=>{
            wx.hideLoading();
        },2000)
        console.log(res);
        //sdk登入
        this.timLogin();
        //通知页面事件
        const events = this.getOpenerEventChannel();
        events.emit('login');
        wx.navigateBack();
    },
    handleBackHome:function (){
        wx.switchTab({
            url:'/pages/home/index'
        })
    }
});