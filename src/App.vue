
<template>
  <div>
    <Layout v-if="!isAdminRoute">
      <Loader :isLoading="isLoading" />
      <router-view v-if="!isLoading" />
    </Layout>
    <AdminLayout v-else>
      <Loader :isLoading="isLoading" />
      <router-view v-if="!isLoading" />
    </AdminLayout>
  </div>
</template>

<script>
import Layout from "./components/frontend/layout/Layout.vue";
import AdminLayout from "./components/Admin/Layout.vue"; // Import the Admin Layout
import Loader from "./components/frontend/loader/Loader.vue";

export default {
  name: "App",
  components: {
    Layout,
    AdminLayout, // Register Admin Layout component
    Loader,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    isAdminRoute() {
      // Check if the current route is an Admin route
      return this.$route.path.startsWith("/Admin");
    },
  },
  mounted() {
    this.simulateLoading();
  },
  methods: {
    simulateLoading() {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>