<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const errorMessages = ref([]);
const email = ref("");
const password = ref("");

const loginUser = async () => {
  try {
    // Attempt to log in the user using the auth store
    await authStore.login({ email: email.value, password: password.value });

    // Determine the redirect path based on user type
    const redirectPath = determineRedirectPath(authStore.user.type);
    await router.push(redirectPath); // Redirect the user
  } catch (error) {
    handleAuthError(error); // Handle any errors that occur during login
  }
};

const determineRedirectPath = (userType) => {
  // Redirect to the appropriate path based on user type
  return userType === "admin" ? "/Admin/dashboard" : "/user";
};

const handleAuthError = (error) => {
  // Handle errors during authentication
  if (error.response && error.response.data && error.response.data.errors) {
    errorMessages.value = Object.values(error.response.data.errors).flat();
  } else {
    errorMessages.value = [
      "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
    ];
  }
};
</script>

<template>
  <div class="bg-primary forFixedNav">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6">
        <div class="p-5 m-0 border-0 card rounded-2">
          <div class="p-0 text-center border-0 card-header">
            <a href="../index.html" class="mb-5 w-100 d-inline-block"> LOGO </a>
            <h3>Welcome back!</h3>
            <p class="my-4 fs-14 text-dark">Please login using your account.</p>
          </div>

          <!-- Display error messages if any -->
          <div v-if="errorMessages.length > 0" class="alert alert-danger">
            <ul>
              <li v-for="message in errorMessages" :key="message">
                {{ message }}
              </li>
            </ul>
          </div>

          <div class="p-0 card-body">
            <form
              @submit.prevent="loginUser"
              class="form-horizontal"
              method="post"
            >
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="email"
                  placeholder="Username or Email"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Type Password"
                  required
                />
              </div>

              <button
                type="submit"
                class="text-white shadow btn btn-primary w-100 text-uppercase rounded-2 lh-34 ff-heading fw-bold"
              >
                Login
              </button>

              <p
                class="mt-4 mb-4 text-black d-flex align-items-center justify-content-between"
              >
                Forgot your password?
                <router-link to="/forget" class="text-primary fw-bold"
                  >Reset Here</router-link
                >
              </p>

              <router-link
                to="/register"
                class="text-white btn btn-secondary w-100 text-uppercase rounded-2 lh-34 ff-heading fw-bold"
              >
                Create an Account
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
