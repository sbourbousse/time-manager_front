<template>
  <div id="dashboard-main">
    <div id="dashboard-navbar">
      <div class="navbar-link-container">
        <div class="navbar-link-item">
          <router-link to="/">Home</router-link>
        </div>
        <div class="navbar-link-item">
          <router-link to="/workingtimes">Working Times</router-link>
        </div>
        <div class="navbar-link-item">
          <router-link to="/">Clock Manager</router-link>
        </div>
        <div class="navbar-link-item">
          <router-link to="/">Chart Manager</router-link>
        </div>
      </div>
      <div class="navbar-right">
        Time Manager
      </div>
    </div>



    <div id="dashboard-container">
      <div class="dashboard-left">
        <User style="height: 350px"/>
      </div>
      <div class="dashboard-right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../components/User.vue'
export default {
  name: 'Dashboard',
  components: {
    User
  }
}
</script>
<style scoped>
  #dashboard-main {
    height: 100%;
    width: 100%;
  }
  #dashboard-navbar {
    display: flex;
    height: 80px;
    width: calc(100% - 100px);
    background: #44BBA4;
    padding: 0px 50px;
  }

  #dashboard-navbar .navbar-link-container {
    display: flex;
    width: 60%;
    height: 100%;
    /* justify-content: space-around; */
    align-items: center;
  }
  #dashboard-navbar .navbar-right {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 40%;
    font-weight: 600;
    color: white;
    font-size: 1.3em;
    user-select: none;
  }

  #dashboard-navbar .navbar-link-container .navbar-link-item {
    padding: 10px 20px;
    background: #393E41;
    margin: 0px 10px;
    border-radius: 15px;
    cursor: pointer;
  }

  #dashboard-navbar .navbar-link-container .navbar-link-item:hover {
    /* transform: opacity(1.2); */
    opacity: 0.8;
    transition-duration: 500ms;
    transition-property: opacity;
  }

  #dashboard-navbar .navbar-link-container .navbar-link-item a {
    color: #44BBA4  ;
    text-decoration: none;
    font-weight: 800;
  }

  #dashboard-container {
    width: calc(100% - 100px);
    margin: 30px 50px;
    display: flex;
    height: calc(100% - 80px) /* Navbars height */;
  }
  #dashboard-container>div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 100%;
  }
  #dashboard-container .dashboard-left {
    width : 30%
  }
  #dashboard-container .dashboard-right {
    width : 70%;
  }
</style>
