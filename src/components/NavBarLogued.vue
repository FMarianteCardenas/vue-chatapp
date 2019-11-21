<template>
    <div>
        <!-- menu principal -->
        <v-app-bar app class="warning">
        <v-toolbar-title class="headline text-uppercase">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <span>FREE CHAT</span>
            <span class="font-weight-light">APP</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn class="ma-2" color="red" dark @click="removeSession">Salir</v-btn> -->
        </v-app-bar>
        <!-- <TopMenu></TopMenu> -->

        <!-- barra lateral -->
        <v-navigation-drawer app v-model="drawer">

        <v-layout mt-4 align-center column>
            <v-flex>
            <v-avatar>
                <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="">
            </v-avatar>
            </v-flex>
            <v-flex>
            <p class="headline">{{this.usuario.nombre}}</p>
            </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-list dense>

        <v-list-item
          v-for="amigo in amigos"
          :key="amigo._id"
          link
          @click="seleccionarAmigo(amigo)"
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content>
            <v-list-item-title>{{ amigo.nombre }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
        <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" dark @click="removeSession">Salir</v-btn>
        </div>
      </template>
        </v-navigation-drawer>
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import axios from 'axios'
export default {
    data: () => ({
        amistades:[],
        drawer:false,
        items:[
            {title:'Dashboard',icon:'dashboard',route:'dashboard'},
            {title:'Productos',icon:'store',route:'products'},
            {title:'Caja',icon:'attach_money',route:'sales'}
        ]
    }),
    mounted() {
      this.cargarAmigos()
    },
    methods:{
        ...mapMutations(['removeSession']),

        navigate(route){
            this.$router.push({name:route})
        },
        seleccionarAmigo(amigo){
          Event.$emit('cargarMensajes',amigo)
        },
        async cargarAmigos(){
            let url = `${this.base_url}/usuarios/${this.usuario._id}/amigos`
            axios.get(url,this.headers).then((response)=>{
                console.log('amigos',response.data.amistades);
                this.amistades = response.data.amistades
            }).catch((error)=>{
                console.log('error',error);
            })
        },
    },
    computed:{
        amigos(){
            let amigos = []
            this.amistades.forEach(amistad => {
                if(amistad.usuario_1._id != this.usuario._id){
                    amigos.push(amistad.usuario_1)
                }else{
                    amigos.push(amistad.usuario_2)
                }
            });
            return amigos
        },
        ...mapState(['usuario'])
    },
    components:{
    }
}
</script>
