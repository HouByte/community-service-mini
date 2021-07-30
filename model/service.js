import Http from  "../utils/http";


class  Service {


    /**
     * 分页获取服务列表
     * @param pageNum 页码
     * @param pageSize 每页数量
     * @param type 服务类型
     * @param categoryId 分类
     */
    getServiceList(pageNum=null,pageSize=null,type=null,categoryId=null){
        console.log("分页获取服务列表")
        const res =Http.get('6103b25e311c491a73973c59?/test?id=1')
        res.then((res)=>{
            console.log("then ",res);
        })
    }
}

module.exports = Service