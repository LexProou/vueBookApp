<template>
  <div class="w-full mb-4 transition-all duration-300 ease-in-out">
    <div class="flex flex-row items-center justify-between relative w-full gap-3">
      <img src="../assets/img/Frame.png" class="w-8 h-8 md:w-7 md:h-7" />
      <input
        :value="modelValue"
        @input="updateSearchTerm"
        type="text"
        placeholder="Найти ту самую книгу"
        class="w-full h-12 lg:h-11 md:h-10 sm:h-9 xs:h-8 border border-[#E6E8EC] rounded-lg text-base bg-white transition-all duration-300 ease-in-out appearance-none focus:outline-none focus:border-[#1C7D41] focus:shadow-[0_0_0_2px_rgba(28,125,65,0.1)] placeholder-[rgba(44,62,80,0.5)] sm:p-3 sm:text-sm xs:p-2.5"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateSearchTerm(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped>
@import '../input.css';
@import '../output.css';
 
</style>