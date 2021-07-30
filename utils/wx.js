export default function wxToPromise(method,option={}){
    return new Promise((resolve,reject)=>{
        option.success = resolve
        option.fail = err => {
            reject(err)
        }
        wx[method](option)
    })
}