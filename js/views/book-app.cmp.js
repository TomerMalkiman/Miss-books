import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/eventBus-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
// import bookEdit from './car-edit.cmp.js';

export default {
    template: `
    <book-filter @filtered="setFilter"></book-filter>
        <section class="book-app">
            <!-- <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook = null" ></book-details>  -->
            <!-- <book-list v-else :books="booksToShow" @selected="selectBook"></book-list> -->
            <book-list v-else :books="booksToShow" ></book-list>
            
        </section>
    `
        ,
    components: {
        bookFilter,
        bookList,
        // bookDetails,
    //     bookEdit,
    },
    data() {
        return {
            books: null,
            // selectedBook: null,
            filterBy: null
        };
    },
    created(){
        bookService.query()
            .then(books=> this.books = books);
    },
    methods: {
        // selectBook(book) {
        //     console.log(book)
        //     this.selectedBook = book;
        // },
        setFilter(filterBy) {
            this.filterBy = filterBy;
            console.log(this.filterBy)
        }
        
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            var books = this.books
            if (this.filterBy.fromPrice) {
              books = books.filter((book) => book.listPrice.amount >= this.filterBy.fromPrice)
            }
            if (this.filterBy.toPrice) {
              books = books.filter((book) => book.listPrice.amount <= this.filterBy.toPrice)
            }
            if (this.filterBy.byName) {
              let regex = new RegExp(this.filterBy.byName, 'i')
              books = books.filter((book) => {
                if (regex.test(book.name)) return book
                if (regex.test(book.title)) return book
              })
            }
            return books
        }
    },
};
