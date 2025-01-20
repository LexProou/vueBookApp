import { createStore } from 'vuex';

export default createStore({
  state: {
    books: JSON.parse(localStorage.getItem('books')) || [],
  },
  mutations: {
    addBook(state, book) {
      // Генерируем уникальный ID для новой книги, если его нет
      const newBook = { ...book, id: book.id || Date.now() }; // Генерируем ID, если его нет
      state.books.push(newBook);
      localStorage.setItem('books', JSON.stringify(state.books)); 
    },
    updateBook(state, updatedBook) {
      const index = state.books.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        state.books[index] = updatedBook;
        localStorage.setItem('books', JSON.stringify(state.books));
      }
    },
    deleteBook(state, bookId) {
      state.books = state.books.filter(book => book.id !== bookId);
      localStorage.setItem('books', JSON.stringify(state.books));
    },
    sortBooks(state, criteria) {
      state.books.sort((a, b) => {
        if (a[criteria] < b[criteria]) return -1;
        if (a[criteria] > b[criteria]) return 1;
        return 0;
      });
    },
  },
  
  
  actions: {
    addBook({ commit }, book) {
      commit('addBook', book);
    },
    updateBook({ commit }, book) {
      commit('updateBook', book);
    },
    deleteBook({ commit }, bookId) {
      commit('deleteBook', bookId);
    },
    sortBooks({ commit }, criteria) {
      commit('sortBooks', criteria);
    },
  },
  getters: {
    filteredBooks: (state) => (searchTerm) => {
      return state.books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },

  }
});
