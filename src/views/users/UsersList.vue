<template>
    <div>
        <!-- <delete-dialog title="avertissement" command="Supprimé" @deleteFromModal="deleteUser"><h5>Vous voulez vraiment supprimer cet utilisateur</h5></delete-dialog> -->
        <section>
            <base-card class="mt-3" :shadow="true" title=" List des utilisateurs">
            <warning-spinner v-if="isLoading"></warning-spinner>
            <vue-good-table v-else-if="haseUsers"
                :columns="columns"
                :rows="users"
                theme="nocturnal"
                :search-options="{
                  enabled: true
                }"/>
                <h4 class="text-secondary" v-else>Aucun utilisateur trouvé</h4>
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
          label: 'Id',
          field: 'id',
          type: 'number'
        },
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
        }
      ],
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
      this.isLoading = true
      await this.$store.dispatch('users/loadUsers')
      this.showRequestResult()
      this.isLoading = false
    },

    passUserId (id) {
      this.deleteId = id
    },
    async deleteUser () {
      this.isLoading = true
      await this.$store.dispatch('users/deleteUser', { id: this.deleteId })
      this.showRequestResult()
      this.isLoading = false
      this.deleteId = null
    }
  },
  computed: {

    users () {
      return this.$store.getters['users/users']
    },

    haseUsers () {
      return !this.isLoading && this.$store.getters['users/hasUsers']
    }
  }

}
</script>

<style scoped>
tr {
    width: 100%;
    display: inline-table;
    table-layout: fixed;
}
</style>
