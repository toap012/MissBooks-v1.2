
export default {
    props: ['reviews'],
    template: `

<section class="book-reviews">
<ul class="review-list">
    <li v-for="review in reviews" :key="review.id">
        <h1>{{review.fullname}}</h1>
        <h5>read at: {{review.readAt}}</h5>
        <h3>rated:{{review.rate}}</h3>
        <section class="actions">
            <button @click="onRemoveReview(review.id)">x</button>
        </section>
    </li>
</ul>
</section>
`,
    methods: {
        onRemoveReview(reviewId) {
            this.$emit('remove', reviewId)
        }
    }
}