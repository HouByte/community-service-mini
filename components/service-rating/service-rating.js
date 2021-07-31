import {getDataSet} from "../../utils/utils";

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
            const index = getDataSet(e,"index");
            wx.previewImage({
                urls:this.data.rating.illustration,
                current:this.data.rating.illustration[index]
            })
        }
    }
});
