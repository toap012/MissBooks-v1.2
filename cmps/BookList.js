import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>
                    <section class="actions">
                        <button @click="onRemovebook(book.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onRemovebook(bookId) {
            this.$emit('remove', bookId)
        },
    },
    components: {
        BookPreview,
    }
}