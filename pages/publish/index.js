import {getEventParam} from "../../utils/utils";
import Service from  "../../model/service"
import cache from "../../enum/cache";
import {setTabBarBadge} from "../../utils/wx";
Page({
    data: {
        formData:{
            type: null,
            title: '',
            categoryId: null,
            coverImage: null,
            description: '',
            designatedPlace: false,
            beginDate: '',
            endDate: '',
            price: ''
        }
    },
    onLoad: function (options) {

    },
    async onShow() {
        const data = await wx.getStorageSync(cache.UNREAD_COUNT);
        if (data){
            setTabBarBadge(data.index, data.count)
        }
    },
    handleSubmit:async function (e){

        const res = await wx.showModal({
            title:'提示',
            content:'是否确认申请发布该服务？',
            showCancel:true
        })
        if (!res.confirm){
            return;
        }
        wx.showLoading({
            title:'正在发布...',
            mask:true
        })
        const formData = getEventParam(e,'formData')
        try{
            await Service.publishService(formData);
            const type = formData.type;
            wx.hideLoading();
            this._resetFrom();
            wx.redirectTo({
                url:`/pages/publisher-success/index?type=${type}`
            })
        }catch (e){
            console.log(e)
        }
    },

    _resetFrom(){
        const formData = {
            type: -1,
                title: '',
                categoryId: null,
                coverImage: null,
                description: '',
                designatedPlace: false,
                beginDate: '',
                endDate: '',
                price: ''
        }

        this.setData({
            formData
        })
    }
});