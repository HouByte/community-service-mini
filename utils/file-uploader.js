import wxToPromise from "./wx";
import ApiConfig from "../config/api";
import Http from "./http";

class FileUploader extends Http{
    static async upload(filePath,key='file'){
        let res ;
        try {
            res = await wxToPromise('uploadFile',{
                url:ApiConfig.baseUrl + '/upload/file',
                filePath,
                name:key
            });
        } catch (e){
            FileUploader._showError(-1);
            throw Error(e.errMsg)
        }

        const serverData = JSON.parse(res.data);

        if (res.statusCode !== 201){
            FileUploader._showError(serverData.code,serverData.msg);
            throw Error(serverData.errMsg)
        }

        return serverData.data;
    }
}

export default FileUploader;