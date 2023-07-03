import { bookService } from '../services/book.service.js'

export default {
    template: `
        <section class="book-details" v-if="book">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.description }}</h3>
            <img :src="book.thumbnail" alt="book">
            <h3>Price: {{ book.listPrice.amount }}$</h3>
            <RouterLink to="/book">Back to List</RouterLink>
        </section>
    `,
    data() {
        return {
            book: null
        }
    },
    created() {
        const {bookId} = this.$route.params
        bookService.get(bookId)
            .then(book => {
                this.book = book
            })
            .catch(err => {
                alert('Cannot load book')
                this.$router.push('/book')
            })
    },
    methods: {
        
    },
}