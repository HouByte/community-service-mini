import serviceStatus from "../../../enum/service-status";
import serviceAction from "../../../enum/service-action";

const behavior = Behavior({
    properties:{
        service:Object
    },
    data: {
        serviceStatusEnum:serviceStatus,
        serviceActionEnum:serviceAction
    }
})

export default behavior;