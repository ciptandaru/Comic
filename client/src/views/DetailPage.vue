<script>
import { mapState, mapActions } from 'pinia'
import {useProductStore} from "../stores/counter" 

export default {
    name: "detail",
    computed: {
        ...mapState(useProductStore, ['dataDetail', 'totalPage'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchDetailComic']),
    },
    created() {
        this.fetchDetailComic(this.$route.params.slug);
    }
}
</script>

<template>
    <!-- <pre style="color: #EEE2DC;"> {{ dataDetail }}</pre> -->
    <div class="container">
        <div class="container">
                            <div style="background-color: #EEE2DC;">
                                <div class="card-body">
                                    <h5 style="text-align: center;" class="card-title">
                                    <strong>{{ dataDetail.data.fullTitle }}</strong>
                                    </h5>
                                    <h6 class="text-truncate"></h6>
                                    <h6 style="margin-top: 20px;" class="">Category: </h6>
                                    <h6 class="card-text">Price: </h6>
                                    <h6 class="card-text">
                                    
                                    </h6>
                                    <h6 class="card-text">
                                    
                                    </h6>
                                </div>
                            </div>
                            <section>
            <center>
                <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" :href="dataDetail.data.chapterNav.prevURL">Previous</a></li>
    <li class="page-item"><a class="page-link" :href="dataDetail.data.chapterNav.nextURL">Next</a></li>
  </ul>
</nav>
            </center>

        </section>
        </div>
        <img v-for="el in dataDetail.data.contentURL"
            :src="el" class="card-img-top rounded mx-auto d-block w-100" alt="...">
    </div>
        

</template>