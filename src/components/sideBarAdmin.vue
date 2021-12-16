<template>
    <v-navigation-drawer
      app
      class="pt-4"
      color="#6B87C1"
      variant
    >
    <p class="text-center">ระบบจัดการเว็ปไซต์ ตำบลโนนหอม</p>
      <v-divider class="mx-8" inset horizontal></v-divider>
      <v-card-actions></v-card-actions>
        <v-row
    align="center"
    justify="space-around"
    v-for="item in menuPath" :key="item.message" @click="$router.push(item.menuPath)" target="_blank"
  >
    <v-btn text>
      {{item.nameMenu}}
    </v-btn>
        </v-row>
    </v-navigation-drawer>
</template>
<script>
import https from '../plugins/https'
const axios = require('axios').default
export default {
  dialog: false,
  dialogDelete: false,
  name: 'RichTextEditPanel',

  data: () => ({
    items: [{ title: 'Dashboard', icon: 'mdi-view-dashboard' }, { title: 'Photos', icon: 'mdi-image' }, { title: 'About', icon: 'mdi-help-box' }],
    content: '',
    menuPath: [],
    response: '',
    formData: [],
    dialog: false,
    dialogDelete: false,
    tmpDetailDelete: '',
    headers: [
      {
        text: 'ลำดับ',
        align: 'start',
        sortable: false,
        value: 'number'
      },
      { text: 'หัวข้อ', value: 'contentName' },
      { text: 'ผู้สร้าง', value: 'createBy' },
      { text: 'วันที่สร้าง', value: 'createDate' },
      { text: 'ตัวเลือก', value: 'actions' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      number: '',
      id: '',
      contentName: '',
      contentPreview: '',
      photoCover: [],
      contentDetail: '',
      createBy: 0,
      createDate: 0
    },
    defaultItem: {
      id: '',
      contentName: '',
      contentPreview: '',
      photoCover: [],
      contentDetail: '',
      createBy: 0,
      createDate: 0
    }
  }),
  components: {
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'สร้างเนื้อหา' : 'แก้ไขเนื้อหา'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  async created () {
    const resMenu = await axios.post(https.baseConfig.Url.concat('menu/get-menu'), {
      typeMenu: 'admin'
    }).then(function (response) {
      return response
    }).catch(function (error) {
      console.log(error)
    })
    this.menuPath = resMenu.data.list
    axios.get(https.baseConfig.Url.concat('news/get-news')).then(resp => {
      let number = 1
      resp.data.list.forEach(item => {
        item.number = number
        number++
      })
      this.desserts = resp.data.list
    })
  },
  methods: {
    openEditItem (item) {
      this.dialog = true
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    closeEditItem (item) {
      this.dialog = false
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.tmpDetailDelete = item.contentName
      console.log(this.tmpDetailDelete)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      await axios.post(https.baseConfig.Url.concat('news/delete-news'), {
        id: this.desserts[this.editedIndex].id
      }).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
      this.fectData()
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async saveAndUpdate () {
      await axios.post(https.baseConfig.Url.concat('news/createAndUpdate-news'), {
        item: this.editedItem
      }).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
      this.fectData()
      this.close()
    },

    async fectData () {
      axios.get(https.baseConfig.Url.concat('news/get-news')).then(resp => {
        let number = 1
        resp.data.list.forEach(item => {
          item.number = number
          number++
        })
        this.desserts = resp.data.list
      })
    }
  }
}
</script>
