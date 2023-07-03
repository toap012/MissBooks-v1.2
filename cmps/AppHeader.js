export default {
    template: `
        <header class="app-header">
            <h1>BooksApp</h1>
            <nav class="nav-links-container flex">
                <RouterLink to="/" class="nav-item">Home</RouterLink> 
                <RouterLink to="/book" class="nav-item">Books</RouterLink> 
                <RouterLink to="/about" class="nav-item">About</RouterLink> 
            </nav>
        </header>
    `,
}