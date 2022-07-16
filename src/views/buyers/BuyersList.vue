<template>
    <div>
        <section>
          <delete-dialog title="avertissement" command="Supprimé" @deleteFromModal="deleteUser"><h5>Vous voulez vraiment supprimer cet acheteur</h5></delete-dialog>
            <base-card :shadow="true"><router-link :to="{name: 'addAdmin'}" class="btn btn-success rounded-0 col-2 cust-add-butt">Ajouter Un acheteur <i class="fa fa-plus"></i></router-link></base-card>
            <base-card class="mt-3" :shadow="true" title="Liste des acheteurs ">

            <vue-good-table
                :columns="columns"
                :rows="buyers"
                styleClass="vgt-table striped bordered"
                :pagination-options="{
                  enabled: true,
                  nextLabel: 'Suivant',
                  prevLabel: 'Précédente',
                  rowsPerPageLabel: 'Lignes par page'
                }"
                :search-options="{
                  enabled: true
                }">
                  <template #table-row="props">
                    <span v-if="props.column.field == 'userable_id'">
                      <!-- <button class="btn btn-success btn-sm rounded-0 cust-btn" @click="editUser(props.row.userable_id)" >Edit <i class="fa fa-edit"></i></button> -->
                      <button class="btn btn-danger btn-sm rounded-0" data-bs-toggle="modal" data-bs-target="#showMessageModal" @click="passUserId(props.row.userable_id)">Delete <i class="fa fa-trash"></i></button>
                    </span>
                  </template>
                </vue-good-table>

            </base-card>
        </section>

    </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          label: 'Nom et prénom',
          field: 'fullname'
        },
        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'Créer à',
          field: 'created_at'
        },
        {
          label: 'Mettre à jour',
          field: 'userable_id'
        }
      ],
      buyers: [],
      isLoading: false,
      keyword: '',
      deleteId: null
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {

    showRequestResult () {
      if (this.$store.getters['users/errors']) {
        this.showAlert('error', this.$store.getters['users/errors'])
        this.$store.commit('users/setErrors', null)
      } else if (this.$store.getters['users/success']) {
        this.showAlert('success', this.$store.getters['users/success'])
        this.$store.commit('users/setSuccess', null)
      }
    },

    async loadUsers () {
      window.axios.get(this.$config.app_url + '/api/v1/buyers/list').then(response => {
        const responseData = response.data.data
        const buyers = []
        for (const key in responseData) {
          const userableBuyer = responseData[key].user
          buyers.push(userableBuyer)
        }
        this.buyers = buyers
      })
    },

    passUserId (id) {
      this.deleteId = id
    },
    async deleteUser () {
      console.log('delete user')
    },
    editUser (id) {
      const type = 'acheteurs'
      this.$router.replace({ name: 'userUpadte', params: { id: id, type: type } })
    }
  },
  computed: {
  }

}
</script>

<style scoped>
.cust-btn{
    margin-right: 3px !important;
}
.cust-add-butt{
  margin-left: 3px !important;
}
</style>
