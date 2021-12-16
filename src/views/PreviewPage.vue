<template>
    <div class="hello">
      <nav-bar></nav-bar>
      <v-container><div v-html="detail" align="center"></div></v-container>
    </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import router from '../router'
import https from '../plugins/https'
const axios = require('axios').default
export default {
  name: 'Page2',
  cosId: '',
  resItem: '',
  data () {
    return {
      id: 0,
      type: '',
      contentType: '',
      detail: ''
    }
  },
  components: {
    // VJsoneditor
    navBar
  },
  async created () {
    this.cosId = this.$route.params.id
    this.id = this.$route.params.id
    this.type = this.$route.params.type
    this.contentType = this.$route.params.contentType
    
    const resContent = await axios.post(https.baseConfig.Url.concat('content/get-content'), {
      id: this.id, type: this.type
    }).then(function (response) {
      return response
    }).catch(function (error) {
      console.log(error)
    })
    this.detail = resContent.data.list[0].contentDetail
  },
  methods: {
    navigate () {
      router.go(-1)
    }
  }
}
</script>
