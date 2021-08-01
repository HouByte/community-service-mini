import roleType from "../../enum/role-type";

Page({
    data: {},
    onLoad: function (options) {

    },
    handleCheckOrder:function (){
        wx.redirectTo({
            url:`/pages/my-order/index?role=${roleType.COUSUMER}&status=${orderStatus.UNAPPROVED}`
        })
    },
    handleNavToHome:function (){
        wx.switchTab({
            url:'/pages/home/index'
        })
    }
});