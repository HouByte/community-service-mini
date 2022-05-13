import serviceType from "../../enum/service-type";
import {getDataSet, getEventParam} from "../../utils/utils";
import Category from "../../model/category"

const moment = require("../../lib/moment")
Component({
    properties: {
        form: {
            type: Object,
            value: {
                type: null,
                nature: null,
                title: null,
                categoryId: null,
                coverImage: null,
                description: '',
                designatedPlace: false,
                beginDate: '',
                endDate: '',
                price: ''
            }
        }
    },
    data: {
        typeList: [
            {
                id: serviceType.PROVIDE,
                name: '提供'
            },
            {
                id: serviceType.SEEK,
                name: '寻找'
            }
        ],
        typePickerIndex: null,
        formData: {
            type: null,
            nature: null,
            title: '',
            categoryId: null,
            coverImage: null,
            description: '',
            designatedPlace: false,
            beginDate: '',
            endDate: '',
            price: 0
        },
        categoryList: [],
        categoryPickerIndex: null,
        natureList: [
            {
                id: 0, 
                name: "互助"
            },
            {
                id: 1, 
                name: "服务"
            },
            {
                id: 2, 
                name: "公益"
            }
        ],
        naturePickerIndex: null,
        error:null,
        rules: [
            {
                name: 'type',
                rules: { required: true, message: '请指定服务类型' },
            },
            {
                name: 'nature',
                rules: { required: true, message: '请指定服务性质' },
            },
            {
                name: 'title',
                rules: [
                    { required: true, message: '服务标题内容不能为空' },
                    { minlength: 5, message: '服务描述内容不能少于 5 个字' },
                ],
            },
            {
                name: 'categoryId',
                rules: { required: true, message: '未指定服务所属分类' },
            },
            // {
            //     name: 'coverImage',
            //     rules: { required: true, message: '请上传封面图' },
            // },
            {
                name: 'description',
                rules: [
                    { required: true, message: '服务描述不能为空' },
                    { minlength: 20, message: '服务描述内容不能少于 20 个字' },
                ],
            },
            {
                name: 'beginDate',
                rules: [
                    { required: true, message: '请指定服务有效日期开始时间' },
                ],
            },
            {
                name: 'endDate',
                rules: [
                    { required: true, message: '请指定服务有效日期结束时间' },
                    {
                        validator: function (rule, value, param, models) {
                            if (moment(value).isSame(models.begin_date) || moment(value).isAfter(models.begin_date)) {
                                return null
                            }
                            return '结束时间必须大于开始时间'
                        }
                    }
                ],

            },
            // {
            //     name: 'price',
            //     rules: [
            //         { required: true, message: '请指定服务价格' },
            //         {
            //             validator: function (rule, value, param, models) {
            //                 const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
            //                 const isNum = pattern.test(value);

            //                 if (isNum) {
            //                     return null
            //                 }
            //                 return '价格必须是数字'
            //             }
            //         },
            //         { min: 0.1, message: '服务是收费的功能' },
            //     ],
            // },
        ],
        resetForm: true,
        showForm: true,
        serviceTypeEnum:serviceType

    },
    pageLifetimes:{
        show(){
            if (this.data.resetForm){
                this._init();
            }
            this.data.resetForm = true
        },
        hide() {
            if (this.data.resetForm){
                this.setData({
                    showForm:false
                })
            }
        }
    },
    observers:{
        form:function (newValue){
            if (!newValue){
                return;
            }
            this._init();
        }
    },
    // lifetimes: {
    //     attached() {
    //
    //     }
    // },
    onLoad(){
        this._init()
    },
    methods: {
        async _init() {
            const categoryList = await Category.getCategoryList();
            const categoryPickerIndex = categoryList.findIndex(item => this.data.form.categoryId === item.id);
            const typePickerIndex = this.data.typeList.findIndex(item => this.data.form.type === item.id);
            const naturePickerIndex = this.data.natureList.findIndex(item => this.data.form.nature === item.id);

            let i = this.data.form.coverImage.indexOf('upload')

            this.setData({
                typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
                naturePickerIndex: naturePickerIndex !== -1 ? naturePickerIndex : null,
                categoryList,
                categoryPickerIndex: categoryPickerIndex !== -1 ? categoryPickerIndex : null,
                files:this.data.form.coverImage ? [this.data.form.coverImage]:[],
                formData: {
                    id:this.data.form.id,
                    type: this.data.form.type,
                    title: this.data.form.title,
                    nature: this.data.form.nature,
                    categoryId: this.data.form.categoryId,
                    coverImage: this.data.form.coverImage ? this.data.form.coverImage.substring(i):null,
                    description: this.data.form.description,
                    designatedPlace: this.data.form.designatedPlace,
                    beginDate: this.data.form.beginDate,
                    endDate: this.data.form.endDate,
                    price: this.data.form.price
                },
                showForm:true
            });


        },
        submit(){
            console.log(this.data.formData)
            this.selectComponent('#form').validate((valid,errors)=>{
                if (!valid){
                    const errMsg = errors.map(error=>error.message);
                    this.setData({
                        error:errMsg.join(';')
                    })
                    console.log(this.data.error)
                    return;
                }
                this.triggerEvent('submit', {formData:this.data.formData})
            });

        },
        handleTypeChange(e) {
            console.log(e)
            const index = getEventParam(e, 'value');
            this.setData({
                typePickerIndex: index,
                ['formData.type']: this.data.typeList[index].id
            });
        },
        handleNatureChange(e) {
            console.log(e)
            const index = getEventParam(e, 'value');
            this.setData({
                naturePickerIndex: index,
                ['formData.nature']: this.data.natureList[index].id
            });
        },
        handleInput: function (e) {
            const value = getEventParam(e, 'value');
            const field = getDataSet(e, 'field')

            this.setData({
                [`formData.${field}`]: value
            });
        },
        handleCategoryChange: function (e) {
            const index = getEventParam(e, 'value');
            this.setData({
                categoryPickerIndex: index,
                ['formData.categoryId']: this.data.categoryList[index].id
            });
        },
        handleSwitchChange: function (e) {
            const res = getEventParam(e, 'value');

            this.setData({
                ['formData.designatedPlace']: res
            });
        },
        handleDateChange: function (e) {
            console.log(e)
            const value = getEventParam(e, 'value');
            const field = getDataSet(e, 'field')

            this.setData({
                [`formData.${field}Date`]: value
            });

            console.log(this.data.formData)
        },
        handleUploadSuccess:function (e){
            let files = e.detail.files
            this.data.formData.coverImage = files[0].uri
            this.data.form.coverImage = files[0].uri
        },
        handleCoverDelete:function (e){
            this.data.formData.coverImageUri = undefined
            this.data.form.coverImage = undefined
        },
        handleHidePage:function (){
            this.data.resetForm = false
        }
    }
});
