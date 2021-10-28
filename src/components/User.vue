<template>
    <div class="card-template">
        <div class="card-header title">
            User Management
        </div>
        <div class="card-body form-container">
            <div class="form-row">
                <label for="">ID : </label>
                <input v-model="id" type="text">
            </div>
            <div class="form-row">
                <label for="">Username : </label>
                <input v-model="username" type="text">
            </div>
            <div class="form-row">
                <label for="">Email : </label>
                <input v-model="email" type="text">
            </div>
            <div class="form-row form-row-wrap">
                <button class="form-action-button" v-on:click="createUser()">Create</button>
                <button class="form-action-button" v-on:click="updateUser()">Update</button>
                <button class="form-action-button">Get Infos</button>
                <button class="form-action-button">Delete</button>
                <button class="form-action-button" v-on:click="connect()" style="background:#E7BB41">Connect</button>
            </div>
            <div class="form-row" v-if="connected">
                <p>Connected as {{connectedUsername}}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'User',
  components: {

  },
  data() {
    return {
        username : "",
        email : "",
        id : "",
        connected : false,
        connectedUsername: ""
    }
  },
  updated() {
      console.log("update")
  },
  mounted() {
  },
  props: {
    // today: Date
  },
  methods: {
    createUser : async function () {
        if (this.checkUsernameAndEmail() != null) {
            alert(this.checkUsernameAndEmail());
            return;
        } 
            
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user : { 
                username :  this.username,
                email : this.email
            }})
        };
        const response = await fetch("http://localhost:4000/api/users", requestOptions);
        const data = await response.json();
        if(data.errors) {
            alert("An error occured")
        } else if (data.data) {
            this.id = data.data.id
        }
    },
    updateUser : async function () {
        if (this.checkUsernameAndEmail() != null) {
            alert(this.checkUsernameAndEmail());
            return;
        } else if (this.id == "") {
            alert("ID must not be blank")
        }
            
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user : { 
                username :  this.username,
                email : this.email
            }})
        };
        const response = await fetch("http://localhost:4000/api/users/"+this.id, requestOptions);
        const data = await response.json();
        if(data.errors) {
            alert("An error occured")
        } else if (data.data) {
            alert("Successful update")
        }
    },
    checkUsernameAndEmail() {
        if(this.email == "" || this.username == "") return "Username and email must not be blank";
        else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(this.email) == null) return "Incorrect email format";
        else return null;
    },
    async connect() {
        if (this.id != "") { //Connect by ID
            const response = await fetch("http://localhost:4000/api/users/"+this.id);            
            const data = await response.json();
            if(response.status == 404) {
                alert("Wrong user ID")
            } else if (response.status == 200) {
                this.setConnected(data.data)
            }
        } else if (this.id == "" && this.checkUsernameAndEmail() == null) { //Connect by Username and email
            const response = await fetch(`http://localhost:4000/api/users?username=${this.username}&email=${this.email}`);            
            const data = await response.json();
            if(response.status == 404) {
                alert("Wrong user email or username")
            } else if (response.status == 200) {
                this.setConnected(data.data)
            }
        } else {
            if (this.id == "") {
                alert(this.checkUsernameAndEmail());
                return;
            } else if (this.checkUsernameAndEmail() != null) {
                alert("ID must not be blank")
            }
        }
    },
    setConnected : function (data) {
        this.connected = true;
        this.connectedUsername = data.username
        localStorage.setItem("userId", data.id)
    }
  }
}
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.form-container .form-row {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-around;
}
.form-row.form-row-wrap {
    flex-wrap: wrap;
}
.form-container .form-row label {
    width: 30%;
}

.form-container .form-row input {
    margin-left: 10px;
    width: calc(70% - 10px);
    height: 25px;
}

</style>
