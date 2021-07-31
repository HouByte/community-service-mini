import Service from "../../model/service"
import Category from "../../model/category"

const service = new Service();
Page({
    data: {
        tabs:['全部服务','在提供','正在找'],
        categoryList:[],
        serviceList:[],
        tabIndex:'',
        categoryId:''
    },
    onLoad: function (options) {
        this._getServiceList();
        this._getCategoryList();
    },
    async _getServiceList(){
        const list = await service.getServiceList(this.data.tabIndex,this.data.categoryId);
        console.log("data",list)
        this.setData({
            serviceList:list
        })
    },
    async _refreshServiceList(){
        service.reset();
        this._getServiceList();
    },
    async _getCategoryList(){
        const categoryList = await Category.getCategoryListWithAll();
        this.setData({
            categoryList
        })
    },

    handlerTabsChange:function (e){
        console.log(e);
        this.data.tabIndex = e.detail.index;
        this._refreshServiceList();
    },

    handlerCategoryChange:function (e){
        if (this.data.categoryId === e.currentTarget.dataset.id){
            return;
        }
        this.data.categoryId = e.currentTarget.dataset.id;
        this._refreshServiceList();
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
        console.log("下拉刷新")
        this._refreshServiceList();
        wx.stopPullDownRefresh();
    },
    /**
     * 上啦触底
     */
    onReachBottom() {
        console.log("上啦触底");
        if (!service.hasMoreData) {
            return;
        }
        this._getServiceList();
    }
});