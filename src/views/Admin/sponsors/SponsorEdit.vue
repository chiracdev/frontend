<template>
    <main class="p-4 md:p-6">
        <div class="mx-auto max-w-4xl">
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Modifier un Sponsor</h1>
           <div class="bg-white rounded-lg shadow-sm p-4" v-if="sponsor">
                <SponsorForm :sponsor="sponsor" :submitButtonText="'Modifier le Sponsor'" @form-submitted="handleFormSubmit" />
             </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SponsorForm from '../../../components/Admin/sponsors/SponsorForm.vue';
import SponsorService from '../../../services/SponsorService';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const route = useRoute();
const sponsor = ref(null);
const fetchSponsor = async () => {
  try {
    const data = await SponsorService.getSponsor(route.params.id);
    sponsor.value = data.data;
  } catch (error) {
    console.error('Error fetching sponsor:', error);
    toast.error('Erreur lors du chargement du sponsor.');
     router.push('/admin/sponsors');
  }
};
const handleFormSubmit = async (sponsorData) => {
    try {
        await SponsorService.updateSponsor(route.params.id, sponsorData);
         toast.success('Sponsor modifié avec succès.');
      router.push({ path: `/Admin/sponsors?type=${sponsorData.type_sponsor}` });
      } catch (error) {
          console.error('Error updating sponsor:', error);
        toast.error('Erreur lors de la modification du sponsor.');
      }
};
onMounted(() => {
  fetchSponsor();
});
</script>