<template>
    <main class="p-4 md:p-6">
        <div class="mx-auto max-w-4xl">
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Ajouter un Sponsor</h1>
             <div class="bg-white rounded-lg shadow-sm p-4">
                <SponsorForm :submitButtonText="'Ajouter le Sponsor'" @form-submitted="handleFormSubmit" :sponsor="initialSponsor"  />
          </div>
      </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import SponsorForm from '../../../components/Admin/sponsors/SponsorForm.vue';
import SponsorService from '../../../services/SponsorService';
import { useRouter, useRoute  } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const route = useRoute();

const initialSponsor = ref({
         type_sponsor:  route.query.type,
});

const handleFormSubmit = async (sponsorData) => {
  try {
    await SponsorService.createSponsor(sponsorData);
    toast.success('Sponsor créé avec succès.');
      router.push({ path: `/Admin/sponsors?type=${sponsorData.type_sponsor}` });

    } catch (error) {
        console.error('Error creating sponsor:', error);
        toast.error('Erreur lors de la création du sponsor.');
    }
};
</script>