import axios from 'axios';
import resources_files from '../base_resources';

const API_URL = resources_files.backend_url_internal();

class NewsService {


    saveNews(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        console.log(dataSet);

        formData.append("heading", dataSet.newsHeading);
        formData.append("content", dataSet.newsContentData);


        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/news/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateNews(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        console.log(dataSet);

        formData.append("heading", dataSet.newsHeading);
        formData.append("content", dataSet.newsContentData);
        formData.append("id", dataSet.id);
        formData.append("status", dataSet.status);


        return axios
            .post(API_URL + '/post/api/production/user/internal/backend/news/update/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

}

export default new NewsService();
