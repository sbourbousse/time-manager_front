<template>
    <div class="card-template">
        <div class="card-header title">
            User Management
        </div>
        <div class="card-body form-container">
            <div v-if="connected" class="form-row">
                <label for="">ID : </label>
                <input v-model="id" type="text">
            </div>
            <div v-if="connected" class="form-row">
                <label for="">Email : </label>
                <input v-model="email" type="text">
            </div>
            <div v-if="connected" class="form-row">
                <label for="">Firstname : </label>
                <input v-model="firstname" type="text">
            </div>
            <div v-if="connected" class="form-row">
                <label for="">Lastname : </label>
                <input v-model="lastname" type="text">
            </div>
            <div class="form-row">
                <label for="">Username : </label>
                <input v-model="username" type="text">
            </div>
            <div v-if="!connected" class="form-row">
                <label for="">Password : </label>
                <input v-model="password" type="password">
            </div>

            <div class="form-row form-row-wrap">
                <button class="form-action-button" v-on:click="createUser()">Create</button>
                <button class="form-action-button" v-on:click="updateUser()">Update</button>
                <button class="form-action-button" v-on:click="getInfos()">Get Infos</button>
                <button class="form-action-button" v-on:click="deleteUser()">Delete</button>
                <button class="form-action-button" v-if="!connected" v-on:click="connect()" style="background:#E7BB41">Connect</button>
                <button class="form-action-button" v-if="connected" v-on:click="disconnect()" style="background:#E7BB41">Disconnect</button>
                <button class="form-action-button" v-if="connected" v-on:click="fillSelfInfos()">My infos</button>
                <button class="form-action-button" v-if="connected" v-on:click="clearFields()">Clear</button>
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
        firstname : "",
        lastname : "",
        id : "",
        password : "",
        connected : false,
        connectedUsername: ""
    }
  },
  updated() {
      console.log("update")
  },
  mounted() {
      this.autoConnect();
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
            return;
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
    getInfos : async function () {
        if (this.id == "") {
            alert("ID must not be blank")
            return;
        }
        let jwt = localStorage.getItem("jwt")
        const requestOptions = {
            method: "GET",
            headers: { "security": jwt },
        };
        const response = await fetch(`http://localhost:4000/api/users/${this.id}`, requestOptions);
        const data = await response.json();
        this.username = data.data.username;
        this.firstname = data.data.firstname;
        this.lastname = data.data.lastname;
        this.email = data.data.mail;
        return data.data;
    },
    async deleteUser() {
        if (this.id == "") {
            alert("ID must not be blank")
            return;
        }
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch("http://localhost:4000/api/users/"+this.id, requestOptions);
        if(response.status == 204) {
            alert("User deleted successfuly")
        } else if (response.status == 404) {
            alert("User not found")
        } else {
            alert("An error occured")
        }
    },  
    checkUsernameAndEmail() {
        if(this.email == "" || this.username == "") return "Username and email must not be blank";
        else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(this.email) == null) return "Incorrect email format";
        else return null;
    },
    checkUsernameAndPassword() {
        if(this.username == "" || this.password == "") return "Username or password must not be blank";
        else return null;
    },
    async connect() {
        if (this.checkUsernameAndPassword() != null) {
            alert(this.checkUsernameAndPassword());
            return;
        } 
            
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username :  this.username,
                password : this.password
                })
        };
        const response = await fetch("http://localhost:4000/api/users/sign_in", requestOptions);
        const data = await response.json();
        if(response.status == 404) {
            alert("Bad Username or Password")
        } else if ( response.status == 200) {
            await this.setConnected(data.token)
        } else {
            alert("An error occured")
        }
    },
    disconnect: function () {
        this.setDisconnected();
        this.connected = false;
        this.$router.go("/login")
    },
    checkConnected : function () {
        let jwt = localStorage.getItem("jwt");
        if (jwt) {
            return true;
        } else {
            return false;
        }
    },
    autoConnect: async function () {

        if(this.checkConnected()) {
            this.id = this.getIdFromJwt()
            await this.getInfos();
            this.setConnected();
        }
    },
    setConnected : async function (jwt = null) {
        if (jwt) {
            localStorage.setItem("jwt", jwt)
            let payLoad = this.parseJwt(jwt)
            this.id = payLoad.userID
        }
        let user = await this.getInfos();
        this.connected = true;
        this.connectedUsername = user.username
        localStorage.setItem("user", JSON.stringify(user))
    },
    setDisconnected : function () {
        this.connected = false;
        this.connectedUsername = "";
        localStorage.removeItem("jwt")
        localStorage.removeItem("user")
    },
    getIdFromJwt : function () {
        let jwt = localStorage.getItem("jwt")
        let infos = this.parseJwt(jwt)
        return infos.userID
    },
    parseJwt : function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
    fillSelfInfos : function() {
        let user = JSON.parse(localStorage.getItem("user"))
        this.username = user.username;
        this.email = user.mail;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.id = user.id;
    },
    clearFields : function() {
        this.username = "";
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.id = "";
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
    margin: 0.5em 0px;
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
