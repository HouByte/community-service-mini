import serviceStatus from "../../../enum/service-status";
import serviceAction from "../../../enum/service-action";
import serviceType from "../../../enum/service-type";


const behavior = Behavior({
    properties:{
        service:Object
    },
    data: {
        serviceStatusEnum:serviceStatus,
        serviceActionEnum:serviceAction,
        serviceTypeEnum:serviceType
    }
})

export default behavior;