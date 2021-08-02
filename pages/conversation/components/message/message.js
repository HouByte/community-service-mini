import {formatTime} from "../../../../utils/date";
import TIM from "tim-wx-sdk-ws"
import {getDataSet, getEventParam} from "../../../../utils/utils";
Component({
    properties: {
        message:Object
    },
    observers:{
      'message':function (message){
          message.time = formatTime(message.time);
          this.setData({
              _message:message
          })
      }
    },
    data: {
        TIM:TIM,
        flowEnum:{
            IN:'in',
            OUT:'out'
        }

    },
    methods: {
        handleSend:function (e){
            const service = getEventParam(e,'service');
            this.triggerEvent('send',{service})
        },
        handleSelect:function (e){
            const service = getEventParam(e,'service');
            this.triggerEvent('select',{service})
        },
        handlePreview:async function (e){
            const url = getDataSet(e,'image');
            await wx.previewImage({
                urls:[url],
                current:url
            })
        }
    }
});
