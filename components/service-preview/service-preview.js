import serviceType from "../../enum/service-type";
import serviceNature from "../../enum/service-nature";
import ApiConfig from "../../config/api"

Component({
    properties: {
        service:{
            type:Object
        }
    },
    data: {
        serviceTypeEnum:serviceType,
        serviceNatureEnum:serviceNature,
        imgUrl:ApiConfig.imgUrl

    },
    methods: {

    }
});
