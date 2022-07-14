<template>
  <div>
    <base-card class="mt-3" :shadow="true" :title="'Liste des catégories'">
      <div class="row">
        <div class="col-6">
          <warning-spinner v-if="isLoading"></warning-spinner>
          <ul v-else class="list-group list-group-numbered">
            <li v-for="cat in categoriesList" :key="cat.id" class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{cat.category_name}} <span class="badge  bg-dark">{{cat.services.length}} Services</span></div>
                <div class="descrp d-inline-block text-truncate" style="max-width: 300px;">{{cat.description}}</div>
              </div>
              <span class="badge">
                <button class="btn btn-danger btn-sm rounded-0"><i class="fa fa-trash"></i></button>
                <button class="btn btn-success btn-sm rounded-0" @click="editCat(cat.id)"><i class="fa fa-list mr-2"></i></button>
              </span>
            </li>
          </ul>
        </div>
        <div class="col-6">
          <form class="addForm">
            <h5>Ajouter une catégorie</h5>
            <div class="mb-3">
                <label for="fisrtname" class="col-sm-3 col-form-label">Nom de catégorie</label>
                <div class="col-sm-12">
                    <input type="text" class="form-control rounded-0" id="fisrtname">
                </div>
            </div>
            <div class="mb-3">
                <label for="slug" class="col-sm-3 col-form-label">Slug</label>
                <div class="col-sm-12">
                    <input type="text" class="form-control rounded-0" id="slug">
                </div>
            </div>
            <div class="mb-3">
                <label for="description" class="col-sm-3 col-form-label">La description</label>
                <div class="col-sm-12">
                    <textarea class="form-control rounded-0" id="description" cols="10" rows="3"></textarea>
                </div>
            </div>
            <div class="mb-3">
              <label for="image" class="col-sm-3 col-form-label">Image</label>
                <div class="col-sm-12">
                    <input type="file" class="form-control rounded-0" id="image">
                </div>
            </div>
            <div class="mb-3">
              <button class="btn btn-success rounded-0 btn-sm">Ajouter</button>
            </div>
          </form>
          <!-- <router-view/> -->
            <router-view ref="feature" v-slot="{ Component, route }">
              <component :is="Component" :key="route.path" />
          </router-view>
        </div>
      </div>
    </base-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      categoriesList: {},
      isLoading: false
    }
  },
  created () {
    this.loadCategories()
  },
  methods: {
    async loadCategories () {
      this.isLoading = true
      await window.axios.get(this.$config.app_url + '/api/v1/categories/list').then(response => {
        this.categoriesList = response.data.data
      }).catch(errors => console.log(errors))
      this.isLoading = false
    },
    editCat (id) {
      this.$router.replace({ name: 'updateCategory', params: { id: id } })
    }
  }
}
</script>

<style scoped>
.custom-container{
  /* margin: 0px auto; */
  /* max-width: 500px !important; */
}
.addForm{
  border-bottom: 2px solid #ff5927;
}
.badge button:first-child{
  margin-right: 2px !important;
}
</style>
