import { bookService } from '../services/book.service.js'

export default {
    template: `
      <section class="add-book-form">

            <fieldset>
                <legend>Book title</legend>
                <input v-model="book.title" placeholder="Book title" />
            </fieldset>
            <fieldset>
                <legend>Book description</legend>
                <input v-model="book.description" placeholder="Book description" />
            </fieldset>
            <fieldset>
                <legend>Book price</legend>
                <input type="number" v-model="book.listPrice.amount" placeholder="Book price" />
            </fieldset>
            <fieldset>
                <legend>Book on sale?</legend>
                <input type="radio" value="true" v-model="book.listPrice.isOnSale" /> Yes!
                <input type="radio" value="false" v-model="book.listPrice.isOnSale" /> No...
            </fieldset>
            <button type="submit" :disabled="!isValid" @click="addBook">Add Book</button> 
        
        </section>
        `,
    data() {
        return {
            book: null
        }
    },

    // id: '',
    //     title,
    //     description,
    //     thumbnail: `img/book${utilService.getRandomIntInclusive(1, 4)}.jpg`,
    //     listPrice: {
    //         amount: utilService.getRandomIntInclusive(1, 500),
    //         currencyCode: "EUR",
    //         isOnSale: false
    created() {
        this.book = bookService.getEmptyBook()
    },
    methods:{
        addBook(){
            this.$emit('addBook', this.book)
        }
    },
    computed: {
        isValid(){
            return !!this.book.title.length
        }
    }
}
