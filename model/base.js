//基类
class Base {
    pageNum=1;
    pageSize=5;
    data=[];
    hasMoreData = true;

    handleData(response){
        //合并
        this.data = this.data.concat(response.list);
        // 判断是否当前已经是最后一页了
        console.log(response);
        this.hasMoreData = response.pages.is_next === 1;
        console.log(response.is_next,this.pageNum,this.hasMoreData)
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

export default Base;