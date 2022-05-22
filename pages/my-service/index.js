import Service from "../../model/service"
import {getDataSet, getEventParam} from "../../utils/utils";
const service = new Service();

Page({
    data: {
        tabs:['全部服务','待发布','待审核','已发布'],
        serviceList:[],
        active:0,
        type:0,
        status:null
    },
    onLoad: function (options) {
        const type = parseInt(options.type);
        //status： -1 全部 0 待同意 1待支付 2 待确认 3 待评价
        console.log(options.status);
        const status = parseInt(options.status);
        this.setData({
            active:status+1
        })

        this.data.status = status < 0 ? -1 : status;
        this.data.type = type;
        console.log(this.data);
        this._getServiceList();
    },
    async _getServiceList(mix_kw=''){
        const serviceList = await service.reset().getServiceList(this.data.type,-1,this.data.status,2,mix_kw);
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
        await this._getServiceList();
        wx.stopPullDownRefresh();
    },

    async onReachBottom() {
        if (!service.hasMoreData) {
            return
        }
        //
        const serviceList = await service.getServiceList(this.data.type,-1,this.data.status,2);
        this.setData({
            serviceList
        })
    },

    handleTabChange:async function (e){
        const index = getEventParam(e,'index');
        this.data.status = index < 1 ? -1 : index-1;
        await this._getServiceList();
    },
    handlerSearch:async function(e){
        let keyword = getEventParam(e,'keyword')
        console.log(keyword);
        await this._getServiceList(keyword);
    }
});