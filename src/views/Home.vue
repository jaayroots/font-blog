<template>
  <div id="Home">
    <nav-bar></nav-bar>
    <v-container>
      <v-col align="center">
        <!-- <v-container><div v-html="contentDetail"></div> </v-container> -->
        <v-container>
          <v-row>
            <v-col cols="12" sm="2">
              <v-sheet rounded="lg" min-height="268">

              </v-sheet>
            </v-col>

            <v-col cols="12" sm="8">
              <v-sheet min-height="70vh" rounded="lg">
                <v-container><div v-html="contentDetail"></div> </v-container>
                <!--  -->
              </v-sheet>
            </v-col>

            <v-col cols="12" sm="2">
              <v-sheet rounded="lg" min-height="268">

              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-card
        class="mx-auto"
        max-width="70%"
        shaped
        elevation="24"
        color="#DEDEDE"
      >
        <v-list-item>
          <v-list-item-subtitle class="text-left">
            <h3>ข่าวสาร</h3>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            <v-btn text @click="$router.push('news')">ข่าวสารทั้งหมด</v-btn>
          </v-list-item-subtitle>
        </v-list-item>
        <div v-for="data in contentListNews" :key="data.message">
          <v-card
            class="mx-auto"
            max-width="100%"
            color="#D4D4D4"
            @click="
              $router.push({
                name: 'PreviewPage',
                contentName: 'news',
                params: { id: data.id, type: 'news' },
              })
            "
            target="_blank"
          >
            <v-col>
              <v-row>
                <v-card width="15%">
                  <v-img
                    height="100%"
                    v-bind:src="pathImg + data.photoCover"
                  ></v-img>
                </v-card>
                <v-col>
                  <v-card-text>
                    <v-row align="center" class="mx-0"> </v-row>
                    <v-card-title> {{ data.contentName }} </v-card-title>
                    <div>
                      {{ data.contentPreview }}
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
          <v-card-actions></v-card-actions>
        </div>
        <div class="text-center" v-if="this.statusViewMoreNews == true">
          <v-btn @click="viewMoreNews" text>ดูเพิ่มเติม</v-btn>
        </div>
        <v-card-actions></v-card-actions>
      </v-card>
      <v-card-actions></v-card-actions>
      <v-card
        class="mx-auto"
        max-width="70%"
        shaped
        elevation="24"
        color="#DEDEDE"
      >
        <v-list-item>
          <v-list-item-subtitle class="text-left">
            <h3>ของฝาก</h3>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            <v-btn text @click="$router.push('souvenir')">ของฝากทั้งหมด</v-btn>
          </v-list-item-subtitle>
        </v-list-item>
        <div v-for="data in contentListSouvenir" :key="data.key">
          <v-card
            class="mx-auto"
            max-width="97%"
            color="#D4D4D4"
            @click="
              $router.push({
                name: 'PreviewPage',
                contentName: 'news',
                params: { id: data.id, type: 'souvenir' },
              })
            "
          >
            <v-col>
              <v-row>
                <v-card width="15%">
                  <v-img
                    height="100%"
                    v-bind:src="pathImg + data.photoCover"
                  ></v-img>
                </v-card>
                <v-col>
                  <v-card-text>
                    <v-row align="center" class="mx-0"> </v-row>
                    <v-card-title> {{ data.contentName }} </v-card-title>
                    <div>
                      {{ data.contentPreview }}
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
          <v-card-actions></v-card-actions>
        </div>
        <div class="text-center" v-if="this.statusViewMoreSouvenir == true">
          <v-btn @click="viewMoreSouvenir" text>ดูเพิ่มเติม</v-btn>
        </div>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import navBar from '../components/navBar.vue'
import https from '../plugins/https'
const axios = require('axios').default

export default {
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
    navBar
  },
  watch: {
  },
  async created () {
    axios.get(https.baseConfig.Url.concat('home/get-home')).then(resp => {
      this.contentDetail = resp.data.list[0].contentDetail
    })
    axios.get(https.baseConfig.Url.concat('news/get-news')).then(resp => {
      let number = 1
      resp.data.list.forEach(item => {
        if (item.contentPreview.length > 350) {
          item.contentPreview = item.contentPreview.slice(0, 250).concat('...')
        }
        item.number = number
        number++
      })
      this.listAllNews = resp.data.list
      if (this.listAllNews.length > this.defItemNews) {
        this.statusViewMoreNews = true
      }
      const limitItem = resp.data.list.slice(0, this.defItemNews)
      this.contentListNews = limitItem
    })
    axios.get(https.baseConfig.Url.concat('souvenir/get-souvenir')).then(resp => {
      let number = 1
      resp.data.list.forEach(item => {
        if (item.contentPreview.length > 350) {
          item.contentPreview = item.contentPreview.slice(0, 250).concat('...')
        }
        item.number = number
        number++
      })
      this.listAllSouvenir = resp.data.list
      if (this.listAllSouvenir.length > this.defItemSouvenir) {
        this.statusViewMoreSouvenir = true
      }
      const limitItem = resp.data.list.slice(0, this.defItemSouvenir)
      this.contentListSouvenir = limitItem
    })
  },
  methods: {
    viewMoreNews () {
      const limitItem = this.listAllNews.slice(0, this.moreItemNews)
      this.contentListNews = limitItem
      if (this.contentListNews.length >= this.listAllNews.length) {
        this.statusViewMoreNews = false
      }
      this.moreItemNews = this.moreItemNews + this.defItemNews
    },
    viewMoreSouvenir () {
      const limitItem = this.listAllSouvenir.slice(0, this.moreItemSouvenir)
      this.contentListSouvenir = limitItem
      if (this.contentListSouvenir.length >= this.listAllSouvenir.length) {
        this.statusViewMoreSouvenir = false
      }
      this.moreItemSouvenir = this.moreItemSouvenir + this.defItemSouvenir
    }
  }
}
</script>
