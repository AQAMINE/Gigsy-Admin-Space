<template>

    <section class="mt-4">
        <!-- <h2>Dashboard</h2> -->
        <div class="container">
        <div class="row">
            <base-card :shadow="true" title="Surbrillance">
                <number-card color="bg-c-yellow" icon="fa-users" title="Nombre d'utilisateur" :number="usersCounter"></number-card>
                <number-card color="bg-c-pink" icon="fa-shop" title="Nombre de vendeurs" number="50"></number-card>
                <number-card color="bg-c-green" icon="fa-cart-flatbed" title="Nombre d'acheteurs" number="500"></number-card>
                <number-card color="bg-c-blue" icon="fa-chart-line" title="Nombre de commandes" number="450"></number-card>
            </base-card>
            <base-card class="mt-2 chart" :shadow="true" :title="'Meilleures ventes'"><base-char></base-char></base-card>

            <base-card class="mt-2" :shadow="true" :title="'Top 4 Services'">
              <div class="col-lg-3 col-md-6 col-sm-12" v-for="service in services" :key="service.id">
                  <div  class="card " style="width: 18rem;">
                    <img :src="service.image" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">{{service.name}}</h5>
                      <p class="card-text">{{service.description}}.</p>
                    </div>
                    <div class="row rounded-0 p-2">
                      <div class="col-8"><div class=" rounded-0">{{service.seller.user.fullname}} Dh</div></div>
                      <div class="col-3"><div class="text-warning rounded-0">{{service.rating}} <i class="fa fa-star"></i></div></div>
                    </div>
                    <div class="m-3 custom-price">{{service.price}} Dh</div>
                  </div>
              </div>
            </base-card>
        </div>
    </div>
    </section>
</template>

<script>
import NumberCard from '../components/ui/card/NumberCard.vue'
import BaseCard from '../components/ui/card/BaseCard.vue'
import BaseChar from '../components/char/BaseChar.vue'
export default {
  components: { NumberCard, BaseCard, BaseChar },
  data () {
    return {
      usersCounter: 0,
      services: {},
      isLoading: false
    }
  },
  created () {
    this.userCounter()
    this.loadTop4Services()
  },
  methods: {
    userCounter () {
      this.usersCounter = this.$store.getters['users/users'].length
    },
    async loadTop4Services () {
      const services = []
      await window.axios.get(this.$config.app_url + '/api/v1/services/list').then(response => {
        const allServices = response.data.data
        for (const key in allServices) {
          services.push(allServices[key])
          if (services.length >= 4) {
            break
          }
        }
        this.services = services
        console.log(this.services)
      }).catch(errors => this.showAlert('error', errors.message))
    }
  },
  computed: {

  }
}
</script>
<style scoped>
.chart{
  /* max-height: 400px; */
}
.card{
      box-shadow: 1px 1px 10px #00000063;
      border-bottom: 2px solid #ff5927;
}
.custom-price{
    background-color: #ff5927;
    border-left: 2px solid black;
    color: white;
    padding: 3px;
    border-radius: 10px 10px 10px 0px;
    width: fit-content;
}
</style>
