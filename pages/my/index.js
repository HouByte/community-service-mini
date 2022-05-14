import cache from "../../enum/cache";
import {setTabBarBadge} from "../../utils/wx";
import User from "../../model/user";
import {myGrid} from "../../config/grid";
import Order from "../../model/order";
import roleType from "../../enum/role-type";
import Service from "../../model/service";
import serviceType from "../../enum/service-type";
import {getEventParam} from "../../utils/utils";
import cellType from "../../enum/cell-type";

Page({
    data: {
        userInfo: {
            avatarUrl: "http://s.flowboot.cn/img/logo.png",
            nickName: "请授权登入"
        },
        // 宫格配置
        myGrid: myGrid,
        myStatusAll: {
            appointWithMeStatus: null,
            myAppointStatus: null,
            provideServiceStatus: null,
            seekServiceStatus: null,
        }


    },
    onLoad: function (options) {
        
    },
    async onShow() {
        const data = await wx.getStorageSync(cache.UNREAD_COUNT);
        if (data) {
            setTabBarBadge(data.index, data.count)
        }

        //验证TODO令牌
        const userInfo = User.getUserInfoByLocal();
        if (userInfo) {
            this.setData({
                userInfo
            });
        } else{
            let userInfo = {
                avatarUrl: "http://s.flowboot.cn/img/logo.png",
                nickName: "请授权登入"
            }
            this.setData({
                userInfo
            });
        }

        this._getOrderStatus();
        this._getServiceStatus();
    },

    async _getOrderStatus() {
        const appointWithMeStatus = Order.getOrderStatus(roleType.PUBLISHER);
        const myAppointStatus = Order.getOrderStatus(roleType.CONSUMER);
        this.setData({
            [`myStatusAll.appointWithMeStatus`]: await appointWithMeStatus,
            [`myStatusAll.myAppointStatus`]: await myAppointStatus

        })

        console.log(this.data.myStatusAll['appointWithMeStatus']['unapproved'])


    },

    async _getServiceStatus() {
        const provideServiceStatus = Service.getServiceStatus(serviceType.PROVIDE)
        const seekServiceStatus = Service.getServiceStatus(serviceType.SEEK);
        this.setData({
            [`myStatusAll.provideServiceStatus`]: await provideServiceStatus,
            [`myStatusAll.seekServiceStatus`]: await seekServiceStatus
        })
    },

    handleNvaToRoute:function (e){
        const cell = getEventParam(e,'cell');
        console.log(cell)

        switch (cell.type){
            case cellType.SERVICE:
                this._handleNvaToService(cell);
                break;
            case cellType.ORDER:
                this._handleNvaToOrder(cell);
                break;
        }
        // if (!('status' in cell)){
        //     wx.navigateTo({
        //         url:`/pages/refund-list/index?role=${cell.role}`
        //     })
        //     return;
        // }
        //
        // wx.navigateTo({
        //     url:`/pages/my-order/index?role=${cell.role}&status=${cell.status}`
        // })

    },

    _handleNvaToOrder(cell){
        if (!('status' in cell)){
            wx.navigateTo({
                url:`/pages/refund-list/index?role=${cell.role}`
            })
            return;
        }

        wx.navigateTo({
            url:`/pages/my-order/index?role=${cell.role}&status=${cell.status}`
        })
    },

    _handleNvaToService(cell){
        const {serviceType,status} = cell;
        wx.navigateTo({
            url:`/pages/my-service/index?type=${serviceType}&status=${status}`
        })
    },
    handleToUserInfo(){
        if(this.data.userInfo.id == undefined){
            wx.navigateTo({
                url:`/pages/login/index`
            })
        } else{
            console.log("个人主页")
        }
        
    }
});