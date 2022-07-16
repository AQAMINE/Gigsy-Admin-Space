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
                <button v-if="!props.row.status" @click="changeState(props.row.id)" href="{{props.row.id}}" class="btn btn-danger btn-sm rounded-0 cust-btn" >Approuvée <i class="fa fa-edit"></i> </button>
                <span class="badge bg-success" v-else>Approuvée</span>
                <!-- <a href="{{props.row.id}}" class="btn btn-danger btn-sm rounded-0" >Supprimer <i class="fa fa-trash"></i></a> -->
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
        const services = []
        const respanseData = response.data.data
        for (const key in respanseData) {
          const convertedData = { ...respanseData[key] }
          const service = {
            id: convertedData.id,
            name: convertedData.name,
            description: convertedData.description,
            image: convertedData.image,
            rating: convertedData.rating,
            status: convertedData.status,
            seller: convertedData.seller.user.fullname
          }
          services.push(service)
        }
        this.services = services
      }).catch(errors => this.showAlert('error', errors.message))
    },
    changeState (id) {
      window.axios.post(this.$config.app_url + '/api/v1/services/update/approve/' + id).then((res) => {
        console.log(res)
        this.showAlert('success', 'Approuvé avec succès')
        this.loadServices()
      })
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
