import orderStatus from "../../enum/order-status";
import Rating from "../../model/rating";
import roleType from "../../enum/role-type";
import {getEventParam} from "../../utils/utils";
import Order from "../../model/order";
import orderAction from "../../enum/order-action";


Page({
    data: {
        order:null,
        role:null,
        rating:null,
        orderStatus:orderStatus,
        roleType:roleType
    },
    onLoad: function (options) {
        const order = JSON.parse(options.order);
        const role = parseInt(options.role);
        console.log("role test =>   ",role)
        this.setData({
            order,
            role
        })

        if (order.status === orderStatus.COMPLETED){
            this._getRating(order.id);
        }
    },

    async _getRating(orderId){
        const rating = await Rating.getRatingById(orderId);
        this.setData({
            rating
        })
    },

    async _getOrderById(){
        const order = Order.getOrderById(this.data.order.id);
        // this.setData({
        //     order
        // })
    },

    handleToChat:function (e) {
        const targetUserId = getEventParam(e,'targetUserId');
        wx.navigateTo({
            url:`/pages/conversation/index?id=${targetUserId}&service=${JSON.stringify(this.data.order.serviceSnap)}`
        })
    },
    async handleUpdateOrderStatus(e){
        const action = getEventParam(e,'action');
        const content = this._generateModalContent(action);

        const modalRes = await wx.showModal({
            title: '注意',
            content,
            showCancel: true,
        })

        if (!modalRes.confirm) {
            return
        }

        wx.showLoading({title: '正在提交...', mask: true })
        try {
            await Order.updateOrderStatus(this.data.order.id, action)
        } catch (e) {
            return
        }
        wx.hideLoading()
        this._getOrderById()
    },
    handleRefund(e){
        wx.navigateTo({
            url:`/pages/refund/index?order=${JSON.stringify(this.data.order)}`
        })
    },
    handleRating(e){
        wx.navigateTo({
            url:`/pages/rating/index?order=${JSON.stringify(this.data.order)}`,
            events:{
                rating:()=>{
                    this._getOrderById();
                    this._getRating(this.data.order.id);
                }
            }
        })
    },
    async handlePay(e){
        const res = await wx.showModal({
            title:'注意',
            content:`您即将支付该服务，费用:${this.data.order.price}元，舒服确定支付`
        });

        if (!res.confirm){
            return;
        }

        Order.updateOrderStatus(this.data.order.id,orderAction.PAY);
        wx.navigateTo({
            url:"/pages/pay-success/index"
        })
    },

    _generateModalContent(action) {
        let content
        switch (action) {
            case orderAction.AGREE:
                content = '是否确认同意本次服务预约，同意后不可以撤销。'
                break;
            case orderAction.DENY:
                content = '是否确认拒绝本次服务预约，同意后不可以撤销。'
                break;
            case orderAction.CONFIRM:
                content = '是否确认本次服务已完成？'
                break;
            case orderAction.CANCEL:
                content = '是否确认取消本次服务订单，确认取消后不可以撤销。'
                break;
        }

        return content
    }
});