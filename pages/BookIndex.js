import { bookService } from '../services/book.service.js'

import BookList from '../cmps/BookList.js'

export default {
    template: `
        <section class="book-index">
            <h2>Book index page</h2>
            <BookList
             :books="books"
             @remove="removeBook"
            />

        </section>
    `,
    data() {
        return {
            books: null,
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id = bookId)
                    this.books.splice(idx, 1)
                })
        }

    },
    computed: {

    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookList,
    }

}