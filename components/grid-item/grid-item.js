Component({
    // 绑定组件关系
    relations:{
        '../grid/grid':{
            type:'parent'// 关联的目标节点应为子节点
        }
    },
    properties: {
        icon:String,
        iconSize:{
            type:String,
            value:"50"
        },
        text:String,
        showBadge:{
            type:Boolean,
            value:false
        },
        badgeCount:{
            type:Number,
            value:0
        },
        cell:Object
    },
    data: {},
    methods: {
        handleSelect:function (){
            /**
             * 子组件消息传递给父组件
             * {
             * bubbles:true, 事件冒泡
             * composed:true 穿越组件边界
             * }
             */
            this.triggerEvent('select',{cell:this.data.cell},{bubbles:true,composed:true})
        }
    }
});
