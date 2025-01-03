<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Répondre au Message</h1>
      <div v-if="loading">
         Loading contact data...
      </div>
    <div v-else class="bg-white shadow rounded p-6 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nom</label>
        <p class="mt-1 text-gray-900">{{ contact.name }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <p class="mt-1 text-gray-900">{{ contact.email }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Sujet</label>
        <p class="mt-1 text-gray-900">{{ contact.subject }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Message</label>
        <p class="mt-1 text-gray-900 whitespace-pre-line">{{ contact.message }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Réponse</label>
        <textarea
            v-model="reply"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#06AE16] focus:border-[#06AE16] sm:text-sm"
         rows="4"
        />
      </div>
        <div class="flex justify-end mt-6">
          <button @click="replyToMessage" :disabled="isSubmitting" class="btn-primary">
            <span v-if="!isSubmitting">
              Répondre
            </span>
            <span v-else>
                  <i class="fas fa-spinner animate-spin"></i> En cours...
             </span>
          </button>
           <button @click="markAsRead"  :disabled="isSubmitting" class="ml-2 btn-secondary">
            <span v-if="!isSubmitting">
              Marquer comme Lu
            </span>
             <span v-else>
                  <i class="fas fa-spinner animate-spin"></i> En cours...
                </span>
          </button>
           <button @click="$router.push('/Admin/contacts')" class="ml-2 btn-secondary">
                 Annuler
             </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ContactsService from '@/services/contacts';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter()
const toast = useToast();
const contact = ref({});
const reply = ref('');
const loading = ref(true);
const isSubmitting = ref(false);

onMounted(async () => {
    try {
        const response = await ContactsService.getContactById(route.params.id);
        contact.value = response.contact;
        reply.value = response.contact.reply || '';
    } catch (error) {
        console.error('Error fetching contact:', error);
          toast.error('Erreur lors du chargement du contact', {
             timeout: 3000,
          });
        router.push('/Admin/contacts')
    }finally {
           loading.value = false;
    }
});

const replyToMessage = async () => {
     isSubmitting.value = true
    try {
      await ContactsService.replyToContact(route.params.id, { reply: reply.value });
        toast.success('Message répondu avec succès', {
            timeout: 3000
        });
      router.push('/Admin/contacts');
    } catch (error) {
        console.error("Error replying to contact:", error);
           toast.error('Erreur lors de l\'envoie du message', {
              timeout: 3000,
            });
    }finally{
       isSubmitting.value = false
    }
};

const markAsRead = async () => {
     isSubmitting.value = true
    try {
      await ContactsService.markContactAsRead(route.params.id);
       toast.success('Message marqué comme lu avec succès', {
            timeout: 3000,
         });
    } catch (error) {
      console.error("Error marking message as read:", error);
         toast.error('Erreur lors du marquage comme lu du message', {
              timeout: 3000,
            });
    }finally{
           isSubmitting.value = false;
       }
};
</script>
<style scoped>
.form-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500;
}
.btn-primary {
  @apply bg-[#06AE16] hover:bg-[#058512] text-white px-4 py-2 rounded font-medium transition-all duration-300;
}
.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium transition-all duration-300;
}
</style>