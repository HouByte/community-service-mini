import cache from "../../enum/cache";

Page({
    data: {},
    onLoad: function (options) {

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

        //设置缓存
        wx.setStorageSync(cache.USER_INFO,res.userInfo);
        setTimeout((res)=>{
            wx.hideLoading();
        },2000)
        console.log(res);

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