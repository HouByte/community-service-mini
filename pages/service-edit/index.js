import {getEventParam} from "../../utils/utils";
import Service from "../../model/service";
import ApiConfig from "../../config/api";


Page({
    data: {
        formData:{},
        serviceId:-1
    },
    onLoad: function (options) {
        console.log("onload",options)
        const service = JSON.parse(options.service);
        this._init(service);
    },
    _init(service){
        const formData = {
            type: service.type,
            nature: service.nature,
            title: service.title,
            categoryId: service.category,
            coverImage: service.coverImage,
            description: service.description,
            designatedPlace: service.designatedPlace,
            beginDate: service.beginDate,
            endDate: service.endDate,
            price: service.price
        }

        console.log(formData);
        this.setData({
            formData,
            serviceId:service.id
        })
    },
    _resetFrom:function(){
        const formData = {
        }

        this.setData({
            formData,
            serviceId:undefined
        })
    },
    handleSubmit:async function (e){

        const res = await wx.showModal({
            title:'提示',
            content:'是否确认申请发布该服务？提交后会重新进入待审核状态',
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

            formData.id = this.data.serviceId
            await Service.publishService(formData);
            const type = formData.type;
            this._resetFrom();
            wx.redirectTo({
                url:`/pages/publisher-success/index?type=${type}`
            })
        }catch (e){
            console.log(e)
        }
    }
});