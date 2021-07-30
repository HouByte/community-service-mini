Page({
    data: {
        tabs:['全部服务','在提供','正在找'],
        currentTabIndex:0,
        categoryList:[
            {
                id:1,
                name:'疏通'
            },
            {
                id:2,
                name:'家电维修'
            },
            {
                id:3,
                name:'在线教育'
            },
            {
                id:4,
                name:'婚恋'
            },
            {
                id:5,
                name:'宠物'
            }
        ]
    },
    onLoad: function (options) {

    },
    handlerTabsChange:function (e){
        console.log(e);
    },

    handlerCategoryChange:function (e){
        console.log(e);
    }
});