import roleType from "../../enum/role-type";
import orderStatus from "../../enum/order-status";

Page({
    data: {},
    onLoad: function (options) {

    },
    handleCheckOrder:function (){
        wx.redirectTo({
            url:`/pages/my-order/index?role=${roleType.CONSUMER}&status=${orderStatus.UNAPPROVED}`
        })
    },
    handleNavToHome:function (){
        wx.switchTab({
            url:'/pages/home/index'
        })
    }
});