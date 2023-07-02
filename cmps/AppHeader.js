export default {
    template: `
        <header class="app-header">
            <h1>Books</h1>
            <nav class="nav-links-container flex">
                <a href="#" @click="setRoute('home')" class="nav-item">Home</a>
                <a href="#" @click="setRoute('books')" class="nav-item">Books</a>
                <a href="#" @click="setRoute('about')" class="nav-item">About</a>
            </nav>
        </header>
    `,
    methods: {
        setRoute(route) {
            this.$emit('change-route', route)
        }
    }
}