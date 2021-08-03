Component({
    properties: {
        flow:String,
        service:String,
        extension:String
    },
    lifetimes:{
        attached() {
            // let service = this.data.service;
            //
            // console.log("test",service,typeof service === Object)
            // service = typeof service === Object ? service:JSON.parse(service);
            // console.log(service)
            // this.setData({
            //     _service:service
            // })
        }
    },
    observers:{
      service:function (service){
            if (!service){
                console.log(service,"null service")
                return;
            }
          this.setData({
              _service:typeof service === Object ? service:JSON.parse(service)
          })
      }
    },
    data: {
        _service:null,
        flowEnum:{
            IN:'in',
            OUT:'out'
        }
    },
    methods: {
        handleSendLink:function (){
            this.triggerEvent('send',{service:this.data._service})
        },
        handleSelect:function (){
            this.triggerEvent('select',{service:this.data._service})
        }
    }
});
