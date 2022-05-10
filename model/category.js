import Http from  "../utils/http";


class  Category {


    /**
     * 获取分类
     */
    static async getCategoryList(){
        return await Http.get('category/select/options')
    }


    static async getCategoryListWithAll(){
        const categoryList = await Category.getCategoryList();
        categoryList.unshift({
            id:0,
            name:'全部'
        })
        return categoryList;
    }
}

module.exports = Category