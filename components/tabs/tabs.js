Component({
    options:{
      multipleSlots:true //开启多插槽
    },
    properties: {
        tabs:{
            type:Array,
            value:[]
        }
    },
    data: {
        currentTabIndex:0
    },
    methods: {
        //1.传入一个数组，按数组元素内容渲染我们的标签页选项
        //2.能够监听点击事件，并通知使用组件页面或者父组件
        //通用组件
        //父组件（页面）通过属性给自定义组件传递参数
        //自定义组件通过自定义事件给父组件（页面）传递参数
        handlerTabChange:function (e){
            const index = e.currentTarget.dataset.index;
            //如果是当前位置不执行操作
            if (index === this.data.currentTabIndex){
                return;
            }

            this.setData({
                currentTabIndex:index
            })

            //产生事件
            this.triggerEvent('change',{index});
        },
        handleTouchMove(e){
            const direction = e.direction;
            const currentTabIndex = this.data.currentTabIndex;
            const targetTabIndex = currentTabIndex + direction;

            //边界判断
            if (targetTabIndex <0 || targetTabIndex > this.data.tabs.length -1 ){
                return ;
            }

            //创建调用方法结构
            const  customEvent = {
                currentTarget:{
                    dataset:{
                        index:targetTabIndex
                    }
                }
            }
            //使用已有方法
            this.handlerTabChange(customEvent);
        }
    }
});
