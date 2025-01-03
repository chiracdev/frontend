<template>
   <div class="container mx-auto px-4 py-8">
         <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold">Liste des participants</h1>
              <button @click="$router.push('/Admin/participants/create')" class="btn-primary">
                 <i class="fas fa-plus"></i> Ajouter un participant
              </button>
        </div>
      <ParticipantTable @edit="editParticipant" @delete="deleteParticipant"/>
   </div>
</template>
<script setup>
import ParticipantTable from '@/components/Admin/participants/ParticipantTable.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const editParticipant = (id) => {
    router.push(`/Admin/participants/${id}/edit`)
}
const deleteParticipant = (id) => {
    console.log("id du participant a supprimer " + id)
}

</script>