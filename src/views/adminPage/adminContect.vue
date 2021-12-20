<template>
  <v-app>
    <sideBarAdmin></sideBarAdmin>
    <v-card max-height="100%">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text height="">
                <v-container>
                  <!-- <v-row justify="center">
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.contentName"
                        label="หัวข้อ"
                      ></v-text-field>
                    </v-col>
                  </v-row> -->
                  <!-- <v-row justify="center">
                    <v-col cols="12" sm="9" md="6">
                      <v-text-field
                        v-model="editedItem.contentPreview"
                        label="เนื้อหาตัวอย่าง"
                        counter="400"
                      ></v-text-field>
                      <v-file-input
                    v-model="editedItem.photoCover"
                      truncate-length="15"
                      label="รูปภาพตัวอย่าง"
                      @change="onFileChange"
                    ></v-file-input>
                      <div v-if="!image">
                        <v-row justify="center">
                        <h2>เลือกรูปภาพตัวอย่าง</h2>
                        <v-card-actions></v-card-actions>
                        </v-row>
                        <v-row justify="center">
                          <input type="file" @change="onFileChange" />
                        </v-row>
                      </div>
                      <div v-else>
                        <v-row justify="center">
                          <img :src="image" height="40%" width="40%" />
                        </v-row>
                        <v-row justify="center">
                          <button @click="removeImage">Remove image</button>
                        </v-row>
                        <v-row justify="center">
                          <input type="file" @change="onFileChange" />
                        </v-row>
                      </div>
                    </v-col>
                  </v-row> -->
                  <v-row justify="center">
                    <v-col cols="12" sm="10" md="12">
                      <vue-editor
                        v-model="editedItem.contentDetail"
                      ></vue-editor>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="saveAndUpdate">
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
  </v-app>
</template>
<script>
import https from '../../plugins/https'
import sideBarAdmin from '../../components/sideBarAdmin.vue'
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
    sideBarAdmin
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'สร้างเนื้อหาสำหรับหน้าติดต่อ' : 'แก้ไขเนื้อหา'
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
    axios.get(https.baseConfig.Url.concat('contact/get-contact')).then(resp => {
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
      await axios.post(https.baseConfig.Url.concat('contact/delete-contact'), {
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
      await axios.post(https.baseConfig.Url.concat('contact/createAndUpdate-contact'), {
        item: this.editedItem
      }).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
      this.fectData()
      this.close()
    },

    async fectData () {
      axios.get(https.baseConfig.Url.concat('contact/get-contact')).then(resp => {
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
