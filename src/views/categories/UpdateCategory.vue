<template>
  <form class="addForm mt-2">
            <h5>Modifier la catégorie</h5>
            <div class="mb-3">
                <label for="category_name" class="col-sm-3 col-form-label">Nom de catégorie</label>
                <div class="col-sm-12">
                    <input type="text" class="form-control rounded-0" id="category_name" v-model="category.category_name">
                </div>
            </div>
            <div class="mb-3">
                <label for="slug" class="col-sm-3 col-form-label">Slug</label>
                <div class="col-sm-12">
                    <input type="text" class="form-control rounded-0" id="slug" v-model="category.slug">
                </div>
            </div>
            <div class="mb-3">
                <label for="description" class="col-sm-3 col-form-label">La description</label>
                <div class="col-sm-12">
                    <textarea class="form-control rounded-0" id="description" cols="10" rows="3" v-model="category.description"></textarea>
                </div>
            </div>
            <div class="mb-3">
              <label for="image" class="col-sm-3 col-form-label" >Image</label>
                <div class="col-sm-12">
                    <input type="file" class="form-control rounded-0" id="image">
                </div>
            </div>
            <div class="mb-3">
              <button class="btn btn-success rounded-0 btn-sm">Modifier</button>
            </div>
  </form>
</template>
<script>
export default {
  data () {
    return {
      category: {
        category_name: '',
        slug: '',
        description: '',
        image: ''
      }
    }
  },
  created () {
    this.loadCategory()
  },
  methods: {
    async loadCategory () {
      const catId = this.$route.params.id
      await window.axios.get(this.$config.app_url + '/api/v1/categories/' + catId).then(response => {
        console.log(response.data.data)
        this.category = response.data.data
      }).catch(errors => console.log(errors))
    }
  }
}
</script>
<style scoped>

</style>
