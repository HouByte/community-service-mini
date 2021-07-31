import Http from  "../utils/http";


class Service {

    pageNum=1;
    pageSize=5;
    data=[];
    hasMoreData = true;
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

        console.log(this.pageNum,serviceList)
        //合并
        this.data = this.data.concat(serviceList.list);
        // 判断是否当前已经是最后一页了
        this.hasMoreData = !(this.pageNum ===serviceList.lastPage);
        this.pageNum ++;

        return this.data;
    }

    reset(){
        this.pageNum=1;
        this.pageSize=5;
        this.data=[];
        this.hasMoreData = true;
        return this;
    }


}

module.exports = Service