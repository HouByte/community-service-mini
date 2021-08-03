import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim";
import {getDataSet} from "../../utils/utils";
import cache from "../../enum/cache";
import {setTabBarBadge} from "../../utils/wx";

Page({
    data: {

    },
    onLoad: function (options) {
        //全局状态绑定
        this.storeBindings = createStoreBindings(this,{
            store:timStore,
            fields:['sdkReady','conversationList'],
            actions:{timLogin:'login',getConversationList:'getConversationList'}
        })
    },
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },
    async onShow() {
        console.log("show")
        if (!this.data.sdkReady){
            const userInfo = await wx.getStorageSync("user-info");
            if (!userInfo){ //未登入情况
                wx.navigateTo({
                    url:'/pages/login/index'
                })
            } else {
                this.timLogin();
            }

        }
        this.getConversationList();
        const data = wx.getStorageSync(cache.UNREAD_COUNT);
        await setTabBarBadge(data.index, data.count)
    },
    handleRefresh:async function (){
        const userInfo = await wx.getStorageSync("user-info");
        if (!userInfo){ //未登入情况
            wx.navigateTo({
                url:'/pages/login/index'
            })
        } else {
            this.timLogin();
        }
    },
    handleSelect:function (e){
        const targetUserId = getDataSet(e,'userid');
        wx.navigateTo({
            url:`/pages/conversation/index?id=${targetUserId}`
        })
    }
});