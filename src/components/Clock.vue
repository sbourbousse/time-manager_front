<template>
    <div class="title-container">
        <h1>Record your working times</h1>
    </div>
    <div id="clock-container">
        <div id="clock">
            <div class="circular">
                <div class="inner"></div>
                <div class="number">{{ this.timeString }}</div>
                <div class="circle">
                <div class="bar left">
                    <div v-bind:class="{progress: loopStarted}"></div>
                </div>
                <div class="bar right">
                    <div v-bind:class="{progress: loopStarted}"></div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div id="clock-actions">
        <button v-if="timerStoped" v-on:click="startTimer()" class="form-action-button">Start Working !</button>
        <button v-if="!timerStoped" v-on:click="stopTimer()" class="form-action-button">Stop</button>
        <button v-if="!timerStoped" v-on:click="stopTimer()" class="form-action-button">Send</button>
    </div>
</template>
<script>
import moment from "moment";

export default {
    name: "Clock",
    props : {
    
    },
    data : function () {
        return {
            time : 0,
            timerStart : 0,
            currentTime : 0,
            timerStartSave : 0,
            loopStarted : false,
            timerStoped : true,
            timerLoop : null,
            timeString : "00:00:00"
        }
    },
    created : function () {
        if(this.checkTimerRunning()) {
            let lastTimeStart = parseInt(localStorage.getItem("timerStartSave"))
            console.log(lastTimeStart)
            let lastTimeDuration = parseInt(localStorage.getItem("timerSave"))
            console.log(lastTimeDuration)

            let lastTimerEnd = lastTimeStart + lastTimeDuration
            console.log(lastTimerEnd)

            let diff = moment().unix() - lastTimerEnd;
            console.log(diff)


            this.currentTime = moment((lastTimerEnd + diff) * 1000) 
            console.log(this.currentTime)

            this.startTimer();

        } else {
            this.currentTime = moment();
            this.currentTime.set({hour:0,minute:0,second:0,millisecond:0})
        }
    },
    unmounted : function () {
        clearInterval(this.timerLoop)
        localStorage.setItem("timerSave", this.time / 1000)
        localStorage.setItem("timerStartSave", this.timerStart)

        console.log(this.currentTime)
    },
    methods : {
        startTimer : function () {
            this.timerStart = moment().unix();
            this.timerStoped = false;
            this.timerLoop = this.loopTimer();
        },
        stopTimer : function () {
            this.timerStoped = true;
            this.loopStarted = false
            this.time = 0;
            clearInterval(this.timerLoop)
            localStorage.removeItem("timerSave")
            localStorage.removeItem("timerStartSave")
        },
        loopTimer : function () {
            const intervalStampMs = 1000;
            this.loopStarted = false
            let counter = 0;
            this.loopStarted = true
            return setInterval(() => {
                if(counter >= intervalStampMs * 60 ){
                    clearInterval();
                    if(!this.timerStoped)
                        this.loopTimer
                    else {
                        clearInterval();
                    }
                }else{
                    this.time += intervalStampMs;
                    this.currentTime.add(intervalStampMs, 'ms')
                    this.refreshTimerValueString(this.currentTime)
                    console.log(this.currentTime.format("HH:mm:ss"))
                }
            }, intervalStampMs);
        },
        refreshTimerValueString : function (date) {
            if(!this.currentTime) {
                this.timeString = "00:00:00";
                return;
            }
            this.timeString = date.format("HH:mm:ss")
        },
        checkTimerRunning : function () {
            if(localStorage.getItem("timerStartSave")) return true;
            else return false;
        }
    }
}
</script>
<style scoped>
    #clock-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #clock {
        padding: 50px;
        margin: 50px 0px;
    }

    #clock-actions {
        display: flex;
        justify-content: space-around;
    }



    .circular{
    height:100px;
    width: 100px;
    position: relative;
    transform:scale(2);
    }
    .circular .inner{
    position: absolute;
    z-index: 6;
    top: 50%;
    left: 50%;
    height: 80px;
    width: 80px;
    margin: -40px 0 0 -40px;
    background: #464747 ;
    border-radius: 100%;
    
    }
    .circular .number{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index:10;
    font-size:18px;
    font-weight:500;
    color: rgb(231, 187, 65);;
    }
    .circular .bar{
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    -webkit-border-radius: 100%;
    clip: rect(0px, 100px, 100px, 50px);
    }
    .circle .bar .progress{
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-border-radius: 100%;
    clip: rect(0px, 50px, 100px, 0px);
    background: rgb(231, 187, 65);
    }
    .circle .left .progress{
    z-index:1;
    animation: left 3s alternate-reverse infinite both;
    }
    @keyframes left{
    100%{
        transform: rotate(180deg);
    }
    }
    .circle .right {
    transform: rotate(180deg);
    z-index:3;
    
    }
    .circle .right .progress{
    animation: right 3s alternate-reverse infinite both;
    }
    @keyframes right{
    100%{
        transform: rotate(180deg);
    }
}
    
</style>
