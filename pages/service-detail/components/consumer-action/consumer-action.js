import serviceType from "../../../../enum/service-type";

Component({
    properties: {
        service:Object
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
