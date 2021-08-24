<template>
  <v-container fluid>
    <v-row class="album p-1 d-flex justify-center">
      <template>
        <v-col cols="12" class="row d-flex justify-center ">
          <v-col cols="12" md="5" lg="3" v-for="(post, index) in computedPosts" :key="index * editCount"
                 class="mx-5 my-4 pa-0">
            <v-card class="mx-auto card_height" :elevation="6">
              <div class="hover-wrapper ">
                <v-img height="250"
                       eager
                       position="center center"
                       :src="post.picture"
                >
                </v-img>

                <h2 class="product-name">{{ post.name }}</h2>
                <p class="product-price ">${{ post.price }}</p>

              </div>
              <div class="text-center">
                <v-btn
                    color="primary"
                    dark
                    @click="productDetails(post)"
                >
                  product details
                </v-btn>
              </div>
              <v-col class="d-none">
                <v-card-text>{{ post.description }}</v-card-text>
              </v-col>
              <v-col>
              </v-col>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-pagination
                color="green"
                v-model="page"
                :length="Math.ceil(getPosts.length/limit)"
            ></v-pagination>
          </v-col>

        </v-col>

        <v-col cols="auto">
          <v-dialog
              transition="dialog-top-transition"
              max-width="600"
              v-model="dialog"
          >

            <template v-slot:default="dialog">

              <v-card class="mx-auto card_height" :elevation="6">
                <div class="hover-wrapper ">
                  <v-img height="250"
                         eager
                         position="center center"
                         :src="productDetailData.picture"
                  >
                  </v-img>

                  <h2 class="product-name">{{ productDetailData.name }}</h2>
                  <p class="product-price ">${{ productDetailData.price }}</p>


                  <v-col>
                    <v-card-text>{{ productDetailData.description }}</v-card-text>
                  </v-col>
                  <div class="text-center">
                    <v-btn color="success" dark>
                      add to cart
                    </v-btn>
                  </div>
                </div>
              </v-card>

            </template>
          </v-dialog>
        </v-col>

      </template>
    </v-row>
  </v-container>

</template>

<script>
import {mapGetters} from "vuex";


export default {
  name: "PostList",
  data: () => ({
    page: 1,
    limit: 2,
    image: '',
    valid: false,
    dialog: false,

    postType: '',
    imageType: '',
    imageName: '',
    newImage: '',
    editCount: 1,
    productDetailData: {
      name: '',
      price: '',
      picture: '',
      description: '',
    }
  }),
  beforeCreate() {
    this.$store.dispatch('getPosts')
  },
  methods: {
    productDetails(product) {
      this.dialog = true;
      this.productDetailData.name = product.name;
      this.productDetailData.price = product.price;
      this.productDetailData.picture = product.picture;
      this.productDetailData.description = product.description;

    }
  },
  computed: {
    ...mapGetters(["getPosts"]),
    computedPosts() {
      return this.limit ? this.getPosts.slice(this.limit * (this.page - 1), this.limit * this.page) : this.getPosts
    },
  },

}
</script>

<style lang="scss" scoped>

.product-name {
  line-height: normal;
  font-size: 24px;
  text-align: center;
  color: #4caf50;
  margin-top: 10px;
}

.product-price {
  text-align: center;
  color: grey;
  font-size: 23px;
  margin-top: 10px;
}

.dsp_inline {
  display: inline;
  margin-left: 15px;
}

.hover-wrapper {
  display: block;
  position: relative;
  overflow: hidden;
  padding: 10px;
}
.card_height {
  min-height: 480px;
}
</style>