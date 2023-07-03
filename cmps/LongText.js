export default {
    props: ['text'],
    // emits: [''],
    template: `
     <p>{{formatText}}</p>
     <button class="block" v-if="descLength" @click="onToggleText">Read {{displayText}}</button>
      `,
    data() {
      return {
        isMore: false,
      }
    },
    created() { },
    methods: {
      onToggleText() {
        this.isMore = !this.isMore
      },
    },
    computed: {
      formatText() {
        // could be done with classes :
        //   white-space: nowrap
        // text-overflow: ellipsis
        // max-width: 100ch
        // overflow: hidden
        return this.isMore ? this.text : this.text.slice(0, 100)
      },
      displayText() {
        return this.isMore ? 'less' : 'more'
      },
      descLength() {
        return this.text.length > 100
      },
    },
  }
  
  //old way maybe better
  // template: `
  //           <div class="">
  //               <div v-if="isDisplayLess">
  //                 <p >{{shortText}}</p>
  //                 <button @click="isDisplayLess = false">Read More...</button>
  //              </div>
  //              <div v-else>
  //                 <p >{{txt}}</p>
  //                 <button @click="isDisplayLess = true">Read Less...</button>
  //              </div>
  //           </div>
  //       `,
  //   data() {
  //     return {
  //       isDisplayLess: true,
  //     }
  //   },
  //   methods: {},
  //   computed: {
  //     shortText() {
  //       return this.txt.substring(0, 100)
  //     },
  //   },
  