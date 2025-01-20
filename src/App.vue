<template>
  <div id="app" class="font-sans text-[#2c3e50] min-h-screen bg-[#0F172A] p-4">
    <div class="container mx-auto max-w-[1200px] w-4/5 flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl p-8 transition-all duration-300 ease-in-out
                lg:p-7 
                md:p-6 md:rounded-2xl
                sm:p-5 sm:w-[95%] sm:rounded-xl
                xs:p-3 xs:rounded-lg"
                >
      
      <header class="w-full transition-all duration-300 flex flex-col gap-4 bg-[#F5F6F6] p-8 rounded-2xl shadow-md
                     lg:p-7 lg:gap-5
                     md:p-6 md:gap-4 md:rounded-xl md:mb-6
                     sm:p-5 sm:gap-3.5 sm:rounded-lg sm:mb-5 sm:shadow
                     xs:p-3 xs:gap-2 xs:mb-3"
                     >
        <SearchInput v-model="searchTerm" />
        
      </header>

      <BookList :searchTerm="searchTerm" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AddBookForm from './components/AddBookForm.vue';
import BookList from './components/BookList.vue';
import SearchInput from './components/SearchInput.vue';

export default {
  components: {
    AddBookForm,
    BookList,
    SearchInput
  },
  setup() {
    const searchTerm = ref('');

    return {
      searchTerm
    };
  }
};
</script>

<style>

@import './input.css';
@import './output.css';

</style>
