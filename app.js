// app.js
App({
  async onLaunch() {
    const userInfo = await wx.getStorageSync("user-info");
    if (userInfo){ //令牌存在，自动登入im
      this.timLogin();
    }
  },
  globalData: {
    userInfo: null
  }
})
