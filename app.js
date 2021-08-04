// app.js
import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "./store/tim";

App({
  async onLaunch() {
    //全局状态绑定
    this.storeBindings = createStoreBindings(this,{
      store:timStore,
      actions:{timLogin:'login'}
    })
    const userInfo = await wx.getStorageSync("user-info");
    if (userInfo){ //令牌存在，自动登入im
      this.timLogin();
    }
    this.storeBindings.destroyStoreBindings();
  },
  globalData: {
    userInfo: null
  }
})
