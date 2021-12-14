<template>
  <div id="Home">
    <nav-bar></nav-bar>
    <v-container>
      <v-col align="center">
        <!-- <v-container><div v-html="contentDetail"></div> </v-container> -->
        <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <v-container><div v-html="contentDetail"></div> </v-container>
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
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
        <div v-for="data in last_new" :key="data.message">
          <v-card
            class="mx-auto"
            max-width="97%"
            color="#D4D4D4"
            @click="
              $router.push({
                name: 'PreviewPage',
                contentName: 'news',
                params: { id: data.id, type: 'news' },
              })
            "
          >
            <v-col>
              <v-row>
                <v-card width="15%">
                  <v-img height="100%" v-bind:src="'http://localhost:7000/uploads/' + data.photoCover"></v-img>
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
        <div class="text-center" v-if="this.statusViewMoreNews == true"><v-btn @click="viewMore" text>ดูเพิ่มเติม</v-btn></div>
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
                  <v-img height="100%" v-bind:src="'http://localhost:7000/uploads/' + data.photoCover"></v-img>
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
        <div class="text-center" v-if="this.statusViewMoreSouvenir == true"><v-btn @click="viewMore" text>ดูเพิ่มเติม</v-btn></div>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import navBar from '../components/navBar.vue'
const axios = require('axios').default
export default {
  data: () => ({
    contentDetail: '',
    statusViewMoreNews: false,
    statusViewMoreSouvenir: false,
    // last_new: [{ img: 'https://nakawee.courseblue.com/wp-content/uploads/%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%8A%E0%B8%991.jpg', title: 'จักรทอ', date: '25 พฤจิกายน 2565', detail: 'เป็นการนำลูกประคบสมุนไพรสดหรือสมุนไพรแห้ง นึ่งให้ร้อน และนำมาประคบตามส่วนต่างๆของร่างกาย ส่วนใหญ่มักนิยมประคบหลังจากการนวด การประคบสมุนไพรจะช่วยส่งเสริมการนวดไทยแบบราชสำนัก ให้ผลการรักษาดีขึ้น ทั้งจากตัวยาสมุนไพร และความร้อน การประคบสมุนไพรมีประโยชน์ช่วยกระตุ้นการไหลเวียนของเลือด ......' }, { img: 'https://nakawee.courseblue.com/wp-content/uploads/%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%8A%E0%B8%992.jpg', title: 'ชาวนา', date: '25 พฤจิกายน 2565', detail: 'อาชีพประชากรตำบลโนนหอม ส่วนใหญ่ประกอบอาชีพเกษตรกรรม โดยมีอาชีพทำนาเป็นอาชีพ หลัก อาชีพรอง คือ ทำไร่ ทำสวน เช่น ปลูกถั่วลิสง ข้าวโพด มะเขือเทศ แตงโม เป็นต้น ซึ่งจะทำ ในช่วงหลังฤดูเก็บเกี่ยว หลังจากนั้นประชากรบางส่วนยังประกอบอาชีพรับจ้างทั่วไป รับราชการและทำ หัตถกรรมในครัวเรือน เช่น การทอเสื่อ การจักสานอุปกรณ์จับสัตว์น้ำ เป็นต้น' }],
    last_new: '',
    contentListSouvenir: '',
    title: '',
    detail: '',
    progress: '',
    doList: [],
    json: { hello: 'vue' },
    user: { inputs: [] },
    options: { mode: 'code' },
    legacySystemHTML: ''
  }),
  content: '',
  name: 'Home',
  messages: [],
  components: {
    // VJsoneditor
    navBar
  },
  watch: {
    getList () {
      console.log('dddd')
    }
  },
  async created () {
    axios.get('http://localhost:7000/api/home/get-home').then(resp => {
      this.contentDetail = resp.data.list[0].contentDetail
    })
    axios.get('http://localhost:7000/api/news/get-news').then(resp => {
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
        this.statusViewMoreNews = true
      }
      const limitItem = resp.data.list.slice(0, this.defItem)
      this.last_new = limitItem
    })
    axios.get('http://localhost:7000/api/souvenir/get-souvenir').then(resp => {
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
        this.statusViewMoreSouvenir = true
      }
      const limitItem = resp.data.list.slice(0, this.defItem)
      this.contentListSouvenir = limitItem
    })
  },
  methods: {
    onUpdate () {
      console.log(this.content)
      this.legacySystemHTML = this.content
      // this.text = text
    },
    doSomething () {
      console.log('aaaa')
    },
    async docreate (title, detail, progress) {
      // const sascascasc = await this.axios.get('https://api.publicapis.org/entries')
      // await this.$http.get('https://api.publicapis.org/entries').then((response) => {
      //   for (let i = 0; i < 100; i++) {
      //     this.user.inputs.push({
      //       title: response.data.entries[i].Category,
      //       detail: response.data.entries[i].Description,
      //       progress: ''
      //     })
      //     // console.log(response.data.entries[i])
      //   }
      // })

      this.user.inputs.push({
        title: title,
        detail: detail,
        progress: progress
      })
      this.title = ''
      this.detail = ''
      this.progress = ''
    }
  }
}
</script>
