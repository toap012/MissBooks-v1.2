export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.description }}</h3>
            <img :src="book.thumbnail" alt="book">
            <h3>Price: {{ book.listPrice.amount }}$</h3>
            <button @click="onClose">close</button>
        </section>
    `,
    methods: {
        onClose() {
            this.$emit('close')
        }
    },
}