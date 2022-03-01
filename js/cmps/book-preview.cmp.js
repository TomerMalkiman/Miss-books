export default {
    props: ['book'],
    template: `
        <section class="img-preview-conatiner">
            <img :src="bookImgUrl">
        </section> 

        <section class="book-title">
            <h2> {{book.title}}</h2>
        </section>

        <p><span class="detail-title">Author :</span> {{getAuthors}}</p>
        <p><span class="detail-title">Price :</span>  {{book.listPrice.amount}}<span >{{getCurrencySign}}</span> </p>
    `,
    data() {
        return {}
    },
// //     created() { },
// methods: {

// },
    computed: {
        bookImgUrl() {
            return this.book.thumbnail;
        },
        getAuthors() {
            var authors = this.book.authors.join(' | ');
            return authors;
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