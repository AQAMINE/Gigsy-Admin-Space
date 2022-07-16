<template>
  <div class="container">

        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
          <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </symbol>
          <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </symbol>
          <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>

          <div class="row">
              <div class="col-12">
                  <div class="card">

                      <div class="card-body">
                          <div class="card-title mb-4">
                            <!-- Strat Profile Picture -->
                            <div class="text-center profile-pic">
                              <img src="https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg" class="rounded" alt="...">
                              <h5>Amine Aqebli</h5>
                            </div>
                          </div>

                          <div v-if="showsAlert" class="alert alert-success d-flex align-items-center rounded-0" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                            <div>
                              Informations mises à jour avec succès
                            </div>
                          </div>

                          <div class="row">
                              <div class="col-12">
                                  <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                      <li class="nav-item">
                                          <a class="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Basic Info</a>
                                      </li>
                                  </ul>
                                  <div class="tab-content ml-1" id="myTabContent">
                                    <form @submit.prevent="saveChange">
                                      <div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">

                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Prénom</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  <input type="text" class="form-control-plaintext" v-model="formDataa.first_name" >
                                              </div>
                                          </div>
                                          <hr />

                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Nom</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  <input type="text" class="form-control-plaintext" v-model="formDataa.last_name" >
                                              </div>
                                          </div>
                                          <hr />

                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Email</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  <input type="email" class="form-control-plaintext" v-model="formDataa.email" >
                                              </div>
                                          </div>
                                          <hr />
                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Inscrivez-vous à</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  {{formDataa.created_at}}
                                              </div>
                                          </div>
                                          <hr />
                                          <button class="btn btn-success rounded-0">Enregistrer</button>

                                      </div>
                                    </form>
                                  </div>
                              </div>
                          </div>

                      </div>

                  </div>
              </div>
          </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      formDataa: {
        first_name: '',
        last_name: '',
        email: '',
        created_at: ''
      },
      showsAlert: false
    }
  },
  created () {
    this.loadUser()
  },
  computed: {
  },
  methods: {
    loadUser () {
      const user = this.$store.getters.user
      const convertedUser = { ...user }
      this.formDataa = convertedUser
    },
    saveChange () {
      console.log('hello from function save')
      const consvertedUser = { ...this.$store.getters.user }
      const userId = consvertedUser.userable_id
      window.axios.put(this.$config.app_url + '/api/v1/admins/' + userId, this.formDataa).then(response => {
        console.log(response)
        this.showAlert('success', 'Informations mises à jour avec succès')
      }).catch(errors => this.showAlert('error', errors.message))
    }
  }
}
</script>
<style scoped>
body{
    padding-top: 68px;
    padding-bottom: 50px;
}
        .image-container {
            position: relative;
        }

        .image {
            opacity: 1;
            display: block;
            width: 100%;
            height: auto;
            transition: .5s ease;
            backface-visibility: hidden;
        }

        .middle {
            transition: .5s ease;
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            text-align: center;
        }

        .image-container:hover .image {
            opacity: 0.3;
        }

        .image-container:hover .middle {
            opacity: 1;
        }
        .profile-pic{
              border-bottom: 3px solid #ff5a28
        }
        .profile-pic img{
          height: 200px;
          width: 200px;
          border-radius: 49% !important;
          box-shadow: 1px 1px 5px #000000ab;
          border: 2px solid #ff5a28;

        }
        .profile-pic h6{
          margin-top: 10px !important;
        }
</style>
