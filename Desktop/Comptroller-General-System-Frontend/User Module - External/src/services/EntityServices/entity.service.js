import axios from 'axios';
import resources_files from '../base_resources';


const API_URL = resources_files.backend_url_system_management();

class EntityService {

    generateQR(dataSet) {
        return axios
            .post(API_URL + '/get/api/production/system/management/backend/restapi/get/entity/from/qr/' + dataSet.entityId, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateChildFromQR(dataSet, file1) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("dddd", dataSet);
        formData.append("file1", file1);

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/code/pattern/management/entities/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    //this is reserved for file upload activities
    upload(file, onUploadProgress) {
        let user = sessionStorage.getItem('userid');
        let entityId = sessionStorage.getItem('entityId');

        let formData = new FormData();
        formData.append("file1", file);
        return axios
            .post(API_URL + '/get/api/production/system/management/backend/restapi/get/entity/details/from/qr/' + user + "/" + entityId, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress
            });
    }
}

export default new EntityService();
