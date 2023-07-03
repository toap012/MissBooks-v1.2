import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {
    template: `
<form @submit.prevent="addBook" class="car-edit">

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
        <input type="number" v-model.number="book.listPrice.amount" placeholder="Book price" />
    </fieldset>
    <fieldset>
        <legend>Book on sale?</legend>
        <input type="radio" value="true" v-model="book.listPrice.isOnSale" /> Yes!
        <input type="radio" value="false" v-model="book.listPrice.isOnSale" /> No...
    </fieldset>
    <RouterLink to="/book">Cancel</RouterLink> 
    <button :disabled="!isValid">Add Book</button> 
</form>   
        `,
    data() {
        return {
            book: bookService.getEmptyBook()
        }
    },
    created() {
        const { book } = this.$route.params
        if (!book) return
        carService.get(book)
            .then(book => {
                this.book = book
            })
            .catch(err => {
                showErrorMsg('Cannot load book for edit')
                this.$router.push('/book')
            })
    },
    methods: {
        addBook() {
                bookService.save(this.book)
                    .then(savedBook => {
                        console.log('Saved Book', savedBook)
                        showSuccessMsg('Book saved')
                        this.$router.push('/book')
                    })
                    .catch(err => {
                        showErrorMsg('Cannot save Book')
                    })
            
        }
    },
    computed: {
        isValid() {
            return this.book.title.length > 0
        }
    }
}
