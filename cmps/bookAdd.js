import { googleBookService } from '../services/googleBook.service.js'


export default {
    template: `
    <form @submit.prevent="searchBook" class="book-add">
        <label htmlFor="addBook">Search for a book</label>
        <input type="text" name="addBook" id="addBook" placeholder="Search Book" v-model="txt" />
        <button>Search</button>
    </form>
       <ul v-if="apiBooks">
        <li v-for="book in apiBooks" :key="book.id">
            {{book.title}} 
            <button @click="addBook(book)">+</button>
        </li>
       </ul>
    `,

    data() {
        return {
            txt: '',
            apiBooks: null
        }
    },

    methods: {
        searchBook() {
            console.log('searching...', this.txt);
            googleBookService.query(this.txt)
                .then(books => this.apiBooks = books)
        },

        addBook(book) {
            this.$emit('addSearchedBook', book)
        },

    }
}