import serviceType from "../../enum/service-type";
import {getDataSet, getEventParam} from "../../utils/utils";
import Category from "../../model/category"

Component({
    properties: {
        form: {
            type: Object,
            value: {
                type: -1,
                title: '',
                categoryId: null,
                coverImageId: null,
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
                name: '提供服务'
            },
            {
                id: serviceType.SEEK,
                name: '寻找服务'
            }
        ],
        typePickerIndex: null,
        formData: {
            type: null,
            title: '',
            categoryId: null,
            coverImageId: null,
            description: '',
            designatedPlace: false,
            beginDate: '',
            endDate: '',
            price: ''
        },
        categoryList: [],
        categoryPickerIndex: null

    },
    lifetimes: {
        attached() {
            this._init();
        }
    },
    methods: {
        async _init() {
            console.log("11")
            const typePickerIndex = this.data.typeList.findIndex(item => this.data.form.type === item.id)
            console.log("22")
            const categoryList = await Category.getCategoryList();
            const categoryPickerIndex = categoryList.findIndex(item => this.data.form.categoryId === item.id);
            console.log("categoryList ", categoryList)
            this.setData({
                typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
                categoryList,
                categoryPickerIndex: categoryPickerIndex !== -1 ? categoryPickerIndex : null,
                formData: {
                    type: this.data.form.type,
                    title: this.data.form.title,
                    categoryId: this.data.form.categoryId,
                    coverImageId: this.data.form.coverImageId,
                    description: this.data.form.description,
                    designatedPlace: this.data.form.designatedPlace,
                    beginDate: this.data.form.beginDate,
                    endDate: this.data.form.endDate,
                    price: this.data.form.price
                }
            });


        },
        submit(){
            console.log("提交");
        },
        handleTypeChange(e) {
            console.log(e)
            const index = getEventParam(e, 'value');
            this.setData({
                typePickerIndex: index,
                ['formData.type']: this.data.typeList[index].id
            });
        },
        handleInput: function (e) {
            const value = getEventParam(e, 'value');
            const field = getDataSet(e, 'field')

            this.setData({
                typePickerIndex: index,
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
        }
    }
});
