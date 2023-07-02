export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.txt" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="search">
            <label for="Price">Max Price:</label>
            <input
                v-model="filterBy.price"
                @input="onSetFilterBy"
                type="number">
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                price: 200,
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    }
}

