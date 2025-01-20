<template>
  <div class="w-full transition-all duration-300 ease-in-out">
    <!-- Книги в каталоге -->
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <h2 class="text-2xl m-0 md:text-xl sm:text-lg xs:w-full xs:text-center">Книги в каталоге</h2>
      <div class="xs:w-full">
        <button 
          class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1C7D41] text-white rounded-lg transition-all duration-300 hover:bg-[#45a049] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed
                 sm:w-full sm:px-4 sm:py-2.5 sm:text-sm"
          @click="openModal"
        >
          <img src="../assets/img/file-plus.png" class="w-5 h-5 sm:w-4 sm:h-4" />
          <span>Добавить книгу</span>
        </button>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="isModalOpen" 
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] w-full h-screen transition-all duration-300 ease-in-out will-change-transform backface-hidden"
         @click="closeModal">
      <div 
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto shadow-[0_10px_25px_rgba(0,0,0,0.2)] z-[10000] transition-all duration-300 ease-in-out will-change-transform backface-hidden
               lg:w-[95%] lg:max-w-[450px]
               md:p-6 md:rounded-xl
               sm:p-5 sm:w-full sm:h-auto sm:max-h-[85vh]
               xs:p-4 xs:rounded-lg xs:max-h-[90vh]"
        @click.stop
      >
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-2xl mb-2 md:text-xl">Добавить книгу</h2>
            <p class="text-gray-600">Заполните все поля и добавьте книгу</p>
          </div>
          <img 
            src="../assets/img/x.png" 
            class="w-6 h-6 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300" 
            @click="closeModal" 
          />
        </div>

        <form @submit.prevent="submitForm" class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="title" class="text-sm font-medium">Название:</label>
            <input 
              type="text" 
              id="title" 
              v-model="title" 
              required
              class="w-full p-3 border border-gray-200 rounded-lg transition-all duration-300 appearance-none focus:outline-none focus:border-[#1C7D41] focus:ring-1 focus:ring-[#1C7D41] placeholder-gray-400
                     sm:p-3 sm:text-base xs:p-2.5 xs:text-sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="author" class="text-sm font-medium">Автор:</label>
            <input 
              type="text" 
              id="author" 
              v-model="author" 
              required
              class="w-full p-3 border border-gray-200 rounded-lg transition-all duration-300 appearance-none focus:outline-none focus:border-[#1C7D41] focus:ring-1 focus:ring-[#1C7D41] placeholder-gray-400
                     sm:p-3 sm:text-base xs:p-2.5 xs:text-sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="year" class="text-sm font-medium">Год:</label>
            <input 
              type="number" 
              id="year" 
              v-model="year" 
              :max="currentYear" 
              required
              class="w-full p-3 border border-gray-200 rounded-lg transition-all duration-300 appearance-none focus:outline-none focus:border-[#1C7D41] focus:ring-1 focus:ring-[#1C7D41] placeholder-gray-400
                     sm:p-3 sm:text-base xs:p-2.5 xs:text-sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="genre" class="text-sm font-medium">Жанр:</label>
            <input 
              type="text" 
              id="genre" 
              v-model="genre"
              class="w-full p-3 border border-gray-200 rounded-lg transition-all duration-300 appearance-none focus:outline-none focus:border-[#1C7D41] focus:ring-1 focus:ring-[#1C7D41] placeholder-gray-400
                     sm:p-3 sm:text-base xs:p-2.5 xs:text-sm"
            />
          </div>

          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="privacy" 
              v-model="agreeToPrivacy" 
              required
              class="w-4 h-4 text-[#1C7D41] border-gray-300 rounded focus:ring-[#1C7D41]"
            />
            <label for="privacy" class="text-sm">
              Я согласен с условиями конфиденциальности
            </label>
          </div>

          <div class="flex justify-end pt-4">
            <button 
              type="submit"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1C7D41] text-white rounded-lg transition-all duration-300 hover:bg-[#45a049] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed
                     sm:w-full sm:px-4 sm:py-2.5"
            >
              <img src="../assets/img/file-plus.png" class="w-5 h-5" />
              <span>Добавить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const store = useStore();
    const toast = useToast();
    const title = ref('');
    const author = ref('');
    const year = ref('');
    const genre = ref('');
    const agreeToPrivacy = ref(false);
    const currentYear = new Date().getFullYear();
    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      resetForm();
    };

    const resetForm = () => {
      title.value = '';
      author.value = '';
      year.value = '';
      genre.value = '';
      agreeToPrivacy.value = false;
    };

    const submitForm = () => {
      if (!title.value || !author.value || !year.value) {
        toast.error('Все обязательные поля должны быть заполнены!');
        return;
      }

      const newBook = {
        id: Date.now(),
        title: title.value,
        author: author.value,
        year: year.value,
        genre: genre.value,
      };

      store.dispatch('addBook', newBook);
      toast.success('Книга успешно добавлена!');
      closeModal();
    };

    return {
      title,
      author,
      year,
      genre,
      agreeToPrivacy,
      currentYear,
      isModalOpen,
      openModal,
      closeModal,
      submitForm,
    };
  },
};
</script>

<style scoped>

@import '../input.css';
@import '../output.css';

</style>

