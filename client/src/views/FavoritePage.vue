<script>
import { mapState, mapActions } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import {useProductStore} from "../stores/counter" 
 export default {
    name: "myheroesPage",
    computed: {
        ...mapState(useProductStore, ['dataFavorite'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchFavorite']),
    },
    created() {
        this.fetchFavorite();
    }
 }
</script>
<template>
    <div class="container">
    <div class="row">
        <div class="card-group">
            <div v-for="el in dataFavorite" :key="el.id" class="col-md-4 mb-3">
                <div class="card mt-3 h-100">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img :src="el.Comic.coverURL" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{el.Comic.title}}</h5>
                                <p class="card-text">{{el.Comic.synopsis}}</p>
                                <p class="card-text"><small class="text-body-secondary">{{el.Comic.genre}}</small></p>
                                <button @click.prevent="$router.push('/detail/'+el.Comic.slug)" class="btn btn-sm btn-secondary">Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>