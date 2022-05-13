import Order from "../../model/order";
import {getEventParam} from "../../utils/utils";
import roleType from "../../enum/role-type";



const order = new Order();

Page({
    data: {
        tabs:['全部','待同意' ,'待支付' , '待确认' , '待评价'],
        orderList:[],
        role:null,
        status:-1,
        active:0,
        roleType:roleType,
    },
    onLoad: function (options) {
        const role = parseInt(options.role);
        //status： -1 全部 0 待同意 1待支付 2 待确认 3 待评价
        const status = parseInt(options.status);
        this.setData({
            role,
            active:status+1
        })

        this.data.status = status < 0 ? -1 : status;
        this.data.role = role
    },

    onShow() {
        this._getOrderList();
    },
    async _getOrderList(){
        console.log(this.data.status);
        const orderList = await order.reset().getMyOrderList(this.data.role,this.data.status);
        this.setData({
            orderList
        })
    },
    handleNavDetail:function(e){
        const order = getEventParam(e,'order');

        wx.navigateTo({
            url:`/pages/order-detail/index?role=${this.data.role}&order=${JSON.stringify(order)}`
        })
    },
    handleRefund:function(e){
        const order = getEventParam(e,'order');

        wx.navigateTo({
            url:`/pages/refund/index?order=${JSON.stringify(order)}`
        })
    },
    handleChat:function(e){
        const order = getEventParam(e,'order');
        const targetUserId = order[this.data.role === roleType.PUBLISHER?'consumer':'publisher'].id
        wx.navigateTo({
            url:`/pages/conversation/index?id=${targetUserId}&service=${JSON.stringify(order.serviceSnap)}`
        })
    },

    async onPullDownRefresh() {
        await this._getOrderList();
        wx.stopPullDownRefresh();
    },

    async onReachBottom() {
        if (!order.hasMoreData) {
            return
        }
        //
        const orderList = await order.getMyOrderList(this.data.role,this.data.status);
        this.setData({
            orderList
        })
    },

    handleTabChange:async function (e){
        const index = getEventParam(e,'index');
        this.data.status = index < 1 ? -1 : index-1;
        await this._getOrderList();
    }

});