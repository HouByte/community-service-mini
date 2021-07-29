Page({
    data: {
        tabs:['全部服务','在提供','正在找'],
        currentTabIndex:0
    },
    onLoad: function (options) {

    },
    handlerTabChange:function (e){
        console.log(e)
        this.setData({
            currentTabIndex:e.currentTarget.dataset.index
        })
    }
});