import { bookService } from '../services/book.service.js'

import BookList from '../cmps/BookList.js'
import BookDetails from '../cmps/BookDetails.js'
import BookFilter from '../cmps/BookFilter.js'
import AddBookForm from '../cmps/AddBookForm.js'

export default {
    template: `
        <section class="book-index">
            <h2>Book index page</h2>
            <button @click="isForm=true">Add Book</button>
            <AddBookForm
            v-if="isForm"
            @addBook="addBook"/>
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
            @close="selectedBook=null"/>
        </section>
    `,
    data() {
        return {
            isForm: false,

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
        },
        addBook(book) {
            bookService.save(book)
                .then(savedBook => this.books.push(savedBook))
            this.isForm = false
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
        AddBookForm,
    }

}