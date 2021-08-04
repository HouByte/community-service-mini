import Service from "../../model/service"
import {getDataSet, getEventParam} from "../../utils/utils";
const service = new Service();

Page({
    data: {
        tabs:['全部服务','待审核','待发布','已发布'],
        serviceList:[],
        active:0,
        type:0,
        status:null
    },
    onLoad: function (options) {
        const type = parseInt(options.type);
        //status： -1 全部 0 待同意 1待支付 2 待确认 3 待评价
        const status = parseInt(options.status);
        this.setData({
            active:status+1
        })

        this.data.status = status < 0 ? '' : status;
        this.data.type = type;
        this._getSeviceList();
    },
    async _getSeviceList(){
        const serviceList = await service.reset().getServiceList();
        this.setData({
            serviceList
        })
    },
    handleSelect(e){
        console.log(e)
        const service =  getDataSet(e,'service');
        wx.navigateTo({
            url:`/pages/service-detail/service-detail?id=${service.id}`
        })
    },

    async onPullDownRefresh() {
        await this._getSeviceList();
        wx.stopPullDownRefresh();
    },

    async onReachBottom() {
        if (!service.hasMoreData) {
            return
        }
        //
        const serviceList = await service   .getServiceList();
        this.setData({
            serviceList
        })
    },

    handleTabChange:async function (e){
        const index = getEventParam(e,'index');
        this.data.status = index < 1 ? '' : index-1;
        await this._getSeviceList();
    }
});