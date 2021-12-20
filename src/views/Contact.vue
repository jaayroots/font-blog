<template>
  <div id="Home">
    <nav-bar></nav-bar>
    <v-container>
      <v-col align="center">
        <!-- <v-container><div v-html="contentDetail"></div> </v-container> -->
        <!-- <v-container>
          <v-row>
            <v-col cols="12" sm="2">
              <v-sheet rounded="lg" min-height="268">

              </v-sheet>
            </v-col>

            <v-col cols="12" sm="8">
              <v-sheet min-height="70vh" rounded="lg">
                <v-container><div width="100%" v-html="contentDetail"></div> </v-container>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container> -->
        <v-container><div width="100%" v-html="contentDetail"></div> </v-container>
      </v-col>
    </v-container>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import navBar from '../components/navBar.vue'
import footerBar from '../components/footer.vue'
import https from '../plugins/https'
const axios = require('axios').default

export default {
  mounted () {
    document.title = 'ตำบลบ้านโนนหอม'
  },
  data: () => ({
    contentDetail: '',
    statusViewMore: false,
    defItemNews: 4,
    moreItemNews: 8,
    statusViewMoreNews: false,
    statusViewMoreSouvenir: false,
    defItemSouvenir: 4,
    moreItemSouvenir: 8,
    contentListNews: '',
    contentListSouvenir: '',
    title: '',
    detail: '',
    progress: '',
    doList: [],
    json: { hello: 'vue' },
    user: { inputs: [] },
    options: { mode: 'code' },
    legacySystemHTML: '',
    pathImg: https.baseConfig.imgPath
  }),
  content: '',
  name: 'Home',
  messages: [],
  listAllNews: [],
  listAllSouvenir: [],
  components: {
    navBar,
    footerBar
  },
  watch: {
  },
  async created () {
    axios.get(https.baseConfig.Url.concat('contact/get-contact')).then(resp => {
      this.contentDetail = resp.data.list[0].contentDetail
    })
  }
}
</script>
