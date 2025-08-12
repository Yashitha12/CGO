import axios from 'axios';
import resources_files from '../base_resources';

const API_URL = resources_files.backend_url_internal();

class EntityService {


    saveDistrict(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("district", dataSet.name);

        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/contdistrict/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateDistrict(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');
        formData.append("id", dataSet.id);
        formData.append("district", dataSet.name);

        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/contdistrict/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveDivisionalSecretariat(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);
        formData.append("ds", dataSet.name);

        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/contds/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateDS(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);
        formData.append("id_pk", dataSet.id_pk);
        formData.append("ds", dataSet.name);

        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/contds/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveGN(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id_pk", dataSet.id);
        formData.append("gn", dataSet.name);

        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/contgn/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateGN(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);
        formData.append("id_pk", dataSet.id_pk);
        formData.append("gn", dataSet.name);

        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/contgn/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }
}

export default new EntityService();
