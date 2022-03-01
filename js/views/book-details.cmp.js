import bookText from '../cmps/book-text.cmp.js';
import { bookService } from '../services/book-service.js';
import reviewAdd from '../cmps/review-add.cmp.js';

export default {
    // props: ['book'],
    template: `
        <section class="book-details" v-if="book">
           
            <h2>Book details:</h2>

            <section class="details-container">

            <section class="book-page">

            <img :src="bookImgUrl">

            <section class="book-info">

            <p><span class="detail-title">Book :</span>  {{book.title}}</p>

            <p><span class="detail-title">Price : </span>
                <span :class="PriceLevel" > {{book.listPrice.amount}} {{getCurrencySign}} </span>
                <span class="sale" v-if="book.listPrice.isOnSale"> In Sale!</span>
            </p> 
            
           
            <p><span class="detail-title">Author :</span>  {{getAuthors}}</p>

            <p><span class="detail-title">Page amount :</span>  {{book.pageCount}} <span> -{{pageCount}}</span> </p>

            <p><span class="detail-title">Published at :</span>  {{book.publishedDate}}-{{publishedDate}} </p>

            <book-text :txt="book.description"></book-text>

            <p><span class="detail-title">Language :</span>  {{getLanguage}}</p> 

            <p><span class="detail-title">Categories :</span>  {{getCategories}}</p>

            </section>

            </section>

            <hr>

            <review-add @delete-review="deleteReview()" @book-update="updateBook" :bookId="book.id" :reviews="book.reviews"></review-add>

            <router-link to="/book">Back to books</router-link>
            <!-- <button class="close-btn" @click="$emit('close')">X</button> -->
            </section>
        </section>
    `,
    data(){
        return{
            book: null
        }
    },
    methods:{
        updateBook(book){
            this.book = book;
        },
        deleteReview(reviewIdx){
            bookService.deleteReview(this.book.id, reviewIdx)
            .then(newBook => this.updateBook(newBook))
        }

    },
    created(){
        console.log(this.$route);
        const id = this.$route.params.bookId;
        bookService.get(id)
            .then(book=> this.book = book)
    },
  
    components: {
        bookText,
        reviewAdd
    },
    computed: {
        bookImgUrl() {
            return this.book.thumbnail;
        },
        getCategories() {
            var categories = this.book.categories.join(' | ');
            return categories;
        },
        getAuthors() {
            var authors = this.book.authors.join(' | ');
            return authors;
        },
        pageCount() {
            const pageCount = this.book.pageCount
            if (pageCount > 500) return 'Long reading'
            if (pageCount > 200) return 'Decent reading'
            if (pageCount < 100) return 'light reading'
          },
          publishedDate() {
            const publishDiff = new Date().getFullYear() - (+this.book.publishedDate) 
            console.log(publishDiff)
            if (publishDiff > 10) return 'Veteran Book'
            if (publishDiff < 1) return 'New!'
          },
          PriceLevel() {
            const price = this.book.listPrice.amount
            if (price > 150) return 'expensive-book'
            if (price < 20) return 'cheap-book'
          },
        getLanguage() {
            const language = this.book.language;
            var bookLanguage;
            switch (language) {
                case 'sp':
                    bookLanguage = 'Spanish';
                    break;
                case 'en':
                    bookLanguage = 'English';
                    break;
                case 'he':
                    bookLanguage = 'Hebrew';
                    break;
            }

            return bookLanguage;
        },
        getCurrencySign() {
            const currency = this.book.listPrice.currencyCode;
            switch (currency) {
                case 'EUR':
                    var currencySign = '€' ;
                    break;
                case 'USD':
                    var currencySign = '$' ;
                    break;
                case 'ILS':
                    var currencySign = '₪';
                    break;
            }

            return currencySign;
        }
    }
}