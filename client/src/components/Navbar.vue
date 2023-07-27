<script>
    import { mapState, mapActions } from 'pinia'
    import {useProductStore} from '../stores/counter' 
    import { RouterLink, RouterView } from 'vue-router'
    export default {
        name: 'navbar',
        computed: {
            ...mapState(useProductStore, ['loginStatus'])
        },
        methods: {
            ...mapActions(useProductStore, ['handleLogout']),
        },
    }
</script>

<template>
        <!-- navbar -->
        <div class="container-fluid px-0">
        <nav class="navbar navbar-expand-sm navbar-dark bg-black py-0 px-0">
            <a class="navbar-brand" href="#"><img id="logo"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0TrXJJvNn_Vo8j-5EAewEtQDwwZ5bv2epfa6CrmWYZHpM0tiff5mxTBMGBkKflN-uJ4U&usqp=CAU">
                &nbsp;&nbsp;&nbsp;Comic</a>
            <span class="v-line"></span>
            <button class="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a @click.prevent="$router.push('/')" class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a @click.prevent="$router.push('/favorite')" class="nav-link" href="#">My Favourite</a>
                    </li>
                    <li class="nav-item">
                        <a @click.prevent="$router.push('/profile')" class="nav-link" href="#">Profile</a>
                    </li>
                    <li class="nav-item">
                        <a v-if="loginStatus === true" @click.prevent="$router.push('/donate')" class="nav-link" href="#">Donate</a>
                    </li>
                    <li class="nav-item">
                        <a v-if="loginStatus === false" @click.prevent="$router.push('/login')" class="nav-link" href="#">Login</a>
                    </li>
                    <li id="logout" class="nav-item">
                        <a v-if="loginStatus === true" class="nav-link" href="#" @click.prevent="handleLogout()">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style>
.bg-black {
    background-color: #000;
}

#logo {
    width: 30px;
    height: 30px;
    border-radius: 4px;
}

.navbar-brand {
    padding: 14px 20px;
    font-size: 16px;
}

.navbar-nav {
    width: 100%;
}

.nav-item {
    padding: 6px 14px;
    text-align: center;
}

.nav-link {
    padding-bottom: 10px; 
}

.v-line {
    background-color: rgb(255, 255, 255);
    width: 1px;
    height: 20px;
}

.navbar-collapse.collapse.in {
    display: block !important;
}

@media (max-width: 576px) {
    .nav-item {
        width: 100%;
        text-align: left;
    }

    .v-line {
        display: none;
    }
}
</style>