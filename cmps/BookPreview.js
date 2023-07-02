export default {
    props: ['book'],
    template: `
    <article class="book-preview">
            <h3>{{book.title}}</h3>
            <h1>{{book.description}}</h1>
    </article>
    `,
}