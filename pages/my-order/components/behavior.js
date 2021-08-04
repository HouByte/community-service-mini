import orderStatus from "../../../enum/order-status";

const behavior = Behavior({
    properties:{
        order:Object
    },
    data:{
        orderStatus:orderStatus
    },
    methods:{
        handleNavToOrderDetail(e){
            this.triggerEvent('nav-detail',{order:this.data.order})
        },
        handleNavToRefund(e){
            this.triggerEvent('refund',{order:this.data.order})
        },
        handleToChat(e){
            this.triggerEvent('chat',{order:this.data.order})
        }
    }
})

export default behavior;