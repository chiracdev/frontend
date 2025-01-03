<template>
  <Separator />
  <br />
  <div class="flex items-center justify-center bg-site-bg p-6">
    <div class="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div class="w-full md:w-1/2 p-6">
        <img
          src="/contact/contact.jpg"
          alt="Person working on laptop"
          class="w-full h-auto rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
        />
      </div>
      <!-- Colonne du formulaire -->
      <div class="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h2 class="text-3xl font-bold text-site-bg mb-4 text-center animate-fadeInSlide">CONTACT US</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Nom -->
          <div>
            <input
              v-model="name"
              @input="validateName"
              type="text"
              placeholder="Nom"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
              required
            />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <input
              v-model="email"
              @input="validateEmailInput"
              type="email"
              placeholder="Email"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
              required
            />
            <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
          </div>

          <!-- Sujet -->
          <div>
            <select
              v-model="subject"
              @change="validateSubject"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
              required
            >
              <option disabled value="">Choisissez l'objet du contact</option>
              <option>Devenir Membre de l'Association ADNA NDOGBATJECK</option>
              <option>Assister au congrès</option>
              <option>Faire un Don pour le congrès</option>
              <option>Devenir Partenaire/Sponsor</option>
              <option>Autres</option>
            </select>
            <p v-if="errors.subject" class="text-red-500 text-sm">{{ errors.subject }}</p>
          </div>

          <!-- Message -->
          <div>
            <textarea
              v-model="message"
              @input="validateMessage"
              placeholder="Message"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 h-32"
              required
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</p>
          </div>

          <!-- Bouton de soumission -->
          <div>
            <button
              type="submit"
              class="relative overflow-hidden bg-[#458018] text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
            >
              <span class="absolute inset-0 bg-yellow-500 transform -translate-y-full transition-all duration-300 ease-out"></span>
              <span class="relative z-10">SOUMETTRE</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import Separator from '@/components/frontend/separator/Separator.vue';
import ContactsService from '@/services/contacts.js';
import Swal from 'sweetalert2';

// Références pour les champs du formulaire
const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

// Fonction pour valider l'email avec une regex
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validation en temps réel du champ "Nom"
const validateName = () => {
  errors.value.name = name.value ? '' : 'Le nom est requis.';
};

// Validation en temps réel du champ "Email"
const validateEmailInput = () => {
  if (!email.value) {
    errors.value.email = "L'email est requis.";
  } else if (!validateEmail(email.value)) {
    errors.value.email = "L'adresse e-mail est invalide.";
  } else {
    errors.value.email = '';
  }
};

// Validation en temps réel du champ "Sujet"
const validateSubject = () => {
  errors.value.subject = subject.value ? '' : "L'objet est requis.";
};

// Validation en temps réel du champ "Message"
const validateMessage = () => {
  errors.value.message = message.value ? '' : 'Le message est requis.';
};

// Fonction de soumission du formulaire
const submitForm = async () => {
  // Réinitialiser les erreurs
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  let hasError = false;

  // Valider les champs avant soumission
  if (!name.value) {
    errors.value.name = "Le nom est requis.";
    hasError = true;
  }
  if (!email.value) {
    errors.value.email = "L'email est requis.";
    hasError = true;
  } else if (!validateEmail(email.value)) {
    errors.value.email = "L'adresse e-mail est invalide.";
    hasError = true;
  }
  if (!subject.value) {
    errors.value.subject = "L'objet est requis.";
    hasError = true;
  }
  if (!message.value) {
    errors.value.message = "Le message est requis.";
    hasError = true;
  }

  // Si des erreurs existent, ne pas soumettre
  if (hasError) return;

  // Afficher un loader pendant la soumission
  const loading = Swal.fire({
    title: 'Envoi...',
    text: 'Votre message est en cours d\'envoi.',
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const contactData = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    // Attendre la réponse du service
    await ContactsService.createContact(contactData);

    // Réinitialiser les champs du formulaire
    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';

    // Fermer le loader et afficher un message de succès
    Swal.close();
    Swal.fire({
      title: 'Succès!',
      text: 'Contact soumis avec succès!',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } catch (error) {
    // Fermer le loader et afficher un message d'erreur
    Swal.close();
    Swal.fire({
      title: 'Erreur!',
      text: 'Erreur lors de la soumission du contact: ' + error.message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#F44336',
    });
    console.error('Erreur lors de la soumission:', error);
  }
};
</script>




<style scoped>
.bg-site-bg {
  background-color: #9C7C13; /* Couleur de fond spécifiée */
}

button:hover span:first-child {
  transform: translateY(0); /* Remonte l'effet de couleur lors du survol */
}

/* Animation pour le titre */
@keyframes fadeInSlide {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInSlide {
  animation: fadeInSlide 0.5s ease-in-out forwards;
}
</style>
