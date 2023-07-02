import { bookService } from '../services/book.service.js'

import BookList from '../cmps/BookList.js'
import BookDetails from '../cmps/BookDetails.js'
import BookFilter from '../cmps/BookFilter.js'

export default {
    template: `
        <section class="book-index">
            <h2>Book index page</h2>
            <BookFilter @filter="setFilterBy"/>
            <BookList
            v-if="books"
            :books="filteredBooks"
            @remove="removeBook"
            @select="selectBook"
            />
            <BookDetails
            v-if="selectedBook"
            :book ="selectedBook"
            @close="selectedBook=null"

            />

        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},

        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        selectBook(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }

    },
    computed: {
        filteredBooks() {
            let filteredBooks = this.books
            const regex = new RegExp(this.filterBy.txt, 'i')
            filteredBooks = filteredBooks.filter(book => regex.test(book.title))

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
        BookDetails,
        BookFilter,
    }

}