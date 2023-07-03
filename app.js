const {createApp} = Vue

import {router} from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'



const options={
    template: `
    <div>
        <AppHeader/>
        <section class="main-route">
            <RouterView/>
        </section>
        <AppFooter />
    </div>
    `,
        data() {
            return {}
        },
        components: {
            AppHeader,
            AppFooter,
        }
}

const app = createApp(options)
app.use(router)
app.mount('#app')