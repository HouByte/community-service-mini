import serviceStatus from "../../../../enum/service-status";
import serviceAction from "../../../../enum/service-action";
import behavior from "../behavior";
import {getDataSet} from "../../../../utils/utils";

Component({
    behaviors:[behavior],
    properties: {
    },
    methods: {
        handleUpdateStatus:function (e){
            console.log(e);
            const action = getDataSet(e,"action");
            this.triggerEvent('update',{action})
        },
        handleEditService:function (e){
            this.triggerEvent('edit')
        }
    }
});
