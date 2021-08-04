import Base from "./base";
import Http from "../utils/http";

class Order extends Base{
    //未实现
    static createOrder(serviceId, address) {
        return {}
    }

    /**
     * 获取订单状态
     * @param role
     * @returns {{unconfirmed: number, unrated: number, unpaid: number, unapproved: number}}
     */
    static getOrderStatus(id,role) {
        return {
            unapproved:2,
            unpaid:3,
            unconfirmed:1,
            unrated:1
        }
    }

    static updateOrderStatus(orderId,action){
        return {}
    }

    static getOrderById(orderId){
        return {}
    }

    /**
     * 获取订单列表
     * @param uid
     * @param role
     * @param status
     * @returns {[]}
     */
    async getMyOrderList(uid,role,status){
        if (!this.hasMoreData){
            return this.data;
        }
        const orderList =  await Http.getFrom('6109ebab311c491a7311fbb8?/order/list',{
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            role:role||'',
            status:status||''
        })
        return this.handleData(orderList);
    }
}

export default Order;