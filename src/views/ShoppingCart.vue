<template>
  <div class="cart">
    <HeaderShayna />

    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-left">
            <div class="breadcrumb-text product-more">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name text-center">Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="keranjangUser.length > 0">
                      <tr
                        v-for="(keranjang, index) in keranjangUser"
                        :key="keranjang.id"
                      >
                        <td class="cart-pic first-row">
                          <img class="img-cart" :src="keranjang.photo" />
                        </td>
                        <td class="cart-title first-row text-center">
                          <h5>{{ keranjang.name }}</h5>
                        </td>
                        <td class="p-price first-row">
                          ${{ keranjang.price }}.00
                        </td>
                        <td
                          class="delete-item"
                          @click="removeItem(index)"
                        >
                          <router-link to="/cart"
                            ><i class="material-icons"> close </i></router-link
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4">Keranjang kosong</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8">
                <h4 class="mb-4 text-left">Informasi Pembeli:</h4>
                <div class="user-checkout text-left">
                  <form>
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
                      <input
                        type="text"
                        class="form-control"
                        id="namaLengkap"
                        aria-describedby="namaHelp"
                        placeholder="Masukan Nama"
                        v-model="customerInfo.name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Masukan Email"
                        v-model="customerInfo.email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
                      <input
                        type="text"
                        class="form-control"
                        id="noHP"
                        aria-describedby="noHPHelp"
                        placeholder="Masukan No. HP"
                        v-model="customerInfo.number"
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea
                        class="form-control"
                        id="alamatLengkap"
                        rows="3"
                        v-model="customerInfo.address"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout text-left">
                  <ul>
                    <li class="subtotal">
                      ID Transaction <span>#SH12000</span>
                    </li>
                    <li class="subtotal mt-3">
                      Subtotal <span>${{ totalHarga }}.00</span>
                    </li>
                    <li class="subtotal mt-3">Pajak <span>10%</span></li>
                    <li class="subtotal mt-3">
                      Total Biaya <span>${{ totalBiaya }}.00</span>
                    </li>
                    <li class="subtotal mt-3">
                      Bank Transfer <span>Mandiri</span>
                    </li>
                    <li class="subtotal mt-3">
                      No. Rekening <span>2208 1996 1403</span>
                    </li>
                    <li class="subtotal mt-3">
                      Nama Penerima <span>Shayna</span>
                    </li>
                  </ul>
                  <a href="#" class="proceed-btn" @click="checkout()"
                    >I ALREADY PAID</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import HeaderShayna from "@/components/HeaderShayna.vue";
import axios from "axios";

export default {
  name: "cart",
  components: {
    // HelloWorld,
    HeaderShayna,
  },
  data() {
    return {
      keranjangUser: [],
      customerInfo: {
        name: "",
        email: "",
        number: "",
        address: "",
      },
    };
  },
  methods: {
    removeItem(index) {
      this.keranjangUser.splice(index, 1);

      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);
    },
    checkout() {
      let productIds = this.keranjangUser.map(function (product) {
        return product.id;
      });

      let checkoutData = {
        name: this.customerInfo.name,
        email: this.customerInfo.email,
        number: this.customerInfo.number,
        address: this.customerInfo.address,
        transaction_total: this.totalBiaya,
        transaction_status: "PENDING",
        transaction_details: productIds,
      };

      axios
        .post("https://shayna-backend.test/api/checkout", checkoutData)
        .then(() => {
          this.$router.push("success")
          localStorage.clear()
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    totalHarga() {
      return this.keranjangUser.reduce(function (items, data) {
        return items + data.price;
      }, 0);
    },
    totalBiaya() {
      let total = parseInt(this.totalHarga + (this.totalHarga * 10) / 100);
      return total;
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
  },
};
</script>

<style scoped>
.img-cart {
  width: 150px;
  height: 100px;
}
</style>
