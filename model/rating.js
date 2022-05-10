import Http from "../utils/http";
import Base from "./base";

class Rating extends Base{

    //分页
    async getServiceRatingList(id){
        this.hasMoreData = false
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


    static getRatingById(orderId){
        return {
            "id": orderId,
            "score": 3,
            "content": "牛，跟新的一样2。",
            "illustration": [],
            "status": 0,
            "created": 1627646143000,
            "author": {
                "nickname": "yjj",
                "avatarUrl": "http://s.bugio.cn/img/logo.jpg"
            }
        }
    }

    static createRating(ordderId,score,content,illustration){
        return {}
    }


}

export default Rating;