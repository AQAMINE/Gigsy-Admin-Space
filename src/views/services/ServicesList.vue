<template>
    <div>
      <base-card class="mt-3" :shadow="true" title=" List des utilisateurs">
        <vue-good-table
          :columns="columns"
          :rows="services"
            :search-options="{
            enabled: true
          }"
          :pagination-options="{
            enabled: true,
            nextLabel: 'Suivant',
            prevLabel: 'Précédente',
            rowsPerPageLabel: 'Lignes par page'
          }">
            <template #table-row="props">
              <span v-if="props.column.field == 'image'">
              <img class="serviceImg" :src="props.row.image" alt="">
              </span>
              <span v-else-if="props.column.field == 'id'">
                <a href="{{props.row.id}}" class="btn btn-success btn-sm rounded-0 cust-btn" >Edit </a>
                <a href="{{props.row.id}}" class="btn btn-danger btn-sm rounded-0" >Delete </a>
              </span>
            </template>
          </vue-good-table>
      </base-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          label: 'Titre',
          field: 'name'
        },
        {
          label: 'Description',
          field: 'description'
        },
        {
          label: 'Image',
          field: 'image'
        },
        {
          label: 'Évaluation',
          field: 'rating'
        },
        {
          label: 'Vendeur',
          field: 'seller'
        },
        {
          label: 'Mettre à jour',
          field: 'id'
        }
      ],
      services: []
    }
  },
  created () {
    this.loadServices()
  },
  methods: {
    async loadServices () {
      await window.axios.get(this.$config.app_url + '/api/v1/services/list').then(response => {
        this.services = response.data.data
      }).catch(errors => this.showAlert('error', errors.message))
    }
  }
}
</script>
<style scoped>
.serviceImg{
  height: 100;
  width: 120px;
}
.cust-btn{
  margin-right: 3px !important;
}
</style>
