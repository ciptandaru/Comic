<script>
    import {mapActions} from "pinia"
    import {useProductStore} from "../stores/counter" 
    import { RouterLink, RouterView } from 'vue-router'
    export default {
        name: "donate",
        data() {
            return {
                input: {
                    amount: 0
                },
            };
        },
        methods: {
            ...mapActions(useProductStore, ["donate"]),
            handleSubmit() {
                this.donate(this.input);
            },
        },
    }
</script>

<template>
            <div class="login-container text-c animated flipInX">
            <div>
                <h1 class="logo-badge text-whitesmoke"><span class="fa fa-user-circle"></span></h1>
            </div>
            <h3 class="text-whitesmoke">Seikhlasnya bang!</h3>
            <p class="text-whitesmoke"></p>
            <div class="container-content">
                <form @submit.prevent="handleSubmit(input)" class="margin-t">
                    <div class="form-group">
                        <input v-model="input.amount" type="number" class="form-control" placeholder="Amount" required="">
                    </div>
                    <button type="submit" class="form-button button-l margin-b">Thank you!</button>
                    <button @click.prevent="$router.push('/')"  type="submit" class="form-button button-l margin-b">cancel</button>
                </form>
            </div>
        </div>
</template>