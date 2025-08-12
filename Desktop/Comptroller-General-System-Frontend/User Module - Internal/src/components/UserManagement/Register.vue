<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" src="../../assets/img/create.png" class="profile-img-card" />
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgoInternal/"'
              class="btn-sm btn-link">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Register Staff User</li>
        </ol>
      </nav>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label for="email">Email</label>
              <Field name="email" type="email" class="form-control" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
          </div>


          <div class="form-group row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label for="username">NIC Number</label>
              <Field name="username" type="text" class="form-control" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label for="password">Password</label>
              <Field name="password" type="password" class="form-control" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <label for="role">Access Role</label>
                <Field name="role" class="form-control" as="select" multiple size="8">
                  <option value="" disabled>Select</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USERS_MANAGEMENT_INTERNAL_OFFICER">USERS MANAGEMENT INTERNAL OFFICER</option>
                  <option value="USERS_MANAGEMENT_EXTERNAL_OFFICER">USERS MANAGEMENT EXTERNAL OFFICER</option>
                  <option value="USERS_VIEWER_EXTERNAL_OFFICER">USERS VIEWER EXTERNAL OFFICER</option>
                  <option value="TRANSFER_ACCEPTANCE_OFFICER">TRANSFER ACCEPTANCE OFFICER</option>
                  <option value="TRANSFER_APPROVAL_OFFICER">TRANSFER APPROVAL OFFICER</option>
                  <option value="EDIT_APPROVAL_OFFICER">EDIT APPROVAL OFFICER</option>
                  <option value="REPORTS_GENERATOR">REPORTS GENERATOR</option>
                  <option value="CGO_VIEWER">CGO VIEWER</option>
                  <option value="AUDIT_OFFICER">AUDIT OFFICER</option>
                </Field>
                <ErrorMessage name="role" class="error-feedback" />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <label for="asset">Access Unit</label>
                <Field name="asset" class="form-control" as="select" multiple size="8">
                  <option value="" disabled>Select</option>
                  <option value="ASSET_LAND">LAND</option>
                  <option value="ASSET_BUILDING">BUILDING</option>
                  <option value="ASSET_VEHICLE">VEHICLE</option>
                  <option value="ASSET_STRUCTURES">STRUCTURES</option>
                  <option value="ASSET_OFFICE_FURNITURE">OFFICE FURNITURE</option>
                  <option value="ASSET_MACHINERIES">MACHINERIES</option>
                </Field>
                <ErrorMessage name="asset" class="error-feedback" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Register
            </button>
          </div>
        </div>
      </Form>


      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("This is required!")
        .min(10, "Must be at least 10 characters!")
        .max(12, "Must be maximum 12 characters!")
        .matches(/^$|^[0-9]{9}[0-9VXvx]+$/, "Please provide NIC Number in proper format.")
        .typeError("Please Input Valid Data."),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .typeError("Please Input Valid Data."),
      password: yup
        .string()
        .required("Password is required!")
        .max(30, "Must be maximum 30 characters!")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
        .typeError("Please Input Valid Data."),
      role: yup
        .array()
        .required("Role is required!"),
      asset: yup
        .array()
        .required("Asset is required!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    handleRegister(user) {


      this.$swal.fire(
        {
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, I confirm this!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            //** **//
            this.message = "";
            this.successful = false;
            this.loading = true;

            this.$store.dispatch("auth/register", user).then(
              (data) => {
                this.message = data.message;
                this.successful = true;
                this.loading = false;
              },
              (error) => {
                this.message =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.successful = false;
                this.loading = false;
              }
            );
            //** **//
          }
        }
        );
    },
  },
};



</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 650px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
