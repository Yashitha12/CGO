import axios from "axios";
import resources_files from "./../base_resources";

const API_URL_POST =
  resources_files.backend_url_assert_1() +
  "/post/api/production/asset/vehicle/backend";
//const API_URL_GET = resources_files.backend_url_assert_1() + '/get/api/production/asset/vehicle/backend';

class vehicle_service {
  saveVehicle(dataSet) {
    let user = sessionStorage.getItem("userid");
    return axios
      .post(API_URL_POST + "/vehicle/save/" + user, {
        ownerEntity: dataSet.entity,
        officerId: user,
        rmv_registered: dataSet.rmv_registered,
        registerNumber: dataSet.registerNumber,
        assetCode: dataSet.assetCode,
        vehicleType: dataSet.vehicleType,
        model: dataSet.model,
        yearManufacture: dataSet.yearManufacture,
        yearRegistered: dataSet.yearRegistered,
        vehicleColor: dataSet.vehicleColor,
        cargoArea: dataSet.cargoArea,
        cargoSpaceArea: dataSet.cargoSpaceArea,
        make: dataSet.make,
        engineCapacity: dataSet.engineCapacity,
        engineNo: dataSet.engineNo,
        chassisNumber: dataSet.chassisNumber,
        typeOfFuel: dataSet.typeOfFuel,
        transmission: dataSet.transmission,
        noOfDoors: dataSet.noOfDoors,
        priceOfPurchased: dataSet.priceOfPurchased,
        transportCapacity: dataSet.transportCapacity,
        vehicleOwnership: dataSet.vehicleOwnership,
        ownedInstitute: dataSet.InstituteName,
        lessorRenterName: dataSet.LessorRenterName,
        closedInstituteName: dataSet.closedInstituteName,
        rentLeaseDate: dataSet.rentLeaseDate,
        rentedForMonths: dataSet.RentedForMonths,
        rentedForMonthlyPayment: dataSet.RentedForMonthlyPayment,
        currentCondition: dataSet.currentCondition,
        purpose: dataSet.purpose,
        crCondition: dataSet.crCondition,
        remarks: dataSet.remarks,
        status: dataSet.status,
        mainStatus: dataSet.status,
      })
      .then((response) => {
        return response.data;
      });
  }

  saveStatus(dataParam, status) {
    let user = sessionStorage.getItem("userid");
    let userDetails = sessionStorage.getItem("UserName");
    let category = null;
     if (status == 1) {
      category = "updateVerify";
    } else if (status == 2) {
      category = "updateReject";
    } else if (status == 3) {
      category = "waitingForApproval";
    } else if (status == 4) {
      category = "editFunctionEnabled";
    } else if (status == 5) {
      category = "editFunctionBlocked";
    }

    return axios
      .post(
        API_URL_POST +
          "/vehicle/save/status/" +
          dataParam +
          "/" +
          status +
          "/" +
          user +
          "/" +
          userDetails +
          "/EXTERNAL/" +
          category,
        {}
      )
      .then((response) => {
        return response.data;
      });
  }

  updateVehicle(dataSet) {
    let user = sessionStorage.getItem("userid");

    return axios
      .post(API_URL_POST + "/vehicle/update/" + user, {
        id: dataSet.id,
        officerId: dataSet.user,
        ownerEntity: dataSet.entity,
        rmv_registered: dataSet.rmv_registered,
        registerNumber: dataSet.registerNumber,
        assetCode: dataSet.assetCode,
        vehicleType: dataSet.vehicleType,
        model: dataSet.model,
        yearManufacture: dataSet.yearManufacture,
        yearRegistered: dataSet.yearRegistered,
        vehicleColor: dataSet.vehicleColor,
        cargoArea: dataSet.cargoArea,
        make: dataSet.make,
        engineCapacity: dataSet.engineCapacity,
        engineNo: dataSet.engineNo,
        chassisNumber: dataSet.chassisNumber,
        typeOfFuel: dataSet.typeOfFuel,
        transmission: dataSet.transmission,
        noOfDoors: dataSet.noOfDoors,
        priceOfPurchased: dataSet.priceOfPurchased,
        cargoSpaceArea: dataSet.cargoSpaceArea,
        transportCapacity: dataSet.transportCapacity,
        vehicleOwnership: dataSet.vehicleOwnership,
        ownedInstitute: dataSet.InstituteName,
        lessorRenterName: dataSet.LessorRenterName,
        closedInstituteName: dataSet.closedInstituteName,
        rentLeaseDate: dataSet.rentLeaseDate,
        rentedForMonths: dataSet.RentedForMonths,
        rentedForMonthlyPayment: dataSet.RentedForMonthlyPayment,
        currentCondition: dataSet.currentCondition,
        purpose: dataSet.purpose,
        crCondition: dataSet.crCondition,
        remarks: dataSet.remarks,
        status: dataSet.status,
        mainStatus: dataSet.status,
      })
      .then((response) => {
        return response.data;
      });
  }

  saveVehicleAvailability(dataSet) {
    let user = sessionStorage.getItem("userid");
    let entityId = sessionStorage.getItem("entityId");
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

  saveGivenVehicles(dataSet) {
    let user = sessionStorage.getItem("userid");
    let entityId = sessionStorage.getItem("entityId");
    return axios
      .post(API_URL_POST + "/vehicle/save/common/remarks/" + user, {
        registrationNumber: dataSet.regNo,
        remarks: dataSet.remark,
        officerId: user,
        status: 1,
        id: entityId,
      })
      .then((response) => {
        return response.data;
      });
  }

  updateGivenVehicles(id_pk, regNo, remarks, id) {
    let user = sessionStorage.getItem("userid");

    return axios
      .post(API_URL_POST + "/vehicle/save/common/remarks/" + user, {
        id_pk: id_pk,
        registrationNumber: regNo,
        remarks: remarks,
        officerId: user,
        status: 0,
        id: id,
      })
      .then((response) => {
        return response.data;
      });
  }

  saveDeleteRequest(dataSet) {
    let user = sessionStorage.getItem("userid");
    let entityId = sessionStorage.getItem("entityId");
    let entityDetails = sessionStorage.getItem("entityDetails");
    return axios
      .post(API_URL_POST + "/vehicle/delete/" + user, {
        reasonForDelete: dataSet.reason_for_delete,
        cgoRequestVerifiedOrNotVerifiedBy: "0",
        cgoRequestVerifiedOrNotVerifiedDate: "0",
        cgoRemarks: "0",
        id: dataSet.id,
        institutionID: entityId,
        institutionName: entityDetails,
        officerId: user,
        registeredNo: dataSet.regNo,
        status: "0",
      })
      .then((response) => {
        return response.data;
      });
  }
  //end of Post Data
}

export default new vehicle_service();
