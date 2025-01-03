<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold">Liste des contacts</h1>
        </div>
      <ContactTable @edit="editContact" @delete="deleteContact"/>
    </div>
</template>

<script setup>
import ContactTable from '@/components/Admin/contacts/ContactTable.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const editContact = (id) => {
    router.push(`/Admin/contacts/${id}/edit`)
}
const deleteContact = (id) => {
    console.log('Supprimer le contact avec id : ' + id)
}
</script>