import { bookService } from '../services/book.service.js'

export default {
    template: `
    <h1>Add your review here:</h1>
       <form @submit.prevent="addReview" class="add-review">
       <fieldset>
           <legend>Fullname</legend>
           <input type="text" placeholder="fullname" v-model="review.fullname"/>
       </fieldset>
        <fieldset>
        <legend>Rating</legend>
        <select name="rating" id="rating" v-model.number="review.rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        </fieldset>
        <fieldset>
        <legend>Read date</legend>
        <input type="date" v-model="review.readAt"/>
        </fieldset>
        <button>Submit</button>
       </form>
    `,
    data() {
        return {
            review: bookService.getEmptyReview()
        }
    },
    methods: {
        addReview() {
            this.$emit('add', this.review)
        }
    },
}