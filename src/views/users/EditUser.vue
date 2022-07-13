<template>
  <section>
    <base-card :shadow="true"><router-link :to="{name: 'users'}" class="btn btn-success rounded-0 col-2 cust-add-butt">List des Utilisateurs <i class="fa fa-plus"></i></router-link></base-card>
    <base-card class="mt-3" :shadow="true" title="Mettre à jour l'utilisateur">
      <warning-spinner v-if="isLoading"></warning-spinner>
      <form v-else @submit.prevent="updaateUser"  class="add-form">
          <div class="row mb-3">
            <label for="fisrtname" class="col-sm-4 col-form-label">Le nom</label>
            <div class="col-sm-10">
                <input type="text" class="form-control rounded-0" id="fisrtname" v-model="firstName">
            </div>
          </div>

          <div class="row mb-3">
            <label for="lastname" class="col-sm-4 col-form-label">Prénom</label>
            <div class="col-sm-10">
                <input type="text" class="form-control rounded-0" id="lastname" v-model="lastName">
            </div>
          </div>

          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control rounded-0" id="inputEmail3" v-model="email">
            </div>
          </div>

          <div class="mt-3">
            <button class="btn btn-cust-template rounded-0">Modifer <i class="fa fa-plus"></i></button>
          </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      isLoading: false
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const userId = this.$route.params.id
      this.isLoading = true
      await window.axios.get(this.$config.app_url + '/api/v1/admins/' + userId).then(response => {
        const user = response.data.data.user
        this.firstName = user.first_name
        this.lastName = user.fullname
        this.email = user.email
      }).catch(errors => this.showAlert('error', errors.message))
      this.isLoading = false
    },
    async updaateUser () {
      console.log('llo')
      const userId = this.$route.params.id
      await window.axios.put(this.$config.app_url + 'api/v1/admins/' + userId, {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName
      }).then(
        response => {
          console.log(response)
          this.showAlert('success', 'Edited')
        }
      ).catch(errors => this.showAlert('error', errors))
    }
  }
}
</script>

<style scoped>
.cust-add-butt{
  margin-left: 3px !important;
}
.add-form{
  margin: 10px auto;
  max-width: 500px;
}
.add-form input{
  border: 1px solid #ff5927;
}
</style>
