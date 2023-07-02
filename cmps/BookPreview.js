export default {
    props: ['book'],
    template: `
    <article class="book-preview">
            <h3>{{book.title}}</h3>
            <h1>{{book.description}}</h1>
            <h3>Price:{{book.listPrice.amount}}</h3>
    </article>
    `,
}