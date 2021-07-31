import Service from "../../model/service";
import User from "../../model/user";
import Rating from "../../model/rating";
const rating = new Rating();
Page({
    data: {
        serviceId:'',
        service:null,
        isPublisher:false,
        ratingList:[]
    },
    onLoad:async function (options) {
        console.log(options.id);
        this.data.serviceId = options.id;
        await this._getServiceById();
        this._checkRole();
        await this._getServiceRatingList();
    },
    async _getServiceById(){
        const service = await Service.getServiceById(this.data.serviceId);
        console.log("getServiceById",service)
        this.setData({
            service
        })
    },
    async _getServiceRatingList(){
        const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId);
        console.log("getServiceById",ratingList)
        this.setData({
            ratingList
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