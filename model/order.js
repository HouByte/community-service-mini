import Base from "./base";
import Http from "../utils/http";

class Order extends Base{
    //未实现
    static async createOrder(serviceId, address) {
        return await Http.postFrom('/order/create',{
            serviceId:serviceId,
            address:JSON.stringify(address)
        })
    }

    /**
     * 获取订单状态
     * @param role
     * @returns {{unconfirmed: number, unrated: number, unpaid: number, unapproved: number}}
     */
    static async getOrderStatus(role) {
        return  await Http.getFrom('/order/status/my',{
            role:role
        })
    }

    static async updateOrderStatus(id,action){
        return await Http.postFrom('/order/ops',{
            id:id,
            act:action
        })
    }

    static async getOrderById(id){
        return  await Http.getFrom('/order/desc',{
            id:id
        })
    }

    /**
     * 获取订单列表
     * @param uid
     * @param role
     * @param status
     * @returns {[]}
     */
    async getMyOrderList(role,status){
        if (!this.hasMoreData){
            return this.data;
        }
        console.log(status);
        const orderList =  await Http.getFrom('/order/list',{
            page:this.pageNum,
            page_size:this.pageSize,
            status:status,
            role:role
        })
        return this.handleData(orderList);
    }
}

export default Order;