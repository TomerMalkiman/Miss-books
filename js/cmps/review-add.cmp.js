import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/eventBus-service.js"

export default {
    props: ['bookId','reviews'],
    template: `
    <!-- <hr> -->
    <h1>Review the book:</h1>
 <section class="book-review">
 <form >
  <label for="fname">Full name: </label>
  <input ref="userName" type="text" id="fname" name="fname"  v-model="fullName"><br><br>
  <label for="rate">Rate book: </label>
  <input type="number" id="rate" name="rate" min="1" max="5"  v-model="rate"><br><br>
  <label for="rate">Tell us more: </label>
  <textarea id="review" name="text-review" rows="1" cols="50" v-model="review"></textarea>
  <button class="submit" @click.prevent="addReview" >Submit</button>
</form>
 </section>
<hr>
 <section class="review-display">
        <h1>Book Reviews:</h1>
        <div class="reviews">
            <div class="review-card" v-for="(review, idx) in reviews">
                <button @click="onDeleteReview(idx)">X</button>
                <h3><span class="detail-title">Review By: </span> {{review.fullName}}</h3>
                <h4><span class="detail-title">Rate: </span> {{review.rate}}</h4>
                <h4><span class="detail-title">Date: </span> {{getDate}}</h4>
                <h4><span class="detail-title">Review: </span> <span>{{review.review}}</span></h4>
            </div>
        </div>
</section>

`,
    data() {
        return {
            fullName: null,
            rate: null,
            review: null
        }
    },
    mounted() {
        this.$refs.userName.focus()
    },

    methods: {
        addReview() {
            bookService.addReview(this.bookId, {
                fullName: this.fullName||'Books Reader',
                rate: this.rate || '3',
                review: this.review
            })
                .then(book => {
                    this.$emit('book-update', book)
                })
                .then(() => {
                    this.fullName = null;
                    this.rate = null;
                    this.review = null;
                    this.$refs.userName.focus()
                    eventBus.emit('show-msg', { txt: 'Added review succesfully', type: 'success' });
                })
                .catch(err => {
                    console.error(err);
                    eventBus.emit('show-msg', { txt: 'Error - please try again later', type: 'error' });
                });
                


        },
      
        onDeleteReview(idx){
            this.$emit('delete-review', idx)
            eventBus.emit('show-msg', { txt: 'Deleted succesfully', type: 'success' });
            
        }
        
    },
    computed:{
        getDate(){
            var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            return date;
        },
    }
   
}

