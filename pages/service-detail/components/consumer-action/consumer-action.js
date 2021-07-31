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
        handleChat:function (e){
            console.log(e);
        },
        handleOrder:function (e){
            console.log(e);
        }
    }
});
