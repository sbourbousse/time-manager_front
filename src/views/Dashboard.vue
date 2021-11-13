<template>
  <div id="dashboard-main">
    <div id="dashboard-navbar">
      <div class="navbar-link-container">
        <div class="navbar-link-item">
          <router-link class="link-item-text" to="/">Home</router-link>
          <router-link to="/"><fa class="link-item-icon" icon="home"/></router-link>
        </div>
        <div class="navbar-link-item">
          <router-link class="link-item-text" to="/workingtimes">Working Times</router-link>
          <router-link to="/workingtimes"><fa class="link-item-icon" icon="user-clock"/></router-link> 
        </div>
        <div class="navbar-link-item">
          <router-link class="link-item-text" to="/clock">Clock Manager</router-link>
          <router-link to="/clock"><fa class="link-item-icon" icon="stopwatch"/></router-link>
        </div>
        <div class="navbar-link-item">
          <router-link class="link-item-text" to="/">Chart Manager</router-link>
          <router-link to="/"><fa class="link-item-icon" icon="chart-pie"/></router-link>
        </div>
      </div>
      <div class="navbar-right">
        Time Manager
      </div>
    </div>
    <div id="dashboard-container">
      <div class="dashboard-left">
        <User/>
      </div>
      <div class="dashboard-right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../components/User.vue'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
    height: 2.2em;
    display: flex;
    align-items: center ;
    text-align: center;
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
    display: flex;
  }
  #dashboard-container>div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 100%;
  }
    
  .navbar-link-container .link-item-icon {
    color:#44BBA4
  }





  @media screen and (max-width: 640px) {
    #dashboard-main {
      padding-bottom: 80px;
    }
    #dashboard-container {
      flex-direction: column;
      width: calc(100% - 50px);
      margin: 30px 25px;
      height: auto;
      padding-bottom: 80px;
    }
    #dashboard-container .dashboard-left {
      min-width : 100%;
    }
    #dashboard-container .dashboard-right {
      min-width : 100%;
      text-align: center;
    }
    #dashboard-navbar {
      position: fixed;
      bottom: -1px;
      overflow-y: scroll;
      z-index: 11;
    }
    #dashboard-navbar .navbar-link-container {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
    }
    .navbar-link-container .link-item-text {
      display: none;
    }
    .navbar-link-container .link-item-icon {
      display: unset;
    }
    #dashboard-navbar .navbar-right {
      display: none;
    }
  }

  @media screen and (min-width: 640px) {
    #dashboard-container {
      width: calc(100% - 100px);
      margin: 30px 50px;
      height: calc(100% - 80px) /* Navbars height */;
    }
    #dashboard-container .dashboard-left {
      width : 600px;
    }
    #dashboard-container .dashboard-right {
      width: calc(100% - 600px);
      padding-left: 4em;
      min-width: 500px;
    }
    .navbar-link-container .link-item-text {
      display: unset;
    }
    .navbar-link-container .link-item-icon {
      display: none;
    }
  }
</style>
