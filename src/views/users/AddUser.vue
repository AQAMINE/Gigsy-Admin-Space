<template>
  <section>
    <base-card :shadow="true"><router-link :to="{name: 'users'}" class="btn btn-success rounded-0 col-2 cust-add-butt">List des Utilisateurs <i class="fa fa-plus"></i></router-link></base-card>
    <base-card class="mt-3" :shadow="true" title="Ajouter Un Utilisateur">
      <form @submit.prevent="addUser" class="add-form">
          <div class="row mb-3">
            <label for="fisrtname" class="col-sm-4 col-form-label">Le nom</label>
            <div class="col-sm-10">
                <input type="text" class="form-control rounded-0" id="fisrtname" v-model="formData.first_name">
            </div>
          </div>

          <div class="row mb-3">
            <label for="lastname" class="col-sm-4 col-form-label">Prénom</label>
            <div class="col-sm-10">
                <input type="text" class="form-control rounded-0" id="lastname" v-model="formData.last_name">
            </div>
          </div>

          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control rounded-0" id="inputEmail3" v-model="formData.email">
            </div>
          </div>

          <div class="row mb-3">
            <label for="password" class="col-sm-4 col-form-label">Le mot de passe</label>
            <div class="col-sm-10">
                <input type="password" class="form-control rounded-0" id="password" v-model="formData.password">
            </div>
          </div>
          <div class="row mb-3">
            <label for="passwordConfirm" class="col-sm-4 col-form-label">Confirmez le mot de passe</label>
            <div class="col-sm-10">
                <input type="password" class="form-control rounded-0" id="passwordConfirm" v-model="formData.password_confirmation">
            </div>
          </div>
          <div class="mt-3">
            <button class="btn btn-cust-template rounded-0">Ajouter <i class="fa fa-plus"></i></button>
          </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async addUser () {
      await window.axios.post(this.$config.app_url + '/api/v1/admin/register', {
        email: this.formData.email,
        first_name: this.formData.first_name,
        last_name: this.formData.last_name,
        password: this.formData.password,
        password_confirmation: this.formData.password_confirmation
      }).then(response => {
        this.showAlert('success', response.data.message)
        this.$router.replace({ name: 'users' })
      }).catch(errors => console.log(errors))
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
