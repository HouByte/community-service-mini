import serviceType from "../../../../enum/service-type";
import behavior from "../behavior";

Component({
    behaviors:[behavior],
    properties: {
    },
    data: {
        serviceTypeEnum:serviceType
    },
    methods: {
        handlePay: function (event) {
            this.triggerEvent('pay')
        },

        handleRefund() {
            this.triggerEvent('refund')
        },

        handleRating() {
            this.triggerEvent('rating')
        },
    }
});
