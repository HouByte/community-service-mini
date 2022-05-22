import Http from "../utils/http";
import Base from "./base";

class Rating extends Base{

    //分页
    async getServiceRatingList(sid){
        if (!this.hasMoreData) {
            return this.data;
        }
        const ratingList = await Http.getFrom('rating/list',{
            page:this.pageNum,
            page_size:this.pageSize,
            sid:sid
        });

        // //合并
        // this.data = this.data.concat(ratingList.list);
        // // 判断是否当前已经是最后一页了
        // this.hasMoreData = !(this.pageNum ===ratingList.lastPage);
        // this.pageNum ++;

        return this.handleData(ratingList);
    }


    static async getRatingById(orderId){
        return await Http.getFrom('rating/order',{
            oid:orderId
        });
    }

    static async createRating(id,score,content,illustration){
        
        return await Http.postFrom('rating/new',{
            id:id,
            score:score,
            content:content,
            illustration:illustration
        })
    }


}

export default Rating;