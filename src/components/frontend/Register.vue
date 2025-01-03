<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import ds from "../Services/DataService";

const router = useRouter();
const authStore = useAuthStore();
import { useToast } from 'vue-toastification'; // Import useToast


const toast = useToast(); // Initialize toast

const errorMessages = ref([]);


const matricule = ref('');
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const password_confirmation = ref('');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
};

const registerUser = async () => {
    console.log("cliquer")
    if (password.value !== password_confirmation.value) {
        errorMessages.value = ['Le mot de passe et la confirmation du mot de passe ne correspondent pas.'];
        return;
    }

    // // Add input validation for phone number
    // if (!/^\d+$/.test(phone.value)) {
    //     errorMessages.value.push('Veuillez entrer un numéro de téléphone valide.');
    // }

    // // Add input validation for last name
    // if (!/^[a-zA-Z]+$/.test(last_name.value)) {
    //     errorMessages.value.push('Le nom d\'utilisateur ne doit contenir que des lettres.');
    // }

    // // Check if there are any validation errors
    // if (errorMessages.value.length > 0) {
    //     return;
    // }


    // if (!validateEmail(email)) {
    //     return (errorMessages.value = ["L'email n'est pas valide"]);
    // }

    try {
        const response = await ds.post('/api/auth/register', {
            matricule: matricule.value,
            first_name: first_name.value,
            last_name: last_name.value,
            phone: phone.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        });
        // If registration is successful, show success toast
        toast.success('Inscription réussie!');
        //authStore.login(response.data);
        await router.push('/login');
    } catch (error) {
        handleAuthError(error);
    }
};



const handleAuthError = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
        errorMessages.value = Object.values(error.response.data.errors).flat();
    } else {
        errorMessages.value = ['Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.'];
    }
};
</script>
   


<template>
    <div class="bg-soft-primary forFixedNav">
        <div class="row align-items-center justify-content-center vh-100">
            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6">
                <div class="card rounded-2 border-0 p-5 m-0">

                    <div class="card-header border-0 p-0 text-center">
                        <a href="../index.html" class="w-100 d-inline-block mb-5">
                            <!-- <img src="assets/img/footer-logo-2.svg" alt="img">  --> LOGO
                        </a>
                        <h3>Welcome to ISTAMA Travel!</h3>
                        <p class="fs-14 text-dark my-4">Signup here to create your own dashboard.</p>
                    </div>

                    <!-- Affichage des messages d'erreur côté client -->
                    <div v-if="errorMessages.length > 0" class="alert alert-danger">
                        <ul>
                            <li v-for="message in errorMessages" :key="message">{{ message }}</li>
                        </ul>
                    </div>

                    <div class="btn-group gap-2">
                        <a href="https://www.google.com/"
                            class="btn btn-outline-primary d-flex align-items-center justify-content-center gap-1 px-2 rounded-1">
                            <img :src="('@/assets/img/svg/google-icon.svg')" alt="img">
                            Sign in with Google
                        </a>
                        <a href="https://www.facebook.com/"
                            class="btn btn-outline-primary d-flex align-items-center justify-content-center gap-1 px-2 rounded-1">
                            <img :src="('@/assets/img/svg/facebook-icon.svg')" alt="img">
                            Sign in with Facebook
                        </a>
                    </div>

                    <div class="position-relative text-center my-4">
                        <p class="mb-0 position-relative z-index-1 d-inline-block bg-white px-3">or Signup with</p>
                        <span
                            class="border border-light position-absolute top-50 start-50 translate-middle d-inline-block w-100"></span>
                    </div>

                    <div class="card-body p-0">
                        <form @submit.prevent="registerUser" class="form-horizontal" method="post">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="matricule" placeholder="matricule"
                                            required>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="first_name" placeholder="Name "
                                            required>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="last_name" placeholder=" User Name"
                                            required>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="phone" placeholder="Telephone"
                                            required>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="email" class="form-control" v-model="email" placeholder="Email"
                                            required>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="password" class="form-control" v-model="password"
                                            placeholder="Type Password" required>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="password" class="form-control" v-model="password_confirmation"
                                            placeholder="Re-type Password" required>
                                    </div>
                                </div>
                            </div>

                            <button type="submit"
                                class="btn btn-primary w-100 text-uppercase text-white rounded-2 lh-34 ff-heading fw-bold shadow">Register</button>
                            <div class="toast-container">
                                <p class="d-flex align-items-center justify-content-center gap-2 mt-4 mb-0">Already have an
                                    account? <router-link to="/login"
                                        class="text-secondary fw-bold text-decoration-underline">
                                        Login</router-link></p>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>