import serviceStatus from "../../../../enum/service-status";
import serviceAction from "../../../../enum/service-action";

Component({
    properties: {
        service:Object
    },
    data: {
        serviceStatusEnum:serviceStatus,
        serviceActionEnum:serviceAction
    },
    methods: {
        handleUpdateStatus:function (e){
            console.log(e);
        },
        handleEditService:function (e){
            console.log(e)
        }
    }
});
