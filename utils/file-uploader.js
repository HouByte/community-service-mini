import wxToPromise from "./wx";
import ApiConfig from "../config/api";
import Http from "./http";

class FileUploader{
    static upload(filePath,key='file'){

        return new Promise((resolve, reject) =>{
            wx.uploadFile({
                url: ApiConfig.baseUrl + 'upload/file', 
                filePath: filePath,
                name: 'file',
                success (res){
                    const data = res.data
                    console.log(data);
                    //do something
                    const serverData = JSON.parse(res.data);

                    if (serverData.code !== 200){
                        reject(serverData.msg);
                    } else{
                        resolve(serverData.data);
                    }
                    
                },
                fail: err => {
                    reject(err);
                }
              });
        })
        
    }
}

export default FileUploader;