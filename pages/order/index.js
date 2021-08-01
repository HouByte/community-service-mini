import Order from "../../model/Order";

Page({
    data: {
        service:null,
        address:null
    },
    onLoad: function (options) {
        const service = JSON.parse(options.service);
        console.log(service)
        this.setData({
            service
        })
    },
    handleSelectAddress:async function(){
        const address = await wx.chooseAddress();
        this.setData({
            address
        })
    },
    handleOrder:async function (){
        if (this.data.service.designatedPlace && !this.data.address){
           await wx.showModal({
                title:'错误',
                content:'该服务必须指定服务地点',
                showCancel:false
            })
            return
        }

        const res = await wx.showModal({
            title:'注意',
            content:'是否确认预约该服务'
        })
        if (!res.confirm){
            return;
        }

        wx.showLoading({
            title:'正在预约',
            mask:true
        })

        try {
            Order.createOrder();
            setTimeout(()=>{
                wx.hideLoading();
                // wx.switchTab({
                //     url:'/pages/home/index'
                // })
                wx.redirectTo({
                    url:'/pages/order-success/index'
                })
            },2000);
        } catch (e){
            wx.showModal({
                title:'错误',
                content:'预约失败请稍后重试'
            })
            console.log(e)
        }




    }
});