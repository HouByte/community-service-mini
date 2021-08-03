import cache from "../enum/cache";

export default function wxToPromise(method,option={}){
    return new Promise((resolve,reject)=>{
        option.success = resolve
        option.fail = err => {
            reject(err)
        }
        wx[method](option)
    })
}

const setTabBarBadge = async function (index,count){
    try {
        if (count > 0){
            await wx.setTabBarBadge({
                index,
                text:count.toString()
            })
        } else {
            await wx.removeTabBarBadge({index})
        }
    } catch (e){
        console.log(e);
        wx.setStorageSync(cache.UNREAD_COUNT,{index,count})
    }
}

export {setTabBarBadge}