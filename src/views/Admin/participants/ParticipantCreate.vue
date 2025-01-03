<template>
    <div class="container mx-auto px-4 py-8">
         <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold">Ajouter un participant</h1>
         </div>
        <ParticipantForm  :isEdit="false" @submit="createParticipant" @cancel="$router.push('/Admin/participants')"  />
    </div>
</template>

<script setup>
import ParticipantForm from '@/components/Admin/participants/ParticipantForm.vue';
import { useRouter } from 'vue-router';
import ParticipantService from '@/services/ParticipantService';
import { useToast } from 'vue-toastification';
const router = useRouter()
const toast = useToast();

const createParticipant = async (participantData, userProfile) => {
    try {
          let transformedData = { ...participantData };
           transformedData.name = userProfile.name;
             transformedData.email = userProfile.email;
            if(participantData.activite_id && participantData.activite_id.length > 0){
             transformedData.activite_id = Array.isArray(participantData.activite_id) ? participantData.activite_id : [participantData.activite_id]
           }else {
                delete transformedData.activite_id
            }
           if(participantData.themes && participantData.themes.length > 0){
             transformedData.themes = Array.isArray(participantData.themes) ? participantData.themes : [participantData.themes]
           } else {
              delete transformedData.themes
            }
        await ParticipantService.createParticipant(transformedData);
         toast.success('Participant créé avec succès', {
            timeout: 3000,
         });
           router.push('/Admin/participants')
     } catch (error) {
          console.error('Error creating participant:', error);
          if (error.response && error.response.data.errors) {
          errors.value = error.response.data.errors;
        }
          toast.error('Erreur lors de la création du participant', {
              timeout: 3000,
            });
     }
}
</script>