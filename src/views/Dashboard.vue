<template>
  <div id="dashboard-container">
    <User style="width: 33%; height: 300px;"/>
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
  #dashboard-container {
    width: calc(100% - 100px);
    margin: 30px 50px;
  }
</style>
