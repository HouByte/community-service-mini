import {getEventParam} from "../../utils/utils";
import Service from "../../model/service";

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
            title: service.title,
            categoryId: service.category.id,
            coverImage: service.coverImage,
            description: service.description,
            designatedPlace: service.designatedPlace,
            beginDate: service.beginDate,
            endDate: service.endDate,
            price: service.price
        }

        this.setData({
            formData,
            serviceId:service.id
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
            await Service.editService(this.data.serviceId,formData);
            const type = formData.type;
            setTimeout(()=>{
                wx.hideLoading();
                this._resetFrom();
                wx.redirectTo({
                    url:`/pages/publisher-success/index?type=${type}`
                })

            },2000)
        }catch (e){
            console.log(e)
        }
    }
});