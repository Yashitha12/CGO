import axios from 'axios';
import resources_files from '../base_resources';

const API_URL_POST = resources_files.backend_url_assert_1() + '/post/api/production/asset/vehicle/backend';


class vehicle_service {

  saveStatus(dataParam, status) {
    let user = sessionStorage.getItem('userid');
    let userDetails = sessionStorage.getItem('UserName');

    var category = "";

    if (status == 4) {
      category = "editFunctionEnabled";
    } else if (status == 5) {
      category = "editFunctionBlocked";
    }

    return axios
      .post(API_URL_POST + '/vehicle/save/status/' + dataParam + '/' + status + '/' + user + '/' + userDetails + '/CGO/' + category, {
      })
      .then(response => {
        return response.data;
      });
  }

  saveVehicleAvailability(dataSet, entityId) {
    let user = sessionStorage.getItem("userid");
    return axios
      .post(API_URL_POST + "/vehicle/save/common/availability/" + user, {
        availability: dataSet.availability,
        officerId: user,
        id: entityId,
      })
      .then((response) => {
        return response.data;
      });
  }

  saveDeleteRequest(dataSet) {
    let user = sessionStorage.getItem("userid");

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = day + '-' + month + '-' + year;

    return axios
      .post(API_URL_POST + "/vehicle/delete/" + user, {
        id_pk: dataSet.id_pk,
        reasonForDelete: dataSet.reasonForDelete,
        cgoRequestVerifiedOrNotVerifiedBy: user,
        cgoRequestVerifiedOrNotVerifiedDate: currentDate,
        cgoRemarks: dataSet.cgoRemarks,
        id: dataSet.id,
        institutionID: dataSet.institutionID,
        institutionName: dataSet.institutionName,
        officerId: dataSet.officerId,
        registeredNo: dataSet.registeredNo,
        status: dataSet.status
      })
      .then((response) => {
        return response.data;
      });
  }
  //end of Post Data
}

export default new vehicle_service();
