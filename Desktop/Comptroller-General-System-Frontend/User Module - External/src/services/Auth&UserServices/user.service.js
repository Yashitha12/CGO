import axios from 'axios';
import resources_files from '../base_resources';
import router from '../../router';

const API_URL = resources_files.backend_url_external() + '/api/auth';

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
          sessionStorage.removeItem('entityId');
          sessionStorage.setItem('profile', "0");
          router.push("/account/rejected");
        } else {
          sessionStorage.setItem('profile', response.data.status);
          sessionStorage.setItem('UserName', response.data.nameWithInitials);
          sessionStorage.setItem('entityId', response.data.entityId);
          window.location.href = "/cgo/";
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  saveProfile(dataSet, file1, file2) {
    let formData = new FormData();
    let user = JSON.parse(sessionStorage.getItem('user'));

    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("firstName", dataSet.firstName);
    formData.append("lastName", dataSet.lastName);
    formData.append("nameWithInitials", dataSet.nameWithInitials);
    formData.append("address", dataSet.address);
    formData.append("city", dataSet.city);
    formData.append("contactNumberMobile", dataSet.contactNumberMobile);
    formData.append("contactNumberMobile2", dataSet.contactNumberMobile2);
    formData.append("entityId", dataSet.entityId);
    formData.append("status", 1);//should be assign in backend;[]
    formData.append("nicNumber", user.username);//should be get in local storage
    formData.append("email", user.email);//should be get in local storage
    formData.append("userId", user.userid);//should be get in local storage


    return axios
      .post(API_URL + '/user/profile/save', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        sessionStorage.setItem('profile', "1");
        sessionStorage.setItem('entityId', dataSet.entityId);
        this.profileCheck(user.userid);
        window.location.href = "/cgo/";
        return response.data;
      });
  }

  updateProfile(dataSet, file1, file2) {
    let formData = new FormData();
    let user = JSON.parse(sessionStorage.getItem('user'));

    formData.append("file1", file1);
    formData.append("file2", file2);
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
    formData.append("status", 1);//should be assign in backend;
    formData.append("nicNumber", user.username);//should be get in local storage
    formData.append("userId", dataSet.userId);


    return axios
      .post(API_URL + '/user/profile/save', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        sessionStorage.setItem('profile', "1");
        this.profileCheck(user.userid);
        window.location.href = "/cgo/";
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

}

export default new UserService();
