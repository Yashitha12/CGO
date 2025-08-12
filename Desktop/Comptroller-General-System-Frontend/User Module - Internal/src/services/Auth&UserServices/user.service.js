import axios from 'axios';
import resources_files from '../base_resources';
import router from '../../router';

const API_URL = resources_files.backend_url_internal() + '/api/auth';
const API_URL_external = resources_files.backend_url_external() + '/api/auth';

import authHeader from './auth-header';

class UserService {

  profileCheck(userName) {
    return axios
      .get(API_URL + '/restapi/get/one/user/profile/by/user/id/' + userName, { headers: authHeader() })
      .then(response => {
        if (response.data == "") {
          sessionStorage.setItem('profile', "0");
          router.push("/complete/profile");
        } else if (response.data.status == "0") {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('userid');
          sessionStorage.removeItem('UserName');
          sessionStorage.setItem('profile', "0");
          router.push("/account/rejected");
        } else {
          sessionStorage.setItem('profile', response.data.status);
          sessionStorage.setItem('UserName', response.data.nameWithInitials);
          window.location.href = "/cgoInternal/";
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  saveProfile(dataSet) {
    let formData = new FormData();
    let user = JSON.parse(sessionStorage.getItem('user'));

    formData.append("firstName", dataSet.firstName);
    formData.append("lastName", dataSet.lastName);
    formData.append("nameWithInitials", dataSet.nameWithInitials);
    formData.append("address", dataSet.address);
    formData.append("city", dataSet.city);
    formData.append("contactNumberMobile", dataSet.contactNumberMobile);
    formData.append("contactNumberMobile2", dataSet.contactNumberMobile2);
    formData.append("email", dataSet.email);
    formData.append("entityId", dataSet.entityId);
    formData.append("status", 3);//should be assign in backend;[]
    formData.append("nicNumber", user.username);//should be get in local storage
    formData.append("userId", user.userid);//should be get in local storage


    return axios
      .post(API_URL + '/user/profile/save', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        sessionStorage.setItem('profile', "3");
        this.profileCheck(user.userid);
        setTimeout(window.location.href = "/cgoInternal/", 4000);
        return response.data;
      });
  }

  updateProfile(dataSet) {
    let formData = new FormData();
    let user = JSON.parse(sessionStorage.getItem('user'));

    formData.append("id", dataSet.id);
    formData.append("firstName", dataSet.firstName);
    formData.append("lastName", dataSet.lastName);
    formData.append("nameWithInitials", dataSet.nameWithInitials);
    formData.append("address", dataSet.address);
    formData.append("city", dataSet.city);
    formData.append("contactNumberMobile", dataSet.contactNumberMobile);
    formData.append("contactNumberMobile2", dataSet.contactNumberMobile2);
    formData.append("email", dataSet.email);
    formData.append("entityId", dataSet.entityId);
    formData.append("status", 3);//should be assign in backend;
    formData.append("nicNumber", user.username);//should be get in local storage
    formData.append("userId", dataSet.userId);


    return axios
      .post(API_URL + '/user/profile/save', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        sessionStorage.setItem('profile', "3");
        setTimeout(window.location.href = "/cgoInternal/", 4000);
        this.profileCheck(user.userid);
        return response.data;
      });
  }

  updateProfileSuperAdmin(dataSet) {
    let formData = new FormData();
    let user = sessionStorage.getItem('userid');

    formData.append("id", dataSet.id);
    formData.append("firstName", dataSet.firstName);
    formData.append("lastName", dataSet.lastName);
    formData.append("nameWithInitials", dataSet.nameWithInitials);
    formData.append("address", dataSet.address);
    formData.append("city", dataSet.city);
    formData.append("contactNumberMobile", dataSet.contactNumberMobile);
    formData.append("contactNumberMobile2", dataSet.contactNumberMobile2);
    formData.append("email", dataSet.email);
    formData.append("entityId", dataSet.entityId);
    formData.append("status", dataSet.status);//should be assign in backend;
    formData.append("nicNumber", user.username);//should be get in local storage
    formData.append("userId", dataSet.userId);


    return axios
      .post(API_URL + '/user/profile/save/status/' + dataSet.status + "/" + dataSet.userId + "/" + user, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        return response.data;
      });
  }

  updateProfileSuperAdminExternalStaff(dataSet) {
    let formData = new FormData();
    let user = sessionStorage.getItem('userid');

    formData.append("id", dataSet.id);
    formData.append("firstName", dataSet.firstName);
    formData.append("lastName", dataSet.lastName);
    formData.append("nameWithInitials", dataSet.nameWithInitials);
    formData.append("address", dataSet.address);
    formData.append("city", dataSet.city);
    formData.append("contactNumberMobile", dataSet.contactNumberMobile);
    formData.append("contactNumberMobile2", dataSet.contactNumberMobile2);
    formData.append("email", dataSet.email);
    formData.append("entityId", dataSet.entityId);
    formData.append("status", dataSet.status);//should be assign in backend;
    formData.append("nicNumber", user.username);//should be get in local storage
    formData.append("userId", dataSet.userId);
    formData.append("entityId", dataSet.entityId);
    formData.append("attachmentOfficeId", dataSet.attachmentOfficeId);
    formData.append("attachmentRequestLetter", dataSet.attachmentRequestLetter);

    return axios
      .post(API_URL_external + '/user/profile/save/status/' + dataSet.status + "/" + dataSet.userId + "/" + user, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        return response.data;
      });
  }

  updateLoginProfile(dataSet) {
    return axios
      .post(API_URL + '/update/user/login/' + dataSet.currentpassword, {
        id: dataSet.id,
        username: dataSet.username,
        userId: dataSet.userId,
        email: dataSet.email,
        password: dataSet.password
      })
      .then(response => {
        return response.data;
      });
  }
  passwordReset(userID){
    return axios
    .post(API_URL_external + '/update/user/login/by/admin/' + userID, {

    }).then(response => {
      return response.data;

    });

  }
  resetToDefaultPW(id) {
    return axios
    .post(API_URL_external + '/update/user/login/by/admin/' + id, {
    }).then(response => {
      alert(response.data.message);
      return response.data;
    });
  }
}

export default new UserService();
