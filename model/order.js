class Order {
    //未实现
    static createOrder(serviceId, address) {
        return {}
    }

    static getOrderStatus(role) {
        return {
            unapproved:2,
            unpaid:3,
            unconfirmed:1,
            unrated:1
        }
    }
}

export default Order;