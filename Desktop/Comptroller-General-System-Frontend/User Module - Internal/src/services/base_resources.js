
class base_resources {

  backend_url_external() {
    //return "https://itmd.treasury.gov.lk/external"; // for Srpring Boot back-end
    return "http://192.168.231.50/external"; // for Srpring Boot testing server
    //return "http://127.0.0.1:8081";//development server backend
  }

  backend_url_internal() {
    //return "https://itmd.treasury.gov.lk/internal"; // for Srpring Boot back-end
    return "http://192.168.231.50/internal"; // for Srpring Boot testing server
    //return "http://127.0.0.1:8081";//development server backend
  }

  backend_url_system_management() {
    //return "https://itmd.treasury.gov.lk/management"; // for Srpring Boot back-end
    return "http://192.168.231.50/management"; // for Srpring Boot testing server
    //return "http://192.168.231.202:8081";//development server backend
  }

  backend_url_assert_1() {
    //return "https://itmd.treasury.gov.lk/vehicle-asset"; // for Srpring Boot back-end
    return "http://192.168.231.50/vehicle-asset"; // for Srpring Boot testing server
    //return "http://192.168.60.250:8081";//development server backend
  }

  backend_url_assert_2() {
    //return "https://itmd.treasury.gov.lk/land-asset"; // for Srpring Boot back-end
    return "http://192.168.231.50/land-asset"; // for Srpring Boot testing server
    //return "http://192.168.231.202:8081";//development server backend
  }

  backend_url_assert_3() {
    //return "https://itmd.treasury.gov.lk/building-asset"; // for Srpring Boot back-end
    return "http://192.168.231.50/building-asset"; // for Srpring Boot testing server
    //return "http://192.168.231.202:8081";//development server backend
  }

  backend_url_assert_4() {
    //return "https://itmd.treasury.gov.lk/structures-asset"; // for Srpring Boot back-end
    return "http://192.168.231.50/structures-asset"; // for Srpring Boot testing server
    //return "http://192.168.231.202:8081";//development server backend
  }

  backend_url_assert_5() {
    //return "https://itmd.treasury.gov.lk/machinaries-asset"; // for Srpring Boot back-end
    return "http://192.168.231.50/machinaries-asset"; // for Srpring Boot testing server
    //return "http://192.168.231.202:8081";//development server backend
  }

  backend_url_assert_6() {
    //return "https://itmd.treasury.gov.lk/furniture-asset"; // for Srpring Boot back-end
    return "http://192.168.231.50/furniture-asset"; // for Srpring Boot testing server
    //return "http://192.168.231.202:8081";//development server backend
  }

  backend_url_report_generation() {
    //return "https://itmd.treasury.gov.lk/cgo/report"; // for Srpring Boot back-end
    return "http://192.168.231.50/cgo/report"; // for Srpring Boot testing server
    //return "http://192.168.200.250:8081";//development server backend
  }

  loggedUserDetails() {
    return sessionStorage.getItem("userid");
    //this is use for collect user id from local storage when login to the system
  }

  profileStatusDetails() {
    return sessionStorage.getItem("profile");
    //this is use for collect profile status from local storage when login to the system
  }

  profileUserNameDetails() {
    return sessionStorage.getItem("UserName");
    //this is use for collect user name from local storage when login to the system
  }

}

export default new base_resources();
