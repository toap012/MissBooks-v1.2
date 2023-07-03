import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import ReviewList from '../cmps/ReviewList.js'
import AddReview from '../cmps/AddReview.js'

export default {
    template: `
        <section class="book-details" v-if="book">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.description }}</h3>
            <img :src="book.thumbnail" alt="book">
            <h3>Price: {{ book.listPrice.amount }}$</h3>
            <ReviewList :reviews="book.reviews" @remove="removeReview" v-if="book.reviews"/>
            <AddReview @add="addReview"/>
            <RouterLink to="/book">Back to List</RouterLink>
        </section>
    `,
    data() {
        return {
            book: null
        }
    },
    created() {
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
    methods: {
        addReview(review) {
            console.log(review);
            console.log(this.book.id);
            console.log(this.book.review);
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
    components: {
        AddReview,
        ReviewList
    }
}