export default {
    props: ['txt'],
    template: `
          <section class="book-text">
          <p>
          <span class="detail-title">Description :</span>{{description}} 
              <span class="text-show" v-if="isLong" @click="onReadMore" >Read More</span> 
              <span class="text-show" v-if="showLess"  @click="onReadLess" >Read Less</span>
          </p>
          </section>
      `,
  
    data() {
      return {
        description: '',
        isLong: null,
        showLess: null,
      }
    },
    created() {
      const descrip = this.txt
      if (descrip.length > 100) {
        this.description = descrip.substring(0, 100) + '...'
        this.isLong = true
      } else this.description = descrip;
    },
  
    methods: {
      onReadMore() {
        this.description = this.txt
        this.isLong = null
        this.showLess = true
      },
      onReadLess() {
        const descrip = this.txt
        this.description = descrip.substring(0, 100) + '...'
        if (descrip.length > 100) {
          this.isLong = true
          this.showLess = false
        }
      },
    },
}