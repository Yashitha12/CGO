import axios from 'axios';
import resources_files from '../base_resources';
import user_services from './user.service';


const API_URL = resources_files.backend_url_internal() + '/api/auth/';
const API_URL_external = resources_files.backend_url_external() + '/api/auth/';


class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          sessionStorage.setItem('user', JSON.stringify(response.data));
          sessionStorage.setItem('userid', response.data.userid);
          sessionStorage.setItem('profile', "0");
          setTimeout( () => user_services.profileCheck(response.data.userid), 1000);
        }
        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('UserName');
    window.location.href = "/cgoInternal/";
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      asset: user.asset
    });
  }

  updatePermissionsExternal(user) {
    console.log(user);
    return axios.post(API_URL_external + 'signup/update/permissions', {
      username: user.username,
      email: user.email,
      password: "manage_by_backend_mapped",
      role: user.role,
      asset: user.asset
    });
  }

  updatePermissionsInternal(user) {
    console.log(user);
    return axios.post(API_URL + 'signup/update/permissions', {
      username: user.username,
      email: user.email,
      password: "manage_by_backend_mapped",
      role: user.role,
      asset: user.asset
    });
  }
}

export default new AuthService();
