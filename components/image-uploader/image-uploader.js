import {getDataSet} from "../../utils/utils";
import FileUploader from "../../utils/file-uploader";

Component({
    properties: {
        // 默认展示图片的文件图片
        files:{
            type:Array,
            value:[]
        },
        // 最大上传图片数量
        maxCount:{
            type:Number,
            value:1
        },
        // 单个图片文件大小限制，单位M
        size:{
            type:Number,
            value:2
        },
        // 可选图片大小类型，original: 原图，compressed: 压缩图
        // 默认都可以
        sizeType:{
            type:Array,
            value:['original','compressed']
        },
        // 可选图片来源， album:从相册选图， camera: 使用相机
        // 默认都可以
        sourceType:{
            type:Array,
            value:['album','camera']
        }
    },
    observers:{
        //数据监听器
      files:function (newValue){
          if (newValue.length === 0){
              return;
          }
          const _files = [];
          newValue.forEach((item,index)=>{
              const file = {
                  path:item,
                  status:this.data.uploadStatusEnum.SUCCESS,
                  error:null
              };
              _files.push(file);
          })
          this.setData({
              _files
          })
      }
    },
    data: {
        uploadStatusEnum:{
            ERROR:0,
            UPLOADING:1,
            SUCCESS:2
        },
        _files:[]
    },
    methods: {
        /**
         * 图片预览
         * @param e
         */
        handlePreview:function (e){
            this.triggerEvent('hidepage');
            const index = getDataSet(e,'index');
            const  urls = this.data._files.map(item=>item.path);
            wx.previewImage({
                urls,
                current:urls[index]
            })
        },
        /**
         * 删除操作
         * @param e
         */
        handleDelete:function (e){
            const index = getDataSet(e,'index');
            const deteled = this.data._files.splice(index,1);
            this.setData({
                _files:this.data._files
            })
            this.triggerEvent('delete',{index,item:deteled[0]});
        },
        /**
         * 选择图片处理
         * @returns {Promise<void>}
         */
        handleChooseImage:async function (){
            this.triggerEvent('hidepage');
           const res = await wx.chooseImage({
                count:this.data.maxCount,
                sizeType:this.data.sizeType,
                sourceType:this.data.sourceType

            })



            this.triggerEvent('chooce',{files:res.tempFiles})

            //过滤文件
            const  _files = await this._filesFilter(res.tempFiles)
            this.setData({
                _files
            })

            const uploadTask = _files.filter(item=>item.status === this.data.uploadStatusEnum.UPLOADING);
           this._executeUpload(uploadTask);

        },

        /**
         * 文件规则过滤
         * @param files
         * @private
         */
        _filesFilter(files){
            const res = [];
            files.forEach((item,index)=>{
                let error = '';
                if (item.size > (this.data.size * 1024 * 1024)){
                    error = `图片大小不能超过${this.data.size}M`;
                    this.triggerEvent('validatefail',{item,error});
                }
                const length = this.data._files.length;
                res.push({
                    id:null,
                    key:index+length+'',
                    path:item.path,
                    status:error? this.data.uploadStatusEnum.ERROR:this.data.uploadStatusEnum.UPLOADING,
                    error:error
                })
            })
            return this.data._files.concat(res);
        },
        async _executeUpload(uploadTask){
            const  success = [];
            for (const file of uploadTask) {

               
               
                try {
                    const res = await FileUploader.upload(file.path,file.key);
                    file.uri = res.uri;
                    file.status = this.data.uploadStatusEnum.SUCCESS;
                    // this.data._files.push(file);
                    success.push(file);
                }catch (e){
                    console.log(e);
                        file.status = this.data.uploadStatusEnum.ERROR;
                    file.error = "上传失败";
                    this.triggerEvent('uploadfail',{file,errot:e})
                }
            }
            this.setData({
                _files:this.data._files
            })
            if (success.length){
                console.log(success);
                this.triggerEvent('uploadsuccess',{files:success})
            }
        }

    }
});
