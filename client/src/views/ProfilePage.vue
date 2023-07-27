<script>
import {mapState, mapActions} from "pinia";
import {useProductStore} from "../stores/counter";

export default {
  name: "profile",
  computed: {
    ...mapState(useProductStore, ["dataLogin"]),
  },
  methods: {
    ...mapActions(useProductStore, ["fetchProfile"]),
  },
  created() {
    this.fetchProfile();
  },
};
</script>

<template>
  <!-- Profile -->
  <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
    <div class="card p-4">
      <div
        class="image d-flex flex-column justify-content-center align-items-center"
      >
        <button class="btn btn-secondary">
          <img :src="dataLogin.imgUrl" height="100" width="100" />
        </button>
        <span class="name mt-3">{{ dataLogin.name }}</span>
        <span class="idd">{{ dataLogin.username }}</span>
        <div
          class="d-flex flex-row justify-content-center align-items-center gap-2"
        >
          <span class="idd1">{{ dataLogin.email }}</span>
          <span><i class="fa fa-copy"></i></span>
        </div>
        <div
          class="d-flex flex-row justify-content-center align-items-center mt-3"
        >
          <span class="number"> <span class="follow"></span></span>
        </div>
        <div class="d-flex mt-2">
          <button
            @click.prevent="$router.push('/edit-profile')"
            class="btn1 btn-dark"
          >
            Edit Profile
          </button>
        </div>
        <div class="text mt-3">
          <span
            >{{ dataLogin.address }}.<br /><br />{{ dataLogin.phoneNumber }}
          </span>
        </div>
        <div class="px-2 rounded mt-4 date">
          <span class="join">Comic,2021</span>
        </div>
      </div>
    </div>
  </div>
  <pre>{{ dataLogin }}</pre>
</template>
<style>
.card {
  width: 350px;
  background-color: #efefef;
  border: none;
  cursor: pointer;
  transition: all 0.5s;
}

.image img {
  transition: all 0.5s;
}

.card:hover .image img {
  transform: scale(1.5);
}

.btn {
  border-radius: 50%;
}

.name {
  font-size: 22px;
  font-weight: bold;
}

.idd {
  font-size: 14px;
  font-weight: 600;
}

.idd1 {
  font-size: 12px;
}

.number {
  font-size: 22px;
  font-weight: bold;
}

.follow {
  font-size: 12px;
  font-weight: 500;
  color: #444444;
}

.btn1 {
  height: 40px;
  width: 150px;
  border: none;
  background-color: #000;
  color: #aeaeae;
  font-size: 15px;
}

.text span {
  font-size: 13px;
  color: #545454;
  font-weight: 500;
}

.icons i {
  font-size: 19px;
}

hr .new1 {
  border: 1px solid;
}

.join {
  font-size: 14px;
  color: #a0a0a0;
  font-weight: bold;
}

.date {
  background-color: #ccc;
}
/* Profile End */
</style>
