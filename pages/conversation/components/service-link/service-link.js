Component({
    properties: {
        flow:String,
        service:String
    },
    lifetimes:{
        attached() {
            this.setData({
                _service:JSON.parse(this.data.service)
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
            this.triggerEvent('send',{sercice:this.data._service})
        },
        handleSelect:function (){
            this.triggerEvent('select',{sercice:this.data._service})
        }
    }
});
