import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import ReviewList from '../cmps/ReviewList.js'
import AddReview from '../cmps/AddReview.js'
import LongText from '../cmps/LongText.js'

export default {
    template: `
    <section v-if="book">
        <RouterLink :to="'/book/' + book.nextBookId">Next Book</RouterLink> |
        <RouterLink :to="'/book/' + book.prevBookId">Prev Book</RouterLink> |
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <LongText :text="book.description"></LongText>
            <h2> {{book.pageCount}} Pages- <span> {{pageCountMsg}}</span></h2>
            <h2> {{book.publishedDate}} <span>{{publishedDateMsg}}</span></h2>
            <img :src="book.thumbnail" alt="book">
            <h2 v-if="book.listPrice.isOnSale" class="green">ON SALE!</h2>
            <h2 :class="colorClass">Price: {{getPrice}}</h2>
        </section>
        <section class="reviews">
        <h1>Book reviews:</h1>
            <ReviewList :reviews="book.reviews" @remove="removeReview" v-if="book.reviews"/>
            <AddReview @add="addReview"/>
        </section>
        <RouterLink class="route" to="/book">Back to List</RouterLink>
    </section>
    `,
    data() {
        return {
            book: null
        }
    },
    created() {
        this.loadBook()
    },
    methods: {
        loadBook() {
            const { bookId } = this.$route.params
            bookService.get(bookId)
                .then(book => {
                    this.book = book
                })
                .catch(err => {
                    alert('Cannot load book')
                    this.$router.push('/book')
                })
        },
        addReview(review) {
            if (!this.book.reviews) {
                this.book.reviews = []
            }
            this.book.reviews.push(review)

            bookService.addReview(this.book.id, review)
                .then(book => {
                    console.log('Saved review', book)
                    showSuccessMsg('Review saved')
                })
                .catch(err => {
                    showErrorMsg('Cannot save Review')
                })
        },
        removeReview(reviewId) {
            const idx = this.book.reviews.findIndex(review => review.id === reviewId)
            this.book.reviews.splice(idx, 1)

            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    console.log('Removed review', book)
                    showSuccessMsg('Review removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove Review')
                })
        }

    },
    watch: {
        bookId() {
            this.loadBook()
        }
    },
    computed: {
        bookId() {
            return this.$route.params.bookId
        },
        pageCountMsg() {
            const bookLength = this.book.pageCount
            if (bookLength > 500) return 'Long reading'
            else if (bookLength > 200) return 'Decent Reading'
            else if (bookLength < 100) return 'Light Reading'
        },
        publishedDateMsg() {
            const publishedDate = this.book.publishedDate
            const currYear = new Date().getFullYear()
            const diff = currYear - publishedDate
            if (diff > 10) return 'Vintage'
            else if (diff < 1) return 'New!'
        },
        colorClass() {
            const price = this.book.listPrice.amount
            if (price > 150) return 'red'
            else if (price < 20) return 'green'
            else return ''
        },
        getPrice() {
            const {
                listPrice: { currencyCode, amount },
                language,
            } = this.book
            return new Intl.NumberFormat(language, {
                style: 'currency',
                currency: currencyCode,
            }).format(amount)
        },
        currency() {
            let curr = ''
            const type = this.book.listPrice.currencyCode

            new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
            }).format(number)

            // check for shorter way maybe intl func
            switch (type) {
                case 'EUR':
                    curr = '€'
                    break
                case 'USD':
                    curr = '$'
                    break
                case 'ILS':
                    curr = '₪'
                    break
                default:
                    curr = '$'
            }
            return curr
        },
    },
    components: {
        AddReview,
        ReviewList,
        LongText,
    }
}