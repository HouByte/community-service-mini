import Service from "../../model/service"
import Category from "../../model/category"

Page({
    data: {
        tabs:['全部服务','在提供','正在找'],
        currentTabIndex:0,
        categoryList:[],
        serviceList:[]
    },
    onLoad: function (options) {
        this._getServiceList();
        this._getCategoryList();
    },
    async _getServiceList(){
        const data = await Service.getServiceList();
        console.log("data",data)
        this.setData({
            serviceList:data.list
        })
    },
    async _getCategoryList(){
        const categoryList = await Category.getCategoryListWithAll();
        this.setData({
            categoryList
        })
    },
    handlerTabsChange:function (e){
        console.log(e);
    },

    handlerCategoryChange:function (e){
        console.log(e);
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
        console.log("下拉刷新")
    },
    /**
     * 上啦触底
     */
    onReachBottom() {
        console.log("上啦触底")
    }
});