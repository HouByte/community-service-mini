import Service from "../../model/service";
import User from "../../model/user";
import Rating from "../../model/rating";
import serviceType from "../../enum/service-type";
import serviceStatus from "../../enum/service-status";
import {getEventParam} from "../../utils/utils";
import serviceAction from "../../enum/service-action";
import cache from "../../enum/cache";
import {createStoreBindings} from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim";
import ApiConfig from "../../config/api"

const rating = new Rating();
Page({
    data: {
        serviceId:'',
        service:null,
        isPublisher:false,
        ratingList:[],
        serviceTypeEnum:serviceType,
        serviceStatusEnum:serviceStatus,
        loading:true,
        imgUrl:ApiConfig.imgUrl
    },
    onLoad:async function (options) {
        console.log(options.id);
        this.data.serviceId = options.id;
        await this._getServiceById();
        this._checkRole();
        await this._getServiceRatingList();
        this.setData({
            loading:false
        })

        //全局状态绑定
        this.storeBindings = createStoreBindings(this,{
            store:timStore,
            fields:['sdkReady'],
            actions:{timLogin:'login'}
        })
    },
    async _getServiceById(){
        const service = await Service.getServiceById(this.data.serviceId);
        console.log("getServiceById",service)
        this.setData({
            service
        })
    },
    async _getServiceRatingList(){
        if (this.data.service.type === serviceType.SEEK){
            return
        }
        const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId);
        console.log("getServiceById",ratingList)
        this.setData({
            ratingList
        })
    },
    handleUpdateStatus: async function (e){
        console.log(e);
        const action = getEventParam(e,"action");
        const content = this._generateModalContent(action);
        const res =await wx.showModal({
            title:'注意',
            content,
            showCancel:true
        })
        if (!res.confirm){
            return;
        }
        await Service.updateServiceStatus(this.data.serviceId,action);
        this._getServiceById();
        console.log(res);
    },
    handleEditService:function (){
        const service = JSON.stringify(this.data.service);
        wx.navigateTo({
            url:`/pages/service-edit/index?service=${service}`
        })

    },
    handleChat:async function (){


        if (!this.data.sdkReady){
            const userInfo = await wx.getStorageSync("user-info");
            if (!userInfo){ //未登入情况
                wx.navigateTo({
                    url:'/pages/login/index'
                })
            } else {
                this.timLogin();
            }

        }
        const targetUserId = this.data.service.publisher.id;
        const service = JSON.stringify(this.data.service);
        wx.navigateTo({
            url:`/pages/conversation/index?id=${targetUserId}&service=${service}`
        })
    },
    handleOrder:function (){
        if (!wx.getStorageSync(cache.TOKEN)){
            const that = this;
            wx.navigateTo({
                url:'/pages/login/index',
                events:{
                    login:function (){
                        that._checkRole();
                    }
                }
            })
            return;
        }
        const service = JSON.stringify(this.data.service);
        wx.navigateTo({
            url:`/pages/order/index?service=${service}`
        })
    },
    _generateModalContent(action){
      let content;
      switch (action){
          case serviceAction.OFF_SHELVES:
              content = '下架服务后，可在个人中心操作重新发布上线，是否确定下架该服务？';
              break
          case serviceAction.PUBLISH:
              content = '发布后可在广场页面中被浏览，是否确定发布？';
              break
          case serviceAction.CANCEL:
              content = '取消后不可恢复，需要重新发布提交审核;已关联该服务的订单且订单正在进行中，仍需要正常履约;是否确认取消该服务？';
              break
      }
      return content;
    },
    _checkRole(){
        const userInfo = User.getUserInfoByLocal();
        if (userInfo && userInfo.id === this.data.service.publisher.id){
            this.setData({
                isPublisher:true
            })
        }
    },
    async onReachBottom() {
        if (!rating.hasMoreData){
            return
        }
        const ratingList = await rating.getServiceRatingList(this.data.serviceId);
        this.setData({
            ratingList
        })
    }
});