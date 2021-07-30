import Http from  "../utils/http";


class  Service {


    /**
     * 分页获取服务列表
     * @param pageNum 页码
     * @param pageSize 每页数量
     * @param type 服务类型
     * @param categoryId 分类
     */
    static async getServiceList(pageNum=null,pageSize=null,type=null,categoryId=null){
        console.log("分页获取服务列表")
        return await Http.get('6103b632311c491a739a77b6?/service/list')
    }


}

module.exports = Service