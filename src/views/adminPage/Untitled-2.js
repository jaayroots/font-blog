<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    height="1000"
  >
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <v-card class="mx-auto" max-width="400">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                เข้าสู่ระบบ
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title>
                <v-container>
                  <v-text-field
                    label="ชื่อผู้ใช้"
                    :rules="rules"
                    hide-details="auto"
                  ></v-text-field>
                  <v-text-field
                    label="รหัสผ่าน"
                    :rules="rules"
                    hide-details="auto"
                    type="password"
                  ></v-text-field>
                  </v-container
              ></v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-container>
              <v-flex justify-center>
                <v-btn primary block> เข้าสู่ระบบ </v-btn>
              </v-flex>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>
</template>
<script>
const axios = require('axios').default
// import navBar from '../../components/navBar.vue'
export default {
  dialog: false,
  dialogDelete: false,
  name: 'RichTextEditPanel',
  files: '',
  data: () => ({
    items: [{ title: 'Dashboard', icon: 'mdi-view-dashboard' }, { title: 'Photos', icon: 'mdi-image' }, { title: 'About', icon: 'mdi-help-box' }],
    content: '',
    image: '',
    files: '',
    formData: '',
    response: '',
    // formData: [],
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
      return this.editedIndex === -1 ? 'สร้างเนื้อหาสำหรับหน้าชุมชน' : 'แก้ไขเนื้อหา'
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
    axios.get('http://localhost:7000/api/home/get-home').then(resp => {
      this.editedItem.contentDetail = resp.data.list[0].contentDetail
      this.editedItem.id = resp.data.list[0].id
    })
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      this.file = this.$refs.file.files[0]
      if (files.length) {
        this.createImage(files[0])
      }
    },
    createImage (file) {
      // var image = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.image = ''
    },
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
      await axios.post('http://localhost:7000/api/home/delete-home', {
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
      // console.log(this.editedItem)
      await axios.post('http://localhost:7000/api/home/createAndUpdate-home', {
        item: this.editedItem
      }).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
      this.fectData()
      this.close()
    },

    async fectData () {
      axios.get('http://localhost:7000/api/home/get-home').then(resp => {
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
