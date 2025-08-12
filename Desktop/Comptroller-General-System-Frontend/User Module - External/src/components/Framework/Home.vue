<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="a-box2 align-self-center">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../../assets/img/MOF_Cover.jpg">
              </div>
            </div>
          </div>
          <div class="text-container2">
            <h3>Office of Comptroller General <br> Sri Lanka</h3>
            <div><br></div>
            <div class="desc">
              A globally recognized apex body for Public Sector Non-Financial Assets management.<br /><br /><br></div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="a-box2 align-self-center">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../../assets/img/Independence-Square_nfams.jpg">
              </div>
            </div>
          </div>
          <div class="text-container2">
            <h3>Purview</h3><br>
            <div class="desc" style="text-align: justify;">Foster effective and efficient utilization and management of
              Public Sector
              Non-Financial Assets recorded in an updated comprehensive central database, adhering to the Government
              policies,
              while strengthening the development framework of the Government and securing the collection of due revenue
              from disposal of these assets.
            </div><br>
          </div>
        </div>
      </div>

      <hr />
      <a class="btn btn-link" href="https://systems.treasury.gov.lk/nfams/resources/Asset_Management_Circular-Eng.pdf">
        Asset Management Circular No. 06/2023
      </a>
    </div>
  </div>
</template>


<style scoped>
.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.5);
  display: flex;
  flex-direction: row;
  border-radius: 25px;
  position: relative;
  text-align: center;
  width: auto;
  height: 85%;

}

.card h2 {
  margin: 0;
  padding: 0 1rem;
}

.card .title {
  padding: 1rem;
  text-align: right;
  color: green;
  font-weight: bold;
  font-size: 12px;
}

.card .desc {
  padding: 0.5rem 1rem;
  font-size: 13px;
  text-align: justify;
}

.img-avatar {
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  border: 6px solid white;
  background-image: linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);
  top: 15px;
  left: 85px;
}

.card-text {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.title-total {
  padding: 2.5em 1.5em 1.5em 1.5em;
  width: auto;
}

.portada {
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-image: url(../../assets/img/swat.png);
  background-position: bottom center;
  background-size: cover;
}

.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: 60%;
}


.a-box2 {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
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

.text-container2 {
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

.text-container2 h3 {
  margin: 20px 0px 10px 0px;
  font-size: 22px;
  font-weight: 600;
}
</style>



<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {

  },
};
</script>

