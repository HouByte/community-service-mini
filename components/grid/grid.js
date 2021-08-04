import {getEventParam} from "../../utils/utils";

Component({
    options:{
        multipleSlots:true //开启多插槽
    },
    // 绑定组件关系
    relations:{
        '../grid-item/grid-item':{
            type:'child'
        }
    },
    properties: {
        rowNum:{
            type:Number,
            value:3
        },
        title:String,
        extend:String,
        extendCell:Object
    },
    data: {
        gridItems:null
    },
    lifetimes:{
      ready() {
          this.getGridItems();
      }
    },
    methods: {
        /**
         * 获取子组件提供的数量
         */
        getGridItems(){
            const items = this.getRelationNodes('../grid-item/grid-item');
            const gridItems = items.map((item,index)=>{
                return {
                    index
                }
            })
            this.setData({
                gridItems
            })
        },
        handleExtend:function (){
            this.triggerEvent('extendtap',{cell:this.data.extendCell});
        },
        handleSelect:function (e){
            const cell = getEventParam(e,'cell');
            this.triggerEvent('itemtap',{cell});
        }
    }
});
