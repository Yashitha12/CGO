class base_resources {

  backend_url_external() {
    // Use proxy in development, full URL in production
    return import.meta.env.DEV ? '/external' : 'http://192.168.231.50/external';
  }

  backend_url_internal() {
    // Use proxy in development, full URL in production
    return import.meta.env.DEV ? '/internal' : 'http://192.168.231.50/internal';
  }

  backend_url_system_management() {
    // Use proxy in development, full URL in production
    return import.meta.env.DEV ? '/management' : 'http://192.168.231.62/management';
  }

  backend_url_assert_1() {
    // Use proxy in development, full URL in production
    return import.meta.env.DEV ? '/management' : 'http://192.168.231.62/management';
  }

  backend_url_report_generation() {
    // Use proxy in development, full URL in production
    return import.meta.env.DEV ? '/reports' : 'http://192.168.231.62/reports';
  }

  profileStatusDetails() {
    return sessionStorage.getItem('profile') || '0';
  }

  profileUserNameDetails() {
    return sessionStorage.getItem('username') || '';
  }

  loggedUserDetails() {
    return sessionStorage.getItem('userid') || '';
  }

}

export default new base_resources();
