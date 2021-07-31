Component({
    properties: {
        rating:{
            type:Object,
            value:{}
        }
    },
    data: {},
    methods: {
        handlePreview:function (e) {
            console.log(e);
            const index = e.currentTarget.dataset.index;
            wx.previewImage({
                urls:this.data.rating.illustration,
                current:this.data.rating.illustration[index]
            })
        }
    }
});
