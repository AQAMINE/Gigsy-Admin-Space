<template>
  <div class="container">
          <div class="row">
              <div class="col-12">
                  <div class="card">

                      <div class="card-body">
                          <div class="card-title mb-4">
                            <!-- Strat Profile Picture -->
                            <div class="text-center profile-pic">
                              <img src="https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg" class="rounded" alt="...">
                              <h5>Amine Aqebli</h5>
                            </div>
                          </div>

                          <div class="row">
                              <div class="col-12">
                                  <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                      <li class="nav-item">
                                          <a class="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Basic Info</a>
                                      </li>
                                  </ul>
                                  <div class="tab-content ml-1" id="myTabContent">
                                      <div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">

                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Prénom</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  amine
                                              </div>
                                          </div>
                                          <hr />

                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Nom</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  aqaebli
                                              </div>
                                          </div>
                                          <hr />

                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Email</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  amine@gmail.com
                                              </div>
                                          </div>
                                          <hr />
                                          <div class="row">
                                              <div class="col-sm-3 col-md-2 col-5">
                                                  <label style="font-weight:bold;">Inscrivez-vous à</label>
                                              </div>
                                              <div class="col-md-8 col-6">
                                                  2022-06-02
                                              </div>
                                          </div>
                                          <hr />
                                          <button class="btn btn-success rounded-0">Enregistrer</button>

                                      </div>

                                  </div>
                              </div>
                          </div>

                      </div>

                  </div>
              </div>
          </div>
      </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>
body{
    padding-top: 68px;
    padding-bottom: 50px;
}
        .image-container {
            position: relative;
        }

        .image {
            opacity: 1;
            display: block;
            width: 100%;
            height: auto;
            transition: .5s ease;
            backface-visibility: hidden;
        }

        .middle {
            transition: .5s ease;
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            text-align: center;
        }

        .image-container:hover .image {
            opacity: 0.3;
        }

        .image-container:hover .middle {
            opacity: 1;
        }
        .profile-pic{
              border-bottom: 3px solid #ff5a28
        }
        .profile-pic img{
          height: 200px;
          width: 200px;
          border-radius: 49% !important;
          box-shadow: 1px 1px 5px #000000ab;
          border: 2px solid #ff5a28;

        }
        .profile-pic h6{
          margin-top: 10px !important;
        }
</style>
