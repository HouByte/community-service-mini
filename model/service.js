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
        const serviceList = await Http.getFrom('6103b632311c491a739a77b6?/service/list',{
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            type:type||'',
            categoryId:categoryId||''
        })

        //合并
        // this.data = this.data.concat(serviceList.list);
        // // 判断是否当前已经是最后一页了
        // this.hasMoreData = !(this.pageNum ===serviceList.lastPage);
        // this.pageNum ++;

        return this.handleData(serviceList);
    }

    static async getServiceById(id){
        return  await Http.getFrom('6104d84b311c491a73d58adc?/service/id')

    }

    static updateServiceStatus(id,action){
        return {}
    }


}

module.exports = Service