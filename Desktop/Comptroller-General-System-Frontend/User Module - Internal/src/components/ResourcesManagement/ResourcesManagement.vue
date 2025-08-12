
<template>
  <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
              <img src="../../assets/img/list.png">
            </div>
          </div>
        </div>

        <div class="text-container">
          <div class="row">
            <router-link to="/resources/management/manage/district/ds/gn" class="btn btn-success btn-md">
              <font-awesome-icon icon="fa-user-circle-o" />
              Manage District / DS / GN
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
              <img src="../../assets/img/list.png">
            </div>
          </div>
        </div>

        <div class="text-container">
          <div class="row">
            <router-link to="/entity/management/customization" class="btn btn-success btn-md">
              <font-awesome-icon icon="fa-user-circle-o" />
              Manage Entities Lineup
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
              <img src="../../assets/img/list.png">
            </div>
          </div>
        </div>

        <div class="text-container">
          <div class="row">
            <router-link to="/" class="btn btn-success btn-md">
              <font-awesome-icon icon="fa-user-circle-o" />
              xxxxxxxxxxxx
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
              <img src="../../assets/img/list.png">
            </div>
          </div>
        </div>

        <div class="text-container">
          <div class="row">
            <router-link to="/" class="btn btn-success btn-md">
              <font-awesome-icon icon="fa-user-circle-o" />
              xxxxxxxxxxxx
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <br />
        <br />
        <router-view name="helper"></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped>
.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: auto;
}

.img-container {
  height: 230px;
  width: 200px;
  overflow: hidden;
  border-radius: 0px 0px 20px 20px;
  display: inline-block;
}

.img-container img {
  transform: skew(0deg, -13deg);
  height: 250px;
  margin: -35px 0px 0px -70px;
}

.inner-skew {
  display: inline-block;
  border-radius: 20px;
  overflow: hidden;
  padding: 0px;
  transform: skew(0deg, 13deg);
  font-size: 0px;
  margin: 30px 0px 0px 0px;
  background: white;
  height: 250px;
  width: 200px;
}

.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 120px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin: -120px 0px 0px 0px;
  line-height: 19px;
  font-size: 14px;
}

.text-container h3 {
  margin: 20px 0px 10px 0px;
  font-size: 28px;
}
</style>




<script>
export default {
  name: "completeProfile",
  data() {
    return {
      items: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    //this method run when component load to the floating area
  },
  methods: {

  },
};
</script>

