<template>
    <div>
        <!-- menu principal -->
        <v-app-bar app class="red" dark>
        <v-toolbar-title class="headline text-uppercase">
            <span>FREE CHAT</span>
            <span class="font-weight-light">APP</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="registro">
        <v-icon>account_box</v-icon>
      </v-btn>
      <v-btn icon @click="login">
        <v-icon>supervised_user_circle</v-icon>
      </v-btn>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    methods:{
        login(){
            this.$router.push('/login')
        },
        registro(){
            this.$router.push('/registro')
        }
    }
}
</script>

