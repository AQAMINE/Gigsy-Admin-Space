<template>
    <div>
      <base-card class="mt-3" :shadow="true" title="Liste des commandes ">
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
              <span v-if="props.column.field == 'image'">
              <img class="serviceImg" :src="props.row.image" alt="">
              </span>
              <span v-else-if="props.column.field == 'id'">
                <a class="btn btn-danger btn-sm rounded-0" href="{{props.row.id}}" >Delete </a>
              </span>
              <span v-else-if="props.column.field == 'status'">
                <span class="badge bg-success" v-if="props.row.status == 1">Complété</span>
                <span class="badge bg-warning" v-else>En attendant</span>
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
          label: 'Reference',
          field: 'reference'
        },
        {
          label: 'Amount',
          field: 'amount'
        },
        {
          label: 'date de fin',
          field: 'end_date'
        },
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
        { id: 1, name: 'John', amount: 20, end_date: '', create_at: '2011-10-31', reference: 0.03343, status: 1 },
        { id: 2, name: 'Jane', amount: 24, end_date: '2011-10-31', create_at: '2011-10-31', reference: 0.03343, status: 1 },
        { id: 3, name: 'Susan', amount: 16, end_date: '2011-10-30', create_at: '2011-10-30', reference: 0.03343, status: 0 },
        { id: 4, name: 'Chris', amount: 55, end_date: '2011-10-11', create_at: '2011-10-11', reference: 0.03343, status: 1 },
        { id: 5, name: 'Dan', amount: 40, end_date: '2011-10-21', create_at: '2011-10-21', reference: 0.03343, status: 0 },
        { id: 6, name: 'John', amount: 20, end_date: '2011-10-31', create_at: '2011-10-31', reference: 0.03343, status: 1 }
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
