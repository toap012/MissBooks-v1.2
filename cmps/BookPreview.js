export default {
    props: ['book'],
    template: `
    <article class="book-preview">
            <h3>{{book.title}}</h3>
            <img :src="book.thumbnail" alt="bookImg" />
            <h3>Price:{{book.listPrice.amount}}</h3>
            <RouterLink :to="'/book/' + book.id">Details</RouterLink> |
            <RouterLink :to="'/book/edit/' + book.id">Edit</RouterLink>
    </article>
    `,
}