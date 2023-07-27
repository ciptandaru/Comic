<script>
    import {mapActions} from "pinia"
    import {useProductStore} from "../stores/counter" 
    import { GoogleLogin } from 'vue3-google-login';
    import { RouterLink, RouterView } from 'vue-router'
    export default {
        name: "loginPage",
        data() {
            return {
                input: {
                    email: "",
                    password: ""
                },
            };
        },
        methods: {
            ...mapActions(useProductStore, ["handleLogin", "handleGoogleLogin", 'handleGitHub']),
            handleSubmit() {
                this.handleLogin(this.input);
            },
            callback(res) {
                this.handleGoogleLogin(res);
            },
        },
    }
</script>

<template>
        <div class="login-container text-c animated flipInX">
            <div>
                <h1 class="logo-badge text-whitesmoke"><span class="fa fa-user-circle"></span></h1>
            </div>
            <h3 class="text-whitesmoke">A Comic Book a Day Keeps Boredom Away!</h3>
            <p class="text-whitesmoke">Sign In</p>
            <div class="container-content">
                <form @submit.prevent="handleSubmit(input)" class="margin-t">
                    <div class="form-group">
                        <input v-model="input.email" type="text" class="form-control" placeholder="Email" required="">
                    </div>
                    <div class="form-group">
                        <input v-model="input.password" type="password" class="form-control" placeholder="*****" required="">
                    </div>
                    <button type="submit" class="form-button button-l margin-b">Sign In</button>
                </form>
                <GoogleLogin :callback="callback"/>
                <a @click.prevent="handleGitHub" class="text-darkyellow" href="#">GitHub</a>
                    <p class="text-whitesmoke text-center"><small>Do not have an account?</small></p>
                    <a @click.prevent="$router.push('/register')" class="text-darkyellow" href="#"><small>Sign Up</small></a>
                <p class="margin-t text-whitesmoke"><small> Comic &copy; 2023</small> </p>
            </div>
        </div>
</template>

<style>
.text-c {
    text-align: center;
}
.text-l {
    text-align: left;
}
.text-r {
    text-align: right
}
.text-j {
    text-align: justify;
}

.text-whitesmoke {
    color: whitesmoke
}
.text-darkyellow {
    color: rgb(114, 122, 223)
}


.line-b {
    border-bottom: 1px solid  rgb(255, 255, 255);
}

.button {
    border-radius: 3px;
}
.form-button {
    background-color: rgba(250, 240, 255, 0.24);
    border-color: rgb(167, 59, 255);
    color: #e6e6e6;
}
.form-button:hover,
.form-button:focus,
.form-button:active,
.form-button.active,
.form-button:active:focus,
.form-button:active:hover,
.form-button.active:hover,
.form-button.active:focus {
    background-color: rgb(167, 59, 255);
    border-color: rgb(167, 59, 255);
    color: #e6e6e6;
}
.button-l {
    width: 100% !important;
}


.margin-g {
    margin: 15px;
}
.margin-g-sm {
    margin: 10px;
}
.margin-g-md {
    margin: 20px;
}
.margin-g-lg {
    margin: 30px;
}

.margin-l {
    margin-left: 15px;
}
.margin-l-sm {
    margin-left: 10px;
}
.margin-l-md {
    margin-left: 20px;
}
.margin-l-lg {
    margin-left: 30px;
}

.margin-r {
    margin-right: 15px;
}
.margin-r-sm {
    margin-right: 10px;
}
.margin-r-md {
    margin-right: 20px;
}
.margin-r-lg {
    margin-right: 30px;
}

.margin-t {
    margin-top: 15px;
}
.margin-t-sm {
    margin-top: 10px;
}
.margin-t-md {
    margin-top: 20px;
}
.margin-t-lg {
    margin-top: 30px;
}

.margin-b {
    margin-bottom: 15px;
}
.margin-b-sm {
    margin-bottom: 10px;
}
.margin-b-md {
    margin-bottom: 20px;
}
.margin-b-lg {
    margin-bottom: 30px;
}

.form-control,
.border-line {
    background-color: #ffffff8c;
    background-image: none;
    border: 1px solid #424242;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
}
.form-control:focus,
.border-line:focus {
    border-color: #c200fdf3;
    background-color: #fdfdfd;
    color: #292929;
}
.form-control,
.form-control:focus {
    box-shadow: none;
}
.form-control::-webkit-input-placeholder { color: #000000; }


.container-content {
    background-color: #3a3a3aa2;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #cf30ff;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0;
}

.login-container {
    max-width: 400px;
    z-index: 100;
    margin: 0 auto;
    padding-top: 100px;
}
.login.login-container {
    width: 300px;
}
.wrapper.login-container {
    margin-top: 140px;
}

</style>