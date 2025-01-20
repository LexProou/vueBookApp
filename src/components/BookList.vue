<template>
  <div class="container mx-auto transition-all duration-300 ease-in-out">
    <div class="flex flex-row justify-between items-center gap-4 my-6 sm:flex-row">
      <h2 class="text-2xl font-bold">Книги в каталоге {{ filteredBooks.length }}</h2>
      <button 
        class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium bg-[#1C7D41] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed sm:px-4 sm:py-2.5 sm:text-sm"
        @click="openAddModal"
      >
        <img src="../assets/img/file-plus.png" class="w-5 h-5" />
        <span>Добавить книгу</span>
      </button>
    </div>
    <select 
        v-model="sortCriteria" 
        @change="sortBooks"
        class="w-auto min-w-[200px] border border-[#E6E8EC] rounded-lg p-3 cursor-pointer transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:w-1/4"
      >
        <option value="title">По названию</option>
        <option value="year">По году</option>
        <option value="author">По автору</option>
      </select>
    <ul class="mt-6">
      <li 
        v-for="book in filteredBooks" 
        :key="book.id" 
        class="bg-[#F5F6F6] rounded-2xl p-6 flex flex-row gap-4 mb-4 transition-all hover:scale-51 duration-300 shadow-sm hover:shadow-md md:flex-col md:p-5 md:rounded-xl sm:p-4 sm:rounded-lg xs:p-3.5 xs:rounded"
      >
      <div class="flex gap-3 items-center md:justify-end">       
        <div class="flex-1 flex flex-col gap-2">
          <div class="text-lg font-medium sm:text-base">{{ book.title }}</div>
          <div class="flex flex-wrap gap-4 text-[#2c3e50]/70 text-[0.9375rem] sm:gap-3 sm:text-sm">
            <div>{{ book.author }}</div>
            <div>{{ book.year }}</div>
            <div>{{ book.genre || 'Не указан' }}</div>
          </div>
        </div>
        <img 
            src="../assets/img/file-edit.png" 
            class="w-6 h-6 mb-6 cursor-pointer transition-all duration-300 hover:scale-110 sm:w-5 sm:h-5" 
            @click="openEditModal(book)" 
          />
      </div>

      
      </li>
    </ul>

    <!-- Модальное окно для редактирования -->
    <div v-if="isEditModalOpen" 
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300"
         @click="closeModals">
      <div 
        class="bg-white rounded-2xl p-8 w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto shadow-xl relative md:p-6 sm:p-5 sm:rounded-xl xs:p-4 xs:rounded-lg"
        @click.stop
      >
        <div class="mb-6">
          <h2 class="text-2xl mb-2 md:text-xl">Редактирование</h2>
          <p class="text-[#2c3e50]/70">Внесите изменение в карточке</p>
        </div>

        <form @submit.prevent="submitEditForm" class="flex flex-col gap-5">
          <!-- Форма --> 
          <div class="flex flex-col gap-2">
            <label for="edit-title" class="text-sm font-medium">Название:</label>
            <input 
              type="text" 
              id="edit-title" 
              v-model="editBook.title" 
              required
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-author" class="text-sm font-medium">Автор:</label>
            <input 
              type="text" 
              id="edit-author" 
              v-model="editBook.author" 
              required
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-year" class="text-sm font-medium">Год:</label>
            <input 
              type="number" 
              id="edit-year" 
              v-model="editBook.year" 
              :max="currentYear" 
              required
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-genre" class="text-sm font-medium">Жанр:</label>
            <input 
              type="text" 
              id="edit-genre" 
              v-model="editBook.genre"
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>

          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="editBook.agreeToPrivacy" 
              required
              class="w-4 h-4 text-[#1C7D41] border-gray-300 rounded focus:ring-[#1C7D41]"
            />
            <label class="text-sm">Я согласен с условиями конфиденциальности</label>
          </div>

          <div class="flex items-center justify-end gap-4 mt-4 sm:flex-row">
            <button 
              type="submit"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1C7D41] text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-1/3 sm:px-4 sm:py-2.5"
            >
              <img src="../assets/img/file-check-2.png" class="w-5 h-5" />
              <span>Сохранить</span>
            </button>
            <img 
              src="../assets/img/Default.png" 
              class="w-10 h-10 cursor-pointer rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:color-[#fc0505] hover:bg-[#fc0505]/90 sm:w-10"
              @click="openDeleteConfirmation(editBook)" 
            />
          </div>
        </form>
      </div>
    </div>

    <!-- Модальное окно для подтверждения удаления -->
    <div v-if="isDeleteConfirmationOpen" 
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300"
         @click="closeModals">
      <div 
        class="bg-white rounded-2xl p-8 w-[90%] max-w-[500px] shadow-xl md:p-6 sm:p-5 sm:rounded-xl xs:p-4 xs:rounded-lg"
        @click.stop
      >
        <h2 class="text-2xl mb-6 md:text-xl">Вы уверены, что хотите удалить эту книгу?</h2>
        <div class="flex justify-end gap-4">
          <button 
            class="px-5 py-3 bg-red-600 text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-red-700 sm:px-4 sm:py-2.5"
            @click="deleteBook(deleteBookId)"
          >
            Да, удалить
          </button>
          <button 
            class="px-5 py-3 bg-[#F5F6F6] text-[#2c3e50] rounded-lg border border-[#E6E8EC] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#F5F6F6]/90 sm:px-4 sm:py-2.5"
            @click="closeModals"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно для добавления -->
    <div v-if="isAddModalOpen" 
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300"
         @click="closeModals">
      <div 
        class="bg-white rounded-2xl p-8 w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto shadow-xl relative md:p-6 sm:p-5 sm:rounded-xl xs:p-4 xs:rounded-lg"
        @click.stop
      >
        <div class="mb-6">
          <h2 class="text-2xl mb-2 md:text-xl">Добавление книги</h2>
          <p class="text-[#2c3e50]/70">Заполните данные новой книги</p>
        </div>

        <form @submit.prevent="submitAddForm" class="flex flex-col gap-5">
          <!-- Форма -->
          <div class="flex flex-col gap-2">
            <label for="add-title" class="text-sm font-medium">Название:</label>
            <input 
              type="text" 
              id="add-title" 
              v-model="newBook.title" 
              required
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="add-author" class="text-sm font-medium">Автор:</label>
            <input 
              type="text" 
              id="add-author" 
              v-model="newBook.author" 
              required
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="add-year" class="text-sm font-medium">Год:</label>
            <input 
              type="number" 
              id="add-year" 
              v-model="newBook.year" 
              :max="currentYear" 
              required
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="add-genre" class="text-sm font-medium">Жанр:</label>
            <input 
              type="text" 
              id="add-genre" 
              v-model="newBook.genre"
              class="w-full p-3 border border-[#E6E8EC] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] sm:p-2.5 sm:text-sm"
            />
          </div>

          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="newBook.agreeToPrivacy" 
              required
              class="w-4 h-4 text-[#1C7D41] border-gray-300 rounded focus:ring-[#1C7D41]"
            />
            <label class="text-sm">Я согласен с условиями конфиденциальности</label>
          </div>

          <div class="flex items-center justify-end gap-4 mt-4 sm:flex-row">
            <button 
              type="submit"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1C7D41] text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-full sm:px-4 sm:py-2.5"
            >
              <img src="../assets/img/file-check-2.png" class="w-5 h-5" />
              <span>Сохранить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  components: {},
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const toast = useToast(); 
    const sortCriteria = ref('title');
    const currentYear = new Date().getFullYear();
    const isEditModalOpen = ref(false);
    const isDeleteConfirmationOpen = ref(false);
    const editBook = ref(null);
    const deleteBookId = ref(null);
    const isAddModalOpen = ref(false);

    // Добавления новой книги
    const newBook = ref({
      title: '',
      author: '',
      year: '',
      genre: '',
      agreeToPrivacy: false,
    });

   

    // Фильтр
    const filteredBooks = computed(() => {
      return store.getters.filteredBooks(props.searchTerm.toLowerCase());
    });

    const openEditModal = (book) => {
      editBook.value = { ...book };
      isEditModalOpen.value = true;
    };

    // Закрытие модальных окон
    const closeModals = () => {
      isEditModalOpen.value = false;
      isDeleteConfirmationOpen.value = false;
      isAddModalOpen.value = false;
      editBook.value = null;
    };

    const submitEditForm = () => {
      if (!editBook.value.agreeToPrivacy) {
        toast('Вы должны согласиться с условиями конфиденциальности', { type: 'warning' });
        return;
      }
      store.dispatch('updateBook', editBook.value);
      closeModals();
      showNotification('Книга обновлена', 'success');
    };

    const openAddModal = () => {
      newBook.value = {
        title: '',
        author: '',
        year: '',
        genre: '',
        agreeToPrivacy: false,
      };
      isAddModalOpen.value = true;
    };

    // Отправка формы добавления
    const submitAddForm = () => {
      if (!newBook.value.agreeToPrivacy) {
        toast('Вы должны согласиться с условиями конфиденциальности', { type: 'warning' });
        return;
      }
      store.dispatch('addBook', newBook.value);
      closeModals();
      showNotification('Книга добавлена', 'success');
    };

    const openDeleteConfirmation = (book) => {
      deleteBookId.value = book.id; 
      isDeleteConfirmationOpen.value = true; 
    };


    // Удаление книги
    const deleteBook = (bookId) => {
      store.dispatch('deleteBook', bookId);
      closeModals();
      showNotification('Книга удалена', 'error');
    };

    // Сортировка
    const sortBooks = () => {
      store.dispatch('sortBooks', sortCriteria.value); 
    };

    // Показать уведомление
    const showNotification = (message, type) => {
      toast(message, {
        type: type,
        position: 'top-right',
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        progress: undefined,
      });
    };

    return {
      searchTerm: props.searchTerm, 
      sortCriteria,
      currentYear,
      filteredBooks,
      openEditModal,
      closeModals,
      submitEditForm,
      openAddModal,
      isAddModalOpen,
      submitAddForm,
      openDeleteConfirmation,
      deleteBook,
      sortBooks,
      isEditModalOpen,
      isDeleteConfirmationOpen,
      editBook,
      deleteBookId,
      newBook,
      showNotification,
    };
  },
};
</script>

<style scoped>
@import '../input.css';
@import '../output.css';
</style>