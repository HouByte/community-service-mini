import Service from "../../model/service"
import Category from "../../model/category"
import {getDataSet, getEventParam, throttle} from "../../utils/utils";
import Tim from "../../model/tim";
import cache from "../../enum/cache";
import {setTabBarBadge} from "../../utils/wx";

const service = new Service();
Page({
    data: {
        tabs:['全部服务','在提供','正在找'],
        categoryList:[],
        serviceList:[],
        tabIndex:'',
        categoryId:'',
        loading:true
    },
    onLoad: async function (options) {
        await this._getServiceList();
        await this._getCategoryList();
        this.setData({
            loading:false
        })
    },
    async onShow() {
        const data = await wx.getStorageSync(cache.UNREAD_COUNT);
        if (data){
            setTabBarBadge(data.index, data.count)
        }
    },
    async _getServiceList(mix_kw=''){
        const list = await service.getServiceList(this.data.tabIndex,this.data.categoryId,-1,1,mix_kw);
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

    handlerTabsChange:throttle(function (e){
        console.log(e);
        this.data.tabIndex = getEventParam(e,"index");
        this._refreshServiceList();
    }),

    handlerCategoryChange:throttle(function (e){
        const id = getDataSet(e,"id");
        if (this.data.categoryId === id){
            return;
        }
        this.data.categoryId = id;
        this._refreshServiceList();
    }),
    handleSelectService:(e)=>{
        console.log(e);
        const serviceId = getDataSet(e,"id");
        wx.navigateTo({
            url:'/pages/service-detail/service-detail?id='+serviceId
        })
    },
    handlerSearch:async function(e){
        let keyword = getEventParam(e,'keyword')
        console.log(keyword);
        service.reset()
        await this._getServiceList(keyword);
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