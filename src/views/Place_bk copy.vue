<template>
  <div id="place">
    <nav-bar></nav-bar>
    <v-container>
      <v-row>
        <v-col align="center"><h2>เช็คอิน</h2> </v-col>
      </v-row>
      <v-card-actions></v-card-actions>
      <v-card
        class="mx-auto"
        max-width="80%"
        shaped
        elevation="24"
        color="#DEDEDE"
      >
        <v-list-item>
          <v-list-item-subtitle class="text-left">
            <h3 >สถานที่ใหม่</h3>
          </v-list-item-subtitle>
        </v-list-item>
        <div v-for="data in contentList" :key="data.message">
          <v-card
            class="mx-auto"
            max-width="100%"
            color="#D4D4D4"
            @click="$router.push({ name: 'PreviewPage', contentName: 'place', params: { id: data.id, type: 'place' }}) "
            target="_blank"
          >
            <v-col>
              <v-row>
                <v-card width="15%">
                  <v-img height="100%" v-bind:src="pathImg + data.photoCover"></v-img>
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
        <div class="text-center" v-if="this.statusViewMore == true"><v-btn @click="viewMore" text>ดูเพิ่มเติม</v-btn></div>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-container>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
// import ToDoItem from '../image/cat.jpg'
import navBar from '../components/navBar.vue'
import https from '../plugins/https'
import footerBar from '../components/footer.vue'
const axios = require('axios').default
export default {
  text: '',
  content: '',
  contentType: 'contentMenu',
  listAll: [],
  data: () => ({
    contentList: '',
    statusViewMore: false,
    defItem: 4,
    moreItem: 8,
    pathImg: https.baseConfig.imgPath
  }),
  components: {
    // ToDoItem
    navBar,
    footerBar
  },
  async created () {
    axios.get(https.baseConfig.Url.concat('place/get-place')).then(resp => {
      let number = 1
      resp.data.list.forEach(item => {
        if (item.contentPreview.length > 350) {
          item.contentPreview = item.contentPreview.slice(0, 250).concat('...')
        }
        item.number = number
        number++
      })
      this.listAll = resp.data.list
      if (this.listAll.length > this.defItem) {
        this.statusViewMore = true
      }
      const limitItem = resp.data.list.slice(0, this.defItem)
      this.contentList = limitItem
    })
  },
  methods: {
    viewMore () {
      const limitItem = this.listAll.slice(0, this.moreItem)
      this.contentList = limitItem
      console.log(this.contentList.length)
      if (this.contentList.length >= this.listAll.length) {
        this.statusViewMore = false
      }
      this.moreItem = this.moreItem + this.defItem
    }
  }
}
</script>
