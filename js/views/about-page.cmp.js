import { eventBus } from '../services/eventBus-service.js'

export default {
    template: `
    <section class="home-page app-main">
        <h3>About</h3>
        <!-- <button @click="callBus">Call the bus</button> -->
    </section>
    `
    ,
    methods: {
        callBus() {
            console.log('Calling bus!');
            eventBus.emit('test', 'test data')
        }
    }
}