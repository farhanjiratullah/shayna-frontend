<template>
  <!-- Partner Logo Section Begin -->
  <div class="partner-logo">
    <div class="container">
      <carousel
        class="logo-carousel"
        :items-to-show="4"
        :wrapAround="true"
        :autoplay="2000"
      >
         <slide v-for="slide in 5" :key="slide">
          <div class="logo-item">
            <div class="tablecell-inner">
              <img :src="`img/logo-carousel/logo-${slide}.png`" alt="" />
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
  <!-- Partner Logo Section End -->
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

export default {
  name: "PartnerShayna",
  components: {
    Carousel, Slide
  }
};
</script>
