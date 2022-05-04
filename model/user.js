import Http from  "../utils/http";
import cache from "../enum/cache";

class User {
    static async login(code,userInfo){
        wx.showLoading({
            title:'正在授权',
            mask:true
        })
       const res =  await Http.postFrom('login',{
            code:code,
            nickName:userInfo.nickName,
            avatarUrl:userInfo.avatarUrl,
            gender:userInfo.gender,
            client_type:'wechat_mini'

        })

        userInfo.id = res.id
        //设置缓存
        await wx.setStorageSync(cache.USER_INFO,userInfo);
        await wx.setStorageSync(cache.TOKEN,res.token);
        setTimeout((res)=>{
            wx.hideLoading();
        },2000)
        

    }

    static getUserInfoByLocal(){
        return wx.getStorageSync('user-info');
    }
}

export default User;