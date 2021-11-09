<template>
    <div id="working-times-container">
        <WorkingTime 
        class="single-working-time" v-for="(workingTime, index) in workingTimes" 
        v-bind:key="index" v-bind:id="workingTime.id"
        v-bind:start="workingTime.start" v-bind:end="workingTime.end"/>
    </div>
</template>
<script>
import WorkingTime from './WorkingTime.vue'
export default {
    name: "WorkingTimes",
    components: {
        WorkingTime
    },
    data : function () {
        return {
            workingTimes : []
        }
    },
    mounted : async function () {
        this.workingTimes = await this.getWorkingTimes()
        console.log(this.workingTimes)
    },
    methods : {
        getWorkingTimes : async function () {
            const response = await fetch(`http://localhost:4000/api/workingtimes/user/${this.getConnectedUser()}?start=1970-01-01 00:00:00&end=2040-12-31 23:59:59`);
            const data = await response.json();
            return data.data;
        },
        getConnectedUser : function () {
            let userId = localStorage.getItem("userId");
            return userId;
        }
    }
}
</script>
<style>
    #working-times-container {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    #working-times-container .single-working-time {
        height: 200px;
        margin: 20px;
    }

    @media screen and (min-width: 640px) {
        #working-times-container {
        margin-left: 50px;
        }
        #working-times-container .single-working-time {
            width: 200px; 
        }
    }
    @media screen and (max-width: 640px) {
        #working-times-container .single-working-time {
            width: calc(50% - 40px); 
        }
    }
</style>
