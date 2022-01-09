import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(InfiniteLoading, {
  props: {
    spinner: 'default',
    distance: 500,
    /* other props need to configure */
  },
  system: {
    throttleLimit: 500,
  },
})

Vue.use(TextareaAutosize)
