import Service from "../../model/service";
import User from "../../model/user";

Page({
    data: {
        serviceId:'',
        service:null,
        isPublisher:false
    },
    onLoad:async function (options) {
        console.log(options.id);
        this.data.serviceId = options.id;
        await this._getServiceById();
        this._checkRole();
    },
    async _getServiceById(){
        const service = await Service.getServiceById(this.data.serviceId);
        console.log("getServiceById",service)
        this.setData({
            service
        })
    },
    _checkRole(){
        const userInfo = User.getUserInfoByLocal();
        if (userInfo && userInfo.id === this.data.service.publisher.id){
            this.setData({
                isPublisher:true
            })
        }
    }
});