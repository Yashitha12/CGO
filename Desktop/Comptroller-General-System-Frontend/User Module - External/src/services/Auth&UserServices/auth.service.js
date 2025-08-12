import axios from 'axios';
import resources_files from '../base_resources';
import user_services from '../Auth&UserServices/user.service';


const API_URL = resources_files.backend_url_external() + '/api/auth/';

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
          setTimeout( () => user_services.profileCheck(response.data.userid), 200);
        }
        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('entityId');
    sessionStorage.removeItem('entityDetails');
    window.location.href = "/cgo/";
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
