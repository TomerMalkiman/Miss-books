export default {
    template: `
        <section class="books-filter">
            
            <label>
            Search
            <input @input="setFilter" type="text" v-model="filterBy.byName" placeholder="Search...">
            </label>

            <label>
             Min price:   
            <input @input="setFilter" type="range" value="1" min="1" max="250" 
            oninput="this.nextElementSibling.value = this.value" v-model="filterBy.fromPrice">
            <output>1</output>
            </label>

            <label>
             Max price:   
            <input @input="setFilter" type="range" value="1" min="1" max="250"
            oninput="this.nextElementSibling.value = this.value" v-model="filterBy.toPrice" >
            <output>150</output>
            </label>
          
        </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: 0,
                toPrice: 0
            }
        };
    },
    methods: {
        setFilter() {
            // console.log(this.filterBy);
            this.$emit('filtered', this.filterBy);
        }
    }
}