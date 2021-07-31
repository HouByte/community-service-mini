import Http from "../utils/http";
import Base from "./base";

class Rating extends Base{

    //分页
    async getServiceRatingList(id){
        if (!this.hasMoreData) {
            return this.data;
        }
        const ratingList = await Http.getFrom('6105223a311c491a73f2d8c5?/service/rating/list',{
            pageNum:this.pageNum,
            pageSize:this.pageSize
        });

        // //合并
        // this.data = this.data.concat(ratingList.list);
        // // 判断是否当前已经是最后一页了
        // this.hasMoreData = !(this.pageNum ===ratingList.lastPage);
        // this.pageNum ++;

        return this.handleData(ratingList);
    }


}

export default Rating;