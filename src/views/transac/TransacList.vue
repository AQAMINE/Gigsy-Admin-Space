<template>
    <div>
      <base-card class="mt-3" :shadow="true" title=" Liste des transactions  ">
        <vue-good-table
          :columns="columns"
          :rows="rows"
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
              <span v-if="props.column.field == 'id'">
                <a href="{{props.row.id}}" class="btn btn-danger btn-sm rounded-0" >Delete</a>
              </span>
              <span v-else-if="props.column.field == 'status'">
                <span class="badge bg-success" v-if="props.row.status == 1">Complété</span>
                <span class="badge bg-danger" v-else>En attendant</span>
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
          label: 'Statut',
          field: 'status'
        },
        {
          label: 'Date',
          field: 'create_at'
        },
        {
          label: 'Mettre à jour',
          field: 'id'
        }
      ],
      services: [],
      rows: [
        { id: 1, create_at: '2011-10-31', referenceOrder: 0.03343, status: 1 },
        { id: 2, create_at: '2011-10-31', referenceOrder: 0.03343, status: 1 },
        { id: 3, create_at: '2011-10-30', referenceOrder: 0.03343, status: 0 },
        { id: 4, create_at: '2011-10-11', referenceOrder: 0.03343, status: 1 },
        { id: 5, create_at: '2011-10-21', referenceOrder: 0.03343, status: 0 },
        { id: 6, create_at: '2011-10-31', referenceOrder: 0.03343, status: 1 }
      ]
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
