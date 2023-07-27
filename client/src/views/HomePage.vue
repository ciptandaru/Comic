<script>
import { mapState, mapActions } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import {useProductStore} from "../stores/counter" 
 export default {
    name: "homePage",
    computed: {
        ...mapState(useProductStore, ['dataComic'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchComic', 'addFavorite', 'fetchDetailComic', 'donate']),
    },
    created() {
        this.fetchComic();
    }
 }
</script>
<template>
<div style="margin-top: 10px;" class="container">
    <div class="row">
        <div id="comicCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div v-for="(el, index) in dataComic" :key="el.id" :class="['carousel-item', { 'active': index === 0 }]">
                    <img :src="el.coverURL" class="d-block w-100" style="object-fit: cover; height: 500px;" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#comicCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#comicCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div class="row mt-3">
        <div class="card-group">
            <div v-for="el in dataComic" :key="el.id" class="col-md-4 mb-3">
                <div class="card mt-3 h-100">
                    <div class="row g-0">
                        <div class="col-md-12 text-center">
                            <img :src="el.coverURL" class="img-fluid rounded-top" style="object-fit: cover; height: 250px;" alt="...">
                        </div>
                        <div class="col-md-12">
                            <div class="card-body text-center">
                                <h5 class="card-title">{{el.title}}</h5>
                                <p class="card-text">{{el.synopsis}}</p>
                                <p class="card-text"><small class="text-body-secondary">{{el.genre}}</small></p>
                                <div class="d-flex justify-content-center">
                                    <button @click.prevent="addFavorite(el.id)" :id=el.id class="btn btn-sm btn-outline-primary">Favorite</button>
                                    <button @click.prevent="$router.push('/detail/'+el.slug)" class="btn btn-sm btn-secondary">Detail</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




</template>
<style>
    .card{
        margin-top: 10px;
    }
</style>