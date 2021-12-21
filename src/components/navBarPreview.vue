<template>
  <div align="center">
    <v-img
      max-height="100%"
      max-width="100%"
      v-bind:src="pathImg + 'header.png'"
    ></v-img>
    <v-card-actions></v-card-actions>
    <v-row align="center">
      <v-col class="d-flex justify-space-around">
        <v-card max-width="90%" class="mx-auto">
          <v-toolbar height="70%">
            <v-toolbar-title>
              <v-slide-group multiple show-arrows>
                <v-slide-item v-for="(item, index) in menuPath" :key="index">
                  <v-btn class="mx-1" @click="$router.push(index==0? '/':'/'+item.menuPath)">
                  </v-btn>
                </v-slide-item>
              </v-slide-group>
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import https from '../plugins/https'
const axios = require('axios').default
export default {
  // name: 'App',
  staticPath: 'www.google.com',
  data: () => ({
    // items: ['ชุมชน', 'แผนที่', 'เช็คอิน', 'ของฝาก', 'ติดต่อ'],
    // menuPath: [{ nameMenu: 'ชุมชน', path: '/' }, { nameMenu: 'ข่าวสาร', path: 'news' }, { nameMenu: 'เช็คอิน', path: 'place' }, { nameMenu: 'ของฝาก', path: 'souvenir' }, { nameMenu: 'ติดต่อ', path: 'contect' }],
    menuPath: [],
    pathImg: https.baseConfig.imgPath
  }),
  components: {
    // ToDoItem
  },
  methods: {
    staticURL () {
      window.open('https://nakawee.courseblue.com/?fbclid=IwAR1AzDwyZcbvpsPL6bomYrDJUR4USeGtP3zkcl3kEQ6N5OiQvxvCzJdtIpQ', '_blank')
    }
  },
  async created () {
    const resMenu = await axios.post(https.baseConfig.Url.concat('menu/get-menu'), {
      typeMenu: 'normal'
    }).then(function (response) {
      return response
    }).catch(function (error) {
      console.log(error)
    })
    this.menuPath = resMenu.data.list
  }
}

</script>
