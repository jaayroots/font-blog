<template>
  <v-app>
    <!-- <v-container>
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
                <v-btn v-for="item in menuPath" :key="item.message" @click="$router.push(item.path)" target="_blank" text>
                  <span class="mr-2">{{item.menuName}}</span>
                </v-btn>
              </v-toolbar-title>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>

export default {
  // name: 'App',

  data: () => ({
    items: ['ชุมชน', 'แผนที่', 'เช็คอิน', 'ของฝาก', 'ติดต่อ'],
    menuPath: [{ menuName: 'ชุมชน', path: '/' }, { menuName: 'ข่าวสาร', path: 'news' }, { menuName: 'เช็คอิน', path: 'place' }, { menuName: 'ของฝาก', path: 'souvenir' }, { menuName: 'ติดต่อ', path: 'contect' }],
    legacySystemHTML: '<h1 class="ql-align-center"><span class="ql-font-serif" style="color: rgb(255, 255, 255); background-color: rgb(240, 102, 102);"> I am snow example! </span></h1><p><br></p><h2 class="ql-align-right"><span style="background-color: rgb(230, 0, 0);">สวสัดีครับ ทดสอบภาษาไทย</span></h2><h2 class="ql-align-center"><span style="background-color: rgb(230, 0, 0);">สวสัดีครับ ทดสอบภาษาไทย</span></h2><h2><span style="background-color: rgb(230, 0, 0);">สวสัดีครับ ทดสอบภาษาไทย</span></h2><h2 class="ql-align-right"><br></h2>'

  }),
  items: [{ message: 'Foo' }, { message: 'Bar' }]
}
</script>
