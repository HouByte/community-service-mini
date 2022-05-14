import ServiceStatus from "../../enum/service-status";

Page({
    data: {
        type:null
    },
    onLoad: function (options) {
        this.data.type = options.type
    },
    handleCheckService:function (){
        wx.redirectTo({
            url:`/pages/my-order/index?type=${this.data.type}&status=${ServiceStatus.PENDING}`
        })
    },
    handleNavToHome:function (){
        wx.switchTab({
            url:'/pages/home/index'
        })
    }
});