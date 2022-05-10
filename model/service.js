import Http from  "../utils/http";
import Base from "./base";


class Service extends Base{


    /**
     * 分页获取服务列表
     * @param pageNum 页码
     * @param pageSize 每页数量
     * @param type 服务类型
     * @param categoryId 分类
     */
    async getServiceList(type=null,categoryId=null){
        console.log("分页获取服务列表")
        if (!this.hasMoreData) {
            return this.data;
        }
        const serviceList = await Http.getFrom('service/list',{
            page:this.pageNum,
            page_size:this.pageSize,
            type:type||-1,
            category_id:categoryId||-1
        })

        //合并
        // this.data = this.data.concat(serviceList.list);
        // // 判断是否当前已经是最后一页了
        // this.hasMoreData = !(this.pageNum ===serviceList.lastPage);
        // this.pageNum ++;

        return this.handleData(serviceList);
    }

    /**
     * 获取指定id服务
     * @param id
     * @returns {Promise<*>}
     */
    static async getServiceById(id){
        return  await Http.getFrom('/service/desc',{
            id:id
        })

    }

    /**
     * 查询服务状态
     * @param type
     * @returns {{}}
     */
    static getServiceStatus(type){
        return {
            pending:1,
            unpublished:2
        }
    }

    /**
     * 更新指定id服务暂停
     * @param id
     * @param action
     * @returns {{}}
     */
    static updateServiceStatus(id,action){
        return {}
    }

    /**
     * 发布服务
     * @param formData
     * @returns {{}}
     */
    static publishService(formData){
        return {}
    }

    /**
     * 编辑服务
     * @param id 服务id
     * @param formData 服务数据
     * @returns {{}}
     */
    static editService(id,formData){
        return {}
    }


}

module.exports = Service