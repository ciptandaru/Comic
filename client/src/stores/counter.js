import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from "sweetalert2";
import axios from 'axios'
import firebaseConfig from "../firebaseConfig";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
firebaseConfig;
const providerGithub = new GithubAuthProvider();
const auth = getAuth();
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://iproject.ciptadr.site'


export const useProductStore = defineStore('product', {
  state: () => ({
    dataFavorite: [],
    dataComic: [],
    dataComicDetail: [],
    loginStatus: localStorage.getItem("access_token") ? true : false,
    totalPage: 0,
    dataLogin: [],
    dataDetail: [],
  }),
  actions: {
    async handleRegister(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/register`, input, {
          'Content-Type': 'multipart/form-data'
        });
        Swal.fire({
          width: 200,
          icon: "success",
          text: "Register success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.push('/login')
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
        console.log(err);
      }
    },
    async handleLogin(login) {
      try {
        const { data } = await axios.post(`${baseUrl}/login`, login);
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("id", data.id);
        this.loginStatus = true;
        this.dataLogin = data
        console.log(data);
        this.router.push('/')
        Swal.fire({
          width: 200,
          icon: "success",
          text: "login success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleGoogleLogin(res) {
      try {
        const { data } = await axios.post(`${baseUrl}/glogin`, null, {
          headers: {
            token_google: res.credential,
          },
        });
        console.log(data);
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("id", data.id);
        this.loginStatus = true;
        this.router.push('/')
        Swal.fire({
          width: 200,
          icon: "success",
          text: "login success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.res.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleGitHub() {
      try {
        const result = await signInWithPopup(auth, providerGithub);
        const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // Get additional user information from the result
        const user = result.user;
        const email = user.email;
        const displayName = user.displayName;

        // Send the user data to the server
        const {response} = await axios.post(`${baseUrl}/github-login`, {
          email,
          displayName,
        });
        

        // console.log(response.data,'mencari token ');
        localStorage.setItem("access_token", response.token);
        this.token = localStorage.getItem("access_token");
        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    async handleLogout() {
      localStorage.clear();
      this.loginStatus = false;
      this.router.push('/login')
      Swal.fire({
        width: 200,
        icon: "success",
        text: "logout success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async fetchProfile() {
      try {
        const { data } = await axios.get(`${baseUrl}/profile`,{
          headers: {
            access_token: localStorage.getItem("access_token"),
          }, 
        });
        console.log(data);
        this.dataLogin = data
      } catch (err) {
        console.log(err);
        this.router.push('/login')
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async editProfile() {
      try {
        const { data } = await axios.put(`${baseUrl}/profile`);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async donate(input) {
      try {
        //axios kebelakang
        const much = this;
        const response = await axios.post(`${baseUrl}/donate`, input, {
          headers:{
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(response.data);
        window.snap.pay(response.data.token, {
          onSuccess: async function (result) { 
            // You may add your own implementation here 
            // alert("payment success!");
            Swal.fire({
              width: 200,
              icon: "success",
              text: "payment success",
              showConfirmButton: false,
              timer: 1500,
            });
            const response = await axios.get(
             ` ${baseUrl}/`,{
                headers: {
                  access_token: localStorage.getItem("access_token"),
                },
              }
            );
            // Swal.fire("Payment Success (201)");
            much.router.push("/"); 
          },
          onPending: function (result) { 
            // You may add your own implementation here 
            Swal.fire({
              icon: "error",
              title: `Error`,
              text: `????????????????`,
            });
  
            // console.log(result);
          },
          onError: function (result) {
            // You may add your own implementation here 
            Swal.fire({
              icon: "error",
              title: `Error`,
              text: `payment failed`,
            });
          },
          onClose: function () {
            // You may add your own implementation here 
            Swal.fire({
              icon: "error",
              title: `Error`,
              text: `payment failed`,
            });
          },
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error`,
          text: `payment failed`,
        });
      }
    },
    async fetchComic() {
      try {
        const { data } = await axios.get(`${baseUrl}/`);
        console.log(data);
        this.dataComic = data
      } catch (err) {
        console.log(err);
        this.router.push('/login')
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async fetchDetailComic(slug) {
      try {
        const { data } = await axios.get(`${baseUrl}/detail/${slug}`);
        this.dataDetail = data
        this.totalPage = data.totalPages
        // console.log(data.totalPages);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async addFavorite (id, input) {
      try {
        const { data } = await axios.post(`${baseUrl}/favorite/${id}` ,input ,{
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        }) ;
        Swal.fire({
          width: 200,
          icon: "success",
          text: "Added success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.push('/')
        console.log(data);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}, Please Login First`,
        });
        this.router.push('/login')
      }
    },
    async fetchFavorite () {
      try {
        const { data } = await axios.get(`${baseUrl}/favorite` ,{
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        }) ;
        this.dataFavorite = data;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
  }
})
