<template>
  <!-- Women Banner Section Begin -->
  <section class="women-banner spad">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-5" v-if="products.length > 0">
          <carousel
            class="product-slider"
            :items-to-show="3"
            :wrapAround="true"
            :autoplay="5000"
          >
            <slide
              class="product-item"
              v-for="itemProduct in products"
              :key="itemProduct.id"
            >
              <div class="pi-pic">
                <img :src="itemProduct.galleries[0].photo" alt="" />
                <ul>
                  <li
                    class="w-icon active"
                    @click="
                      saveKeranjang(
                        itemProduct.id,
                        itemProduct.name,
                        itemProduct.price,
                        itemProduct.galleries[0].photo
                      )
                    "
                  >
                    <!-- <router-link to="/cart" class="primary-btn pd-cart"> -->
                      <a @click="
                        saveKeranjang(
                          itemProduct.id,
                          itemProduct.name,
                          itemProduct.price,
                          itemProduct.galleries[0].photo
                        )
                      "><i class="icon_bag_alt"></i></a>
                    <!-- </router-link> -->
                  </li>
                  <li class="quick-view">
                    <router-link :to="{ name: 'product', params: { id: itemProduct.id } }"
                      >+ Quick View</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{{ itemProduct.type }}</div>
                <router-link :to="{ name: 'product', params: { id: itemProduct.id } }">
                  <h5>{{ itemProduct.name }}</h5>
                </router-link>
                <div class="product-price">
                  ${{ itemProduct.price }}
                  <span>$35.00</span>
                </div>
              </div>
            </slide>
            <template #addons>
              <navigation />
              <pagination />
            </template>
          </carousel>
        </div>

        <div class="col-lg-12" v-else>
          <p>Data terbaru belum tersedia untuk saat ini</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Women Banner Section End -->
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import axios from "axios";

export default {
  name: "WomanShayna",
  components: {
    Carousel, Slide, Pagination, Navigation
  },
  data() {
    return {
      products: [],
      keranjangUser: [],
    };
  },
  methods: {
    saveKeranjang(idProduct, nameProduct, priceProduct, photoProduct) {
      let productStored = {
        id: idProduct,
        name: nameProduct,
        price: priceProduct,
        photo: photoProduct,
      };

      this.keranjangUser.push(productStored);

      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);

      this.$router.push({ name: 'cart' })
    },
  },
  mounted() {
    if (localStorage.getItem("keranjangUser")) {
      try {
        this.keranjangUser = JSON.parse(localStorage.getItem("keranjangUser"));
      } catch (e) {
        localStorage.removeItem("keranjangUser");
      }
    }

    axios
      .get("https://shayna-backend.test/api/products")
      .then((res) => (this.products = res.data.data.data))
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.product-item {
  margin-right: 25px;
}

.pi-pic img {
  height: 450px;
}
</style>
