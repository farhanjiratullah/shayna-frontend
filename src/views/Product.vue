<template>
  <div class="product">
    <HeaderShayna />

    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Detail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6">
                <div class="product-pic-zoom">
                  <img class="product-big-img" :src="gambar_default" alt="" />
                </div>
                <div
                  class="product-thumbs"
                  v-if="productDetails.galleries.length"
                >
                  <carousel
                    class="product-thumbs-track ps-slider"
                    :items-to-show="productDetails.galleries.length"
                    :wrapAround="productDetails.galleries.length > 1 ? true : false"
                    :autoplay="5000"
                  >
                    <Slide
                      class="pt"
                      v-for="ss in productDetails.galleries"
                      :key="ss.id"
                      @click="changeImage(ss.photo)"
                      :class="ss.photo == gambar_default ? 'active' : ''"
                    >
                      <img :src="ss.photo" alt="" />
                    </Slide>
                    <template #addons>
                      <navigation v-if="productDetails.galleries.length > 1 ? true : false" />
                      <pagination v-if="productDetails.galleries.length > 1 ? true : false" />
                    </template>
                  </carousel>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details text-left">
                  <div class="pd-title">
                    <span>{{ productDetails.type }}</span>
                    <h3>{{ productDetails.name }}</h3>
                  </div>
                  <div class="pd-desc">
                    <p v-html="productDetails.description"></p>
                    <h4>${{ productDetails.price }}</h4>
                  </div>
                  <div class="quantity">
                    <router-link to="/cart" class="primary-btn pd-cart">
                      <a
                        @click="
                          saveKeranjang(
                            productDetails.id,
                            productDetails.name,
                            productDetails.price,
                            productDetails.galleries[0].photo
                          )
                        "
                        class="primary-btn pd-cart"
                        >Add To Cart
                      </a>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->

    <RelatedShayna />

    <FooterShayna />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import HeaderShayna from "@/components/HeaderShayna.vue";
import FooterShayna from "@/components/FooterShayna.vue";
import RelatedShayna from "@/components/RelatedShayna.vue";
// import carousel from "vue-owl-carousel";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import axios from "axios";

export default {
  name: "product",
  components: {
    // HelloWorld,
    HeaderShayna,
    RelatedShayna,
    FooterShayna,
    Carousel, Slide, Pagination, Navigation
    // carousel,
  },
  data() {
    return {
      gambar_default: "",
      productDetails: [],
      keranjangUser: [],
    };
  },
  methods: {
    changeImage(urlImage) {
      this.gambar_default = urlImage;
    },
    setDataPicture(data) {
      this.productDetails = data;
      this.gambar_default = data.galleries[0].photo;
    },
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
    },
  },
  created() {
    if (localStorage.getItem("keranjangUser")) {
      try {
        this.keranjangUser = JSON.parse(localStorage.getItem("keranjangUser"));
      } catch (e) {
        localStorage.removeItem("keranjangUser");
      }
    }
    axios
      .get("https://shayna-backend.test/api/products", {
        params: {
          id: this.$route.params.id,
        },
      })
      .then((res) => {
        this.setDataPicture(res.data.data)
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.product-thumbs .pt {
  margin-right: 14px;
}
</style>
