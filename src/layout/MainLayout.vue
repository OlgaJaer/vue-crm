<template>
  <Loader v-if="loading" />
  <div v-else class="app-main-layout">
    <Navbar @click="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/app/Sidebar";
import Navbar from "../components/app/Navbar";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).lenth) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: { Sidebar, Navbar }
};
</script>
