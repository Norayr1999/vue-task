<template>
  <div>
    <v-app>   
      <div>
        <v-tabs v-model="tab" show-arrows background-color="green" icons-and-text dark grow>
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.name" >
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation  v-on:submit.prevent="login()">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" color="green" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" color="green" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>                    
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn x-large block :disabled="!valid" color="success"  type="submit"> Login </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation  v-on:submit.prevent="signUp()">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="firstName" :rules="[firstNameRules.required, firstNameRules.min]" color="green" label="First Name" maxlength="20" required dense
                        hint="At least 2 characters"
                      ></v-text-field>
                    </v-col>
                
                    <v-col cols="6">
                      <v-menu
                        ref="menu"
                        v-model="menuStart"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        color="green"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            color="green"
                            v-model="dateStart"
                            label="Education Start Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateStart"
                          :active-picker.sync="activePickerStart"
                          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"                                                                                               
                          color="green"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        color="green"
                        ref="menu"
                        v-model="menuEnd"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            color="green"
                            v-model="dateEnd"
                            label="Education End Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          color="green"
                          v-model="dateEnd"
                          :active-picker.sync="activePickerEnd"
                          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"                                            
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="email" :rules="emailRules" color="green" label="E-mail" required dense></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" color="green" :rules="[rules.min,rules.required,rules.lowercase,rules.uppercase,rules.containsnumber]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters" counter @click:append="show1 = !show1" dense></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" color="green" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1" dense></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <label class="form__group form__group--no-label form__group--checkbox">
                        <input
                          class="form__input" type="checkbox" name="form-agreement"
                          v-model="agreement" 
                        >
                        <span class="form__label">I agree to the terms of service.</span>
                      </label>
                  
                    </v-col>
                    
                    <v-spacer></v-spacer>
                  
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">                                             
                      <v-btn
                        x-large block :disabled="!notValid" color="success"  type="submit"                                                                                               
                      >
                        Register
                      </v-btn>                                      
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>          
    </v-app>
      <v-snackbar v-model="snackbar.visible" bottom  :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" >
        <v-layout align-center pr-4>        
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
 
</template>

<script>

export default {
  name: 'Login',
   data: () => ({
    activePickerStart: null,
    activePickerEnd: null,
    dateStart: '',
    dateEnd:'',
    menuStart: false,       
    menuEnd:false,  
    checkbox: false,
    agreement:false,    
    tab: 0,
    tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
    ],
    valid: true,    
    firstName: "",    
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
   firstNameRules:{
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 2) || "Min 2 characters"
    },
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 6) || "Min 6 characters",
      uppercase:  value =>( value && /[A-Z]{1}/.test(value)) || 'At least one capital latter',
      lowercase:  value =>( value && /[a-z]{1}/.test(value)) || 'At least one lowercase latter',
      containsnumber: value => (value && /[0-9]{1}/.test(value) || 'At least one number latter')
    },
    snackbar: {
        color: null,
        icon: null,
        mode: null,
        position: "top",
        text: null,
        timeout: 7500,
        title: null,
        visible: false
      },    
  }),  
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
    notValid() {
      return this.agreement && this.valid
    }
  },
  methods: {
    SnackbarShow(type) {
      if (!type) return;
      switch (type) {
        case "error":
          this.snackbar = {
            color: "error",
            icon: "error",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: "Error",
            text: this.$store.getters.getErrorMsg,
            visible: true
          };
          break;       
        case "success":
          this.snackbar = {
            color: "success",
            icon: "check_circle",
            mode: "multi-line",
            position: "top",
            timeout: 1500,
            title: "Success",
            text: "Password correct, hoorah.",
            visible: true
          };
          break;       
      }
    },
     signUp(){        
      let url = `https://test-api.updivision.work/api/register`;
      let headers = {                
        "Content-Type": "application/json",        
       };
      let Params = {
        params: { 
          name:this.firstName,       
          email: this.email,
          password: this.password,
          password_confirmation:this.verify,
          education_start_date:this.dateStart,
          education_end_date:this.dateEnd,
          terms:'required'
      }
    };
    
      this.axios
        .post(url,headers,Params)
        .then((res) => {
          this.SnackbarShow('success')
          this.$store.commit("SetTokken",res.data.accessToken);
          localStorage.setItem('token', JSON.stringify(res.data.accessToken));
          setTimeout( () => this.$router.push({ path: '/products'}), 1500);
        })
        .catch((error) => {   
          this.$store.commit('SetErrorMsg', error.response.data.message)        
          this.SnackbarShow('error')          
        });
    },
    login(){          
      let url = `https://test-api.updivision.work/api/login`;
      let headers = {                
          "Content-Type": "application/json",       
      };
      let Params = {
        params: {        
          email: this.loginEmail,
          password: this.loginPassword
        }
      };
     this.axios
        .post(url,headers,Params)
        .then((res) => {              
          this.SnackbarShow('success')          
          this.$store.commit("SetTokken",res.data.accessToken);                   
          localStorage.setItem('token', JSON.stringify(res.data.accessToken));                        
          setTimeout( () => this.$router.push({ path: '/products'}), 1500);                   
        })
        .catch((error) => {    
          this.$store.commit('SetErrorMsg', error.response.data.message)                
          this.SnackbarShow('error')          
        });
    },
    validate() {
      if (this.$refs.loginForm.validate()) {     
      }
    },  
  },
}
</script>

<style lang="css">
 .form__input{
   margin-left:0px !important;
 }
</style>