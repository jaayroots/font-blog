<template>
  <v-container>
    <v-row align="center">
      <v-img
        max-height="9%"
        max-width="9%"
        src="https://nakawee.courseblue.com/wp-content/uploads/nonhorm.svg"
      ></v-img>
      <v-col class="d-flex justify-space-around">
        <v-card max-width="90%" class="mx-auto">
          <v-toolbar height="70%">
            <v-toolbar-title>
              <!-- <v-btn @click="staticURL()" target="_blank" text>
                  <span class="mr-2">ชุมชน</span>
                </v-btn>
                <v-btn v-for="item in menuPath" :key="item.message" @click="$router.push(item.menuPath)" target="_blank" text>
                  <span class="mr-2">{{item.nameMenu}}</span>
                </v-btn> -->
              <!-- <v-sheet class="mx-auto" max-width="700"> -->
                <v-slide-group multiple show-arrows>
                  <v-slide-item
                    v-for="item in menuPath"
                    :key="item.message"
                  >
                    <v-btn
                      class="mx-1"
                      @click="$router.push(item.menuPath)"
                    >
                      {{ item.nameMenu }}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              <!-- </v-sheet> -->
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-main>
      <router-view></router-view>
    </v-main> -->
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
    menuPath: []
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
