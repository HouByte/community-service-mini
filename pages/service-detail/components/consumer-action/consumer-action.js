import serviceType from "../../../../enum/service-type";
import behavior from "../behavior";

Component({
    behaviors:[behavior],
    properties: {
    },
    methods: {
        handleChat:function (e){
            this.triggerEvent('chat')
        },
        handleOrder:function (e){
            this.triggerEvent('order')
        }
    }
});
