import orderStatus from "../../../enum/order-status";
import orderAction from "../../../enum/order-action";
import {getDataSet} from "../../../utils/utils";

const behavior = Behavior({
    properties:{
        order:Object
    },
    data:{
        orderStatus:orderStatus,
        orderAction:orderAction
    },
    methods: {
        handleUpdateOrderStatus: function (e) {
            const action = getDataSet(e,'action');
            this.triggerEvent('update-status', { action })
        }
    }
})

export default behavior;