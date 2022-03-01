import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="book-preview-container" >
                   <book-preview :book="book" />
                   <div class="actions">
                       <!-- <button class="details-btn" @click="select(book)">Details</button> -->
                       <router-link :to="'/book/'+book.id">Details</router-link>
                   </div>
                </li>
            </ul>
        </section>
    `,
    components:{
        bookPreview
    },
    methods: {
        // remove(id) {
        //     this.$emit('remove', id);
        // },
        select(book) {
            console.log('book:',book)
            this.$emit('selected', book);
        }
    },
    computed: {}
}