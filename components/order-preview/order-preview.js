import roleType from "../../enum/role-type";
import ApiConfig from "../../config/api"

Component({
    properties: {
        order:Object,
        role:Number,
        hideTop:{
            type:Boolean,
            value:false
        }
    },
    data: {
        roleType:roleType,
        imgUrl:ApiConfig.imgUrl
    },
    methods: {}
});
