import cache from "../../enum/cache";
import {setTabBarBadge} from "../../utils/wx";

Page({
    data: {},
    onLoad: function (options) {

    },
    async onShow() {
        const data = await wx.getStorageSync(cache.UNREAD_COUNT);
        if (data){
            setTabBarBadge(data.index, data.count)
        }
    },
});