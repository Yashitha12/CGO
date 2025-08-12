import axios from 'axios';
import resources_files from '../base_resources';

const API_URL = resources_files.backend_url_system_management();

class EntityService {


    saveEntity(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);
        formData.append("address", dataSet.address);
        formData.append("city", dataSet.city);
        formData.append("contactNumberFixed", dataSet.contactNumberFixed);
        formData.append("contactNumber", dataSet.contactNumber);
        formData.append("fax", dataSet.fax);
        formData.append("email", dataSet.email);
        formData.append("status", 1);

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/entity/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateEntity(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);
        formData.append("name", dataSet.name);
        formData.append("address", dataSet.address);
        formData.append("city", dataSet.city);
        formData.append("contactNumberFixed", dataSet.contactNumberFixed);
        formData.append("contactNumber", dataSet.contactNumber);
        formData.append("fax", dataSet.fax);
        formData.append("email", dataSet.email);
        formData.append("status", dataSet.status);

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/entity/update/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveCGORules(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("updateChildEntitiesAssets", dataSet.updateChildEntitiesAssets);
        formData.append("assetsLock", dataSet.assetsLock);
        formData.append("reportsLock", dataSet.reportsLock);
        formData.append("childReportsLock", dataSet.childReportsLock);
        formData.append("authorizeOfficer", dataSet.authorizeOfficer);
        formData.append("id", dataSet.id);

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/cgo/entity/rules/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateCGORules(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("idPK", dataSet.idPK);
        formData.append("updateChildEntitiesAssets", dataSet.updateChildEntitiesAssets);
        formData.append("assetsLock", dataSet.assetsLock);
        formData.append("reportsLock", dataSet.reportsLock);
        formData.append("childReportsLock", dataSet.childReportsLock);
        formData.append("authorizeOfficer", dataSet.authorizeOfficer);
        formData.append("id", dataSet.id);

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/cgo/entity/rules/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveCodeBlock(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("lineItem1", dataSet.category1);
        formData.append("lineItem2", dataSet.category2);
        formData.append("lineItem3", dataSet.category3);
        formData.append("lineItem4", dataSet.category4);
        formData.append("lineItem5", dataSet.category5);
        formData.append("lineItem6", dataSet.category6);
        formData.append("lineItem7", dataSet.category7);
        formData.append("lineItem9", dataSet.category9);

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/code/pattern/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateCodeBlock(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);
        formData.append("lineItem1", dataSet.category1);
        formData.append("lineItem2", dataSet.category2);
        formData.append("lineItem3", dataSet.category3);
        formData.append("lineItem4", dataSet.category4);
        formData.append("lineItem5", dataSet.category5);
        formData.append("lineItem6", dataSet.category6);
        formData.append("lineItem7", dataSet.category7);
        formData.append("lineItem9", dataSet.category9);

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/code/pattern/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveItem0(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);


        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub0/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateItem0(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);//PK
        formData.append("name", dataSet.name);


        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub0/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveItem1(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);
        formData.append("id", dataSet.id);//FK

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub1/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateItem1(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id_pk", dataSet.id_pk);//PK
        formData.append("id", dataSet.id);//Fk 
        formData.append("name", dataSet.name);


        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub1/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }


    saveItem2(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);
        formData.append("id_pk", dataSet.id_pk);//Fk 

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub2/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateItem2(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id_pk", dataSet.id_pk);//Fk 
        formData.append("id", dataSet.id);//PK
        formData.append("name", dataSet.name);


        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub2/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveItem3(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);
        formData.append("id", dataSet.id);//Fk 

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub3/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateItem3(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id_pk", dataSet.id_pk);//PK
        formData.append("id", dataSet.id);//Fk 
        formData.append("name", dataSet.name);


        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub3/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveItem4(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);
        formData.append("id_pk", dataSet.id_pk);//FK

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub4/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateItem4(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);//PK
        formData.append("name", dataSet.name);
        formData.append("id_pk", dataSet.id_pk);//FK

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub4/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveItem5(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);
        formData.append("id", dataSet.id);//FK

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub5/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateItem5(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id_pk", dataSet.id_pk);//PK
        formData.append("id", dataSet.id);//FK
        formData.append("name", dataSet.name);


        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub5/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveItem6(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("name", dataSet.name);
        formData.append("id_pk", dataSet.id_pk);//FK

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub6/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    updateItem6(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("id", dataSet.id);//PK
        formData.append("name", dataSet.name);
        formData.append("id_pk", dataSet.id_pk);//FK

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/emsub6/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    saveCodePatternManagement(dataSet) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("parent_name", dataSet.entityIdParent);
        formData.append("child_name", dataSet.entityIdSub);
        formData.append("status", "1");

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/code/pattern/management/save/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    removeEntityChild(child, parent) {
        let formData = new FormData();
        let user = sessionStorage.getItem('userid');

        formData.append("parent_name", parent);
        formData.append("child_name", child);
        formData.append("status", "0");

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/code/pattern/management/update/' + user, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteEntity(dataSet) {
        let user = sessionStorage.getItem('userid');

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/entity/delete/' + dataSet + "/" + user, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteItem0(dataSet) {
        let user = sessionStorage.getItem('userid');

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/item/order/0/delete/' + dataSet + "/" + user, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteItem1(dataSet) {
        let user = sessionStorage.getItem('userid');

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/item/order/1/delete/' + dataSet + "/" + user, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteItem2(dataSet) {
        let user = sessionStorage.getItem('userid');
        return axios
            .post(API_URL + '/post/api/production/system/management/backend/item/order/2/delete/' + dataSet + "/" + user, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteItem3(dataSet) {
        let user = sessionStorage.getItem('userid');
        return axios
            .post(API_URL + '/post/api/production/system/management/backend/item/order/3/delete/' + dataSet + "/" + user, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteItem4(dataSet) {
        let user = sessionStorage.getItem('userid');
        return axios
            .post(API_URL + '/post/api/production/system/management/backend/item/order/4/delete/' + dataSet + "/" + user, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteItem5(dataSet) {
        let user = sessionStorage.getItem('userid');

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/item/order/5/delete/' + dataSet + "/" + user, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }

    deleteItem6(dataSet) {
        let user = sessionStorage.getItem('userid');

        return axios
            .post(API_URL + '/post/api/production/system/management/backend/item/order/6/delete/' + dataSet + "/" + user, {
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

        let formData = new FormData();
        formData.append("file1", file);

        return axios.post(API_URL + '/post/api/production/system/management/backend/restapi/set/entity/list/from/excel/file/' + user, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

}

export default new EntityService();
