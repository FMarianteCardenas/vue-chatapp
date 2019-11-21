<template>
    <div>
         <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                v-model="registro.nombre"
                :counter="10"
                :rules="nameRules"
                label="Nombre"
                required
                ></v-text-field>

                <v-text-field
                v-model="registro.email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="registro.password1"
                label="Password"
                type = "password"
                required
                ></v-text-field>

                <v-text-field
                v-model="registro.password2"
                label="Confirme Password"
                type = "password"
                required
                ></v-text-field>

                

                

                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                >
                Registrarme
                </v-btn>

                <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Limpiar
                </v-btn>
            </v-form>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
  export default {
    data: () => ({
      valid: true,
      registro:{
          nombre:'',
          email:'',
          password1:'',
          password2:''
      },
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 10) || 'El nombre debe tener al menos 10 caracteres',
      ],
      emailRules: [
        v => !!v || 'El email es requerido',
        v => /.+@.+\..+/.test(v) || 'Ingrese un email válido',
      ],
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          //this.snackbar = true
          let url = `${this.base_url}/registro`
          let body = {
              nombre:this.registro.nombre,
              email:this.registro.email,
              password:this.registro.password1
          }
          axios.post(url,body).then((response)=>{
              console.log('respuesta',response);
          }).catch((error)=>{
              console.log('error',error);
          })
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    computed:{
        ...mapState([])
    }
  }
</script>