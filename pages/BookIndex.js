import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import BookList from '../cmps/BookList.js'
import BookFilter from '../cmps/BookFilter.js'

export default {
    template: `
        <section class="book-index">
            <h2>Book index page</h2>
            <RouterLink to="/book/edit">Add Book</RouterLink> 
        
            <BookFilter @filter="setFilterBy"/>
            <BookList
                v-if="books"
                :books="filteredBooks"
                @remove="removeBook"/>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    showSuccessMsg('Book removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove Book')
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },

    },
    computed: {
        filteredBooks() {
            //filter validaition
            if (!this.filterBy) return this.books

            //filtering
            let filteredBooks = this.books

            if (this.filterBy.txt) {
                const regex = new RegExp(this.filterBy.txt, 'i')
                filteredBooks = filteredBooks.filter(book => regex.test(book.title))
            }

            if (this.filterBy.price) {
                filteredBooks = filteredBooks.filter(book => book.listPrice.amount <= this.filterBy.price)
            }

            return filteredBooks
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookList,
        BookFilter,
    }

}