<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const authStore = useAuthStore();
const router = useRouter();

const Token = authStore.resetToken
const email = ref('')
const password = ref('')

const resetPassword = async () => {
    try {
        const response = await ds.post('/api/auth/reset-password', {
            email: email.value,
            token: Token.value,
            password: password.value
        });
        console.log(response.data.message);
        await router.push('/login');

    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe', error);
        // Gérer les erreurs
    }
};
</script>

<template>
    <div class="bg-soft-danger forFixedNav">
        <div class="row align-items-center justify-content-center vh-100">
            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6">
                <div class="card rounded-2 border-0 p-5 m-0">

                    <div class="card-header border-0 p-0 text-center">
                        <a href="../index.html" class="w-100 d-inline-block mb-5">
                            <!-- <img src="assets/img/footer-logo-2.svg" alt="img"> -->LOGO
                        </a>
                        <h3>Reinitialisez votre mot de passe</h3>
                    </div>

                    <div class="card-body p-0">
                        <form @submit.preven="resetPassword" class="form-horizontal">
                            <div class="form-group">
                                <input type="email" class="form-control" v-model="email" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" v-model="password" placeholder="mot de passe"
                                    required>
                            </div>

                            <button type="submit"
                                class="btn btn-primary w-100 text-uppercase text-white rounded-2 lh-34 ff-heading fw-bold shadow">Confirmer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>