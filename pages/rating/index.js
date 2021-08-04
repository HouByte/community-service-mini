import {getEventParam} from "../../utils/utils";
import Rating from "../../model/rating";

Page({
    data: {
        order:null,
        formData: {
            content: '',
            score: null
        },
        illustration: [],
        rules: [
            {
                name: 'score',
                rules: [
                    { required: true, message: '请为该服务评分' },
                ],
            },
            {
                name: 'content',
                rules: [
                    { required: true, message: '评价内容不能为空' },
                    { minlength: 10, message: '评价内容不能少于 10 个字' },
                ],
            },
        ]
    },
    onLoad: function (options) {
        console.log(options)
        const order = JSON.parse(options.order)
        this.setData({
            order
        })
    },
    handleRating(e){
        const score = getEventParam(e,'rating');
        this.setData({
            [`formData.score`]:score
        })
    },
    handleInputChange(e){
        const value = getEventParam(e,'value');
        this.setData({
            [`formData.content`]:value
        })
    },
    handleUploadSuccess(e){
        this.data.illustration = getEventParam(e,'files');
    },
    handleUploadDelete(e){
        const deleteIndex = this.data.illustration
            .findIndex(item => item.key === event.detail.item.key);

        this.data.illustration.splice(deleteIndex,1);
    },
    handleSubmit:function (){
        this.selectComponent('#form').validate(async (valid,errors)=>{
            if (!valid){
                const errMsg = errors.map(error => error.message);
                this.setData({
                    error:errMsg.join(';')
                });
                return;
            }
            wx.showLoading({title:'正在评分...',mask:true});
            const illustration = thia.data.illustration.map(item => item.url);
            Rating.createRating(this.data.order.id,this.data.order.formData.score,this.data.order.formData.content,illustration);

            setTimeout(()=> wx.hideLoading(),2000);
            await wx.showModal({
                title: '提示',
                content: '评价成功，点击确定返回订单详情',
                showCancel: false
            })

            this.getOpenerEventChannel().emit('rating')
            wx.navigateBack()
        })
    }
});