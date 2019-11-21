<template>
    <div>
        
        <div style="overflow-y: auto; height:600px; ">
            <span v-for="mensaje in mensajes" :key="mensaje._id">
                <div class="message sent" v-if="mensaje.de_id == usuario._id">
                  {{mensaje.mensaje}}
                  <span class="metadata">
                      <span class="time">{{mensaje.fecha}}
                  </span>
                  </span>
                </div>

                <div class="message received" v-if="mensaje.para_id == usuario._id">
                  {{mensaje.mensaje}}
                  <span class="metadata">
                      <span class="time">{{mensaje.fecha}}
                  </span>
                  </span>
                </div>
            </span>
        </div>
        <!-- <v-row>
            <v-col class="col-9" scrollable max-heigth="300">
                
            </v-col>
            <v-col class="col-3">
                <v-card
                    
                >
                    <v-list dense>
                    <v-list-item-group color="primary">
                        <v-list-item
                        v-for="amigo in amigos"
                        :key="amigo._id"
                        @click="seleccionarAmigo(amigo)">
                        
                        <v-list-item-content>
                            <v-list-item-title v-text="amigo.email"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row> -->
        
        <v-footer absolute >
            <v-row>
                <v-col cols="9">
                    <v-text-field label="Solo" placeholder="Mensaje..." solo v-model="mensaje.mensaje" @keydown.enter="enviarMensaje"></v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn color="#43A047" dark @click="enviarMensaje"><v-icon>send</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-footer>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    data:()=>({
        mensaje:{
            mensaje:'',
            de_id:'',
            para_id:''
        },
        mensajes:[],
        amigo_seleccionado:null
    }),
    mounted(){
        this.mensaje.de_id = this.usuario._id
        //const socket = io('http://localhost:3000');

        this.socket.on('nuevo_mensaje',(mensaje)=>{
            console.log('nuevo_mensaje_recibido',mensaje)
            if(mensaje.de_id == this.amigo_seleccionado._id){
                this.mensajes.push(mensaje)
            }else{
                console.log('no entra');
            }
        })

        Event.$on('cargarMensajes',(amigo)=>{
            console.log('amigo recibido',amigo);
            this.amigo_seleccionado = amigo
            this.mensaje.para_id = this.amigo_seleccionado._id
            this.cargarMensajes()
        })

        // this.cargarAmigos()
        

    },
    methods:{
        async enviarMensaje(){
            console.log('user',this.usuario);
            let url = `${this.base_url}/enviar_mensaje`
            if(this.mensaje.mensaje != ''){
                axios.post(url,this.mensaje,this.headers).then((response)=>{
                    this.limpiarMensaje()
                    this.mensajes.push(response.data.mensaje)
                    this.socket.emit('enviar_mensaje',response.data.mensaje)
                }).catch((error)=>{
                    console.log('error',error);
                })
            }    
        },
        async cargarMensajes(){
            this.mensajes = []
            let url = `${this.base_url}/mensajes/usuario/${this.usuario._id}/amigo/${this.amigo_seleccionado._id}`
            axios.get(url,this.headers).then((response)=>{
                console.log('mensajes',response.data.mensajes);
                this.mensajes = response.data.mensajes
            }).catch((error)=>{
                console.log('error',error);
            })
        },

        limpiarMensaje(){
            this.mensaje.mensaje = ''
        }
    },
    computed: {
        // amigos(){
        //     let amigos = []
        //     this.amistades.forEach(amistad => {
        //         if(amistad.usuario_1._id != this.usuario._id){
        //             amigos.push(amistad.usuario_1)
        //         }else{
        //             amigos.push(amistad.usuario_2)
        //         }
        //     });
        //     return amigos
        // },

        ...mapState(['usuario','headers'])
    },
}
</script>
<style scoped>
.message {
    color: #000;
    clear: both;
    line-height: 18px;
    font-size: 15px;
    padding: 8px;
    position: relative;
    margin: 8px 0;
    max-width: 85%;
    word-wrap: break-word;
    z-index: 0;
}

.message.sent {
    background: #e1ffc7;
    border-radius: 5px 0px 5px 5px;
    float: right;
}
.message.sent:after {
  border-width: 0px 0 10px 10px;
  border-color: transparent transparent transparent #e1ffc7;
  top: 0;
  right: -10px;
}

.message.received {
  background: #fff;
  border-radius: 0px 5px 5px 5px;
  float: left;
}

.message.received .metadata {
  padding: 0 0 0 16px;
}

.message.received:after {
  border-width: 0px 10px 10px 0;
  border-color: transparent #fff transparent transparent;
  top: 0;
  left: -10px;
}

.message:first-child {
    margin: 16px 0 8px;
}

.metadata {
  display: inline-block;
  float: right;
  padding: 0 0 0 7px;
  position: relative;
  bottom: -4px;
}

.metadata .time {
  color: rgba(0, 0, 0, .45);
  font-size: 11px;
  display: inline-block;
}

</style>