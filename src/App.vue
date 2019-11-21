<template>
  <v-app>
    <NavBarLogued v-if="authenticated"></NavBarLogued>
    <NavBarLogout v-if="!authenticated"></NavBarLogout>

    <v-content>
      <v-container :align-center="true">
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import HelloWorld from './components/HelloWorld';
import NavBarLogued from '@/components/NavBarLogued.vue'
import NavBarLogout from '@/components/NavBarLogout.vue'

export default {
  name: 'App',

  components: {
    NavBarLogued,NavBarLogout
  },

  data: () => ({
    //
    
  }),
  mounted() {
    this.socket.on('connect',()=>{
            console.log('conectado al servidor');
    })
  },
  computed: {
    ...mapState(['authenticated'])
  },
};
</script>
