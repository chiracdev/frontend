<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold">Modifier un participant</h1>
        </div>
        <div v-if="loading">
            Loading participant data...
        </div>
         <div v-else>
              <ParticipantForm
              :participant="participant"
              submit-text="Modifier"
              @submit="updateParticipant"
              @cancel="$router.push('/Admin/participants')"
            />
         </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ParticipantForm from '@/components/Admin/participants/ParticipantForm.vue';
import { useRouter, useRoute } from 'vue-router';
import ParticipantService from '@/services/ParticipantService';
import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/auth";

const route = useRoute()
const router = useRouter()
const toast = useToast();
const participant = ref({});
const loading = ref(true)
const authStore = useAuthStore();


onMounted(async () => {
    try {
         const response = await ParticipantService.getParticipantById(route.params.id)
          participant.value = response
          if(participant.value.estCantonNonParlant === true){
             participant.value.estCantonNonParlant = '1'
          }else {
             participant.value.estCantonNonParlant = '0'
          }
            if(participant.value.estMembreAssociation === true){
              participant.value.estMembreAssociation = '1'
            }else {
              participant.value.estMembreAssociation = '0'
            }
            if(participant.value.estConferencier === true){
               participant.value.estConferencier = '1'
            }else {
               participant.value.estConferencier = '0'
            }
          if(participant.value.user){
              participant.value.name = participant.value.user.name;
             participant.value.email = participant.value.user.email;
          }
           if(participant.value.activites) {
                participant.value.activite_id = participant.value.activites.map(act => act.id)
           }
             if(participant.value.themes) {
                participant.value.themes = participant.value.themes.map(theme => theme.id)
           }
          loading.value = false
    } catch (error) {
        console.error("Erreur lors de la récupération du participant:", error);
        router.push('/Admin/participants')
    }
})

const updateParticipant = async (participantData, userProfile) => {
    try {
          let transformedData = { ...participantData };
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
          await  authStore.updateProfile(userProfile)
          await ParticipantService.updateParticipant(route.params.id, transformedData);
          toast.success('Participant modifié avec succès', {
             timeout: 3000,
          });
          router.push('/Admin/participants')
    } catch (error) {
       console.error('Error update participant:', error);
      toast.error('Erreur lors de la modification du participant', {
              timeout: 3000,
            });
    }
}
</script>