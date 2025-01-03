<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div class="py-8 sm:py-12">
        <!-- Header avec animation améliorée -->
        <header class="animate-float">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
              Système de Paiement
            </h1>
          </div>
        </header>
  
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Stepper amélioré avec animation -->
          <div class="mb-8 relative">
            <div class="flex justify-between items-center">
              <div class="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
                <div class="h-1 bg-gray-200 rounded-full">
                  <div 
                    class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                    :style="{ width: `${(currentStep / (paymentSteps.length - 1)) * 100}%` }"
                  ></div>
                </div>
              </div>
              
              <template v-for="(step, index) in paymentSteps" :key="index">
                <div class="relative z-10 flex flex-col items-center group">
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg transform group-hover:scale-110"
                    :class="[
                      index <= currentStep 
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' 
                        : 'bg-white text-gray-500'
                    ]"
                  >
                    <span class="text-sm font-semibold">{{ index + 1 }}</span>
                  </div>
                  <span 
                    class="mt-3 text-sm font-medium hidden sm:block transition-all duration-300"
                    :class="index <= currentStep ? 'text-indigo-600' : 'text-gray-500'"
                  >
                    {{ step }}
                  </span>
                </div>
              </template>
            </div>
          </div>
  
          <!-- Content Card avec animations améliorées -->
          <div 
            class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl"
            :class="{'scale-100 opacity-100': !isLoading, 'scale-95 opacity-0': isLoading}"
          >
            <!-- Navigation buttons -->
            <div class="flex justify-between items-center p-4 border-b border-gray-100">
              <button
                v-if="currentStep > 0"
                @click="previousStep"
                class="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Retour</span>
              </button>
              <div class="text-sm font-medium text-gray-500">
                Étape {{ currentStep + 1 }}/{{ paymentSteps.length }}
              </div>
            </div>

            <TransitionGroup 
              name="slide-fade" 
              mode="out-in"
              class="relative"
            >
              <!-- Step 1: Montant -->
              <div 
                v-if="currentStep === 0" 
                key="step1" 
                class="p-6 sm:p-8 animate-fadeIn"
              >
                <h2 class="text-2xl font-semibold text-gray-900 mb-6">
                  Montant à payer
                </h2>
                
                <div class="space-y-6">
                  <div class="transform hover:scale-102 transition-transform duration-500">
                    <div class="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/50 hover:shadow-lg transition-all duration-300">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                          <img src="/images/logo/logo-adna.png" alt="Logo ADNA" class="h-8 w-8">
                        </div>
                        <div>
                          <h3 class="font-semibold text-gray-900">
                            {{ selectedService.name }}
                          </h3>
                          <p class="text-sm text-gray-600">
                            {{ selectedService.description }}
                          </p>
                        </div>
                      </div>
                      <div class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        {{ formatPrice(selectedService.amount) }} CFA
                      </div>
                    </div>
                  </div>
  
                  <button
                    @click="nextStep"
                    class="w-full py-4 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl"
                  >
                    Continuer
                  </button>
                </div>
              </div>
  
              <!-- Step 2: Méthode de paiement -->
              <div 
                v-if="currentStep === 1" 
                key="step2" 
                class="p-6 sm:p-8 animate-fadeIn"
              >
                <h2 class="text-2xl font-semibold text-gray-900 mb-6">
                  Choisissez votre méthode de paiement
                </h2>
  
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    v-for="method in paymentMethods"
                    :key="method.id"
                    @click="selectPaymentMethod(method)"
                    class="relative rounded-2xl border-2 p-6 cursor-pointer transform transition-all duration-500 hover:shadow-xl group"
                    :class="[
                      selectedPaymentMethod?.id === method.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    ]"
                  >
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <img
                          :src="method.icon"
                          :alt="method.name"
                          class="h-8 w-8 object-contain"
                        />
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">
                          {{ method.name }}
                        </p>
                        <p class="text-sm text-gray-600">
                          {{ method.description }}
                        </p>
                      </div>
                    </div>
                    
                    <div 
                      v-if="selectedPaymentMethod?.id === method.id"
                      class="absolute top-3 right-3 animate-bounce"
                    >
                      <div class="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="mt-8">
                  <button
                    @click="nextStep"
                    :disabled="!selectedPaymentMethod"
                    class="w-full py-4 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  >
                    Continuer
                  </button>
                </div>
              </div>
  
              <!-- Step 3: Confirmation -->
              <div 
                v-if="currentStep === 2" 
                key="step3" 
                class="p-6 sm:p-8 animate-fadeIn"
              >
                <h2 class="text-2xl font-semibold text-gray-900 mb-6">
                  Confirmez votre paiement
                </h2>
  
                <div class="space-y-6">
                  <div class="space-y-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Numéro {{ selectedPaymentMethod?.name }}
                    </label>
                    <div class="relative">
                      <input
                        type="tel"
                        v-model="phoneNumber"
                        class="w-full py-3 px-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        :class="{ 
                          'border-red-300': phoneNumber && !isPhoneNumberValid,
                          'border-green-300': phoneNumber && isPhoneNumberValid,
                          'border-gray-200': !phoneNumber
                        }"
                        placeholder="ex: 6XXXXXXXX"
                      />
                      <div 
                        v-if="phoneNumber && isPhoneNumberValid"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 animate-bounce"
                      >
                        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <p 
                      v-if="phoneNumber && !isPhoneNumberValid" 
                      class="text-sm text-red-500 mt-1 animate-shake"
                    >
                      Veuillez entrer un numéro de téléphone valide
                    </p>
                  </div>
  
                  <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 space-y-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Montant</span>
                      <span class="font-medium text-gray-900">{{ formatPrice(selectedService.amount) }} CFA</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Méthode</span>
                      <span class="font-medium text-gray-900">{{ selectedPaymentMethod?.name }}</span>
                    </div>
                  </div>
  
                  <button
                    @click="processPaiement"
                    :disabled="!isPhoneNumberValid"
                    class="w-full py-4 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  >
                    <span class="flex items-center justify-center space-x-2">
                      <span>Procéder au paiement</span>
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </main>
      </div>
  
      <!-- Modal de succès amélioré -->
      <TransitionRoot appear :show="showSuccessModal" as="template">
        <Dialog as="div" @close="closeSuccessModal" class="relative z-50">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>
  
        




          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-500 ease-out"
                enter-from="opacity-0 scale-95 rotate-3"
                enter-to="opacity-100 scale-100 rotate-0"
                leave="duration-300 ease-in"
                leave-from="opacity-100 scale-100 rotate-0"
                leave-to="opacity-0 scale-95 rotate-3"
              >
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 mb-6 animate-success">
                      <CheckIcon class="h-10 w-10 text-green-500" />
                    </div>
                    
                    <DialogTitle as="h3" class="text-2xl font-semibold text-gray-900 mb-2">
                      Paiement réussi !
                    </DialogTitle>
                    
                    <div class="mt-4">
                      <p class="text-sm text-gray-600">
                        Votre paiement a été traité avec succès. Le statut sera mis à jour dans les prochaines minutes.
                      </p>
                    </div>
  
                    <div class="mt-8 space-y-3">
                      <button
                        type="button"
                        class="w-full py-3 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                        @click="closeSuccessModal"
                      >
                        Accéder aux paiements
                      </button>
                      <button
                        type="button"
                        class="w-full py-3 px-6 text-gray-700 font-medium rounded-xl bg-gray-50 hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-300"
                        @click="startNewPayment"
                      >
                        Effectuer un nouveau paiement
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Loading Overlay -->
      <TransitionRoot appear :show="isLoading" as="template">
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      </TransitionRoot>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'

// State
const currentStep = ref(0)
const phoneNumber = ref('')
const showSuccessModal = ref(false)
const selectedPaymentMethod = ref(null)
const isLoading = ref(false)

// Constants
const paymentSteps = ['Montant', 'Paiement', 'Confirmation']

const selectedService = ref({
  name: 'Inscription au Congrès',
  description: 'Confirmation de participation',
  amount: 10000
})

const paymentMethods = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    description: 'Paiement via MTN MOMO',
    icon: '/mtn-logo.png'
  },
  {
    id: 'orange',
    name: 'Orange Money',
    description: 'Paiement via Orange Money',
    icon: '/orange-logo.png'
  }
]

// Computed
const isPhoneNumberValid = computed(() => {
  return phoneNumber.value.length === 9 && /^[6-9]\d{8}$/.test(phoneNumber.value)
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method
}

const nextStep = async () => {
  if (currentStep.value < paymentSteps.length - 1) {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    currentStep.value++
    isLoading.value = false
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    isLoading.value = true
    setTimeout(() => {
      currentStep.value--
      isLoading.value = false
    }, 300)
  }
}

const processPaiement = async () => {
  try {
    isLoading.value = true
    const response = await axios.post('/api/paiements', {
      montant: selectedService.value.amount,
      type_paiement: selectedPaymentMethod.value.id === 'mtn' ? 'MOMO' : 'OM',
      numero_telephone: phoneNumber.value,
      description: selectedService.value.name
    })

    if (response.data.success) {
      showSuccessModal.value = true
    }
  } catch (error) {
    console.error('Erreur lors du paiement:', error)
    // Add error handling here
  } finally {
    isLoading.value = false
  }
}

const startNewPayment = () => {
  closeSuccessModal()
  resetForm()
}

const resetForm = () => {
  currentStep.value = 0
  phoneNumber.value = ''
  selectedPaymentMethod.value = null
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>

<style>
/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Animation du succès */
@keyframes success {
  0% {
    transform: scale(0.8) rotate(-10deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}

.animate-success {
  animation: success 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Animation de flottement pour le header */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Animation du gradient */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

/* Animation de secousse pour les erreurs */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

/* Personnalisation du focus */
.focus-ring {
  @apply ring-2 ring-indigo-500 ring-offset-2 outline-none;
}

/* Styles pour les petits écrans */
@media (max-width: 640px) {
  .payment-grid {
    @apply grid-cols-1 gap-4;
  }
}
</style>
          