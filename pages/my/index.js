import cache from "../../enum/cache";
import {setTabBarBadge} from "../../utils/wx";
import User from "../../model/user";
import {myGrid} from "../../config/grid";
import Order from "../../model/order";
import roleType from "../../enum/role-type";
import Service from "../../model/service";
import myCardTag from "../../enum/my-card-tag";
import serviceType from "../../enum/service-type";
import {getEventParam} from "../../utils/utils";

Page({
    data: {
        userInfo: {
            avatarUrl: "http://s.bugio.cn/img/logo.jpg",
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
        this._getOrderStatus();
        this._getServiceStatus();
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
        }
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

    handleNvaToOrder:function (e){
        const cell = getEventParam(e,'cell');

    }
});