<template>
  <v-app>
    <sideBarAdmin></sideBarAdmin>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>ของฝาก</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                สร้าง
              </v-btn>
            </template>
            <v-card max-height="100%">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.contentName"
                        label="หัวข้อ"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" sm="9" md="6">
                      <v-text-field
                        v-model="editedItem.contentPreview"
                        label="เนื้อหาตัวอย่าง"
                        counter="400"
                      ></v-text-field>
                      <div v-if="!editedItem.id">
                        <v-row justify="center">
                        <h2>เลือกรูปภาพตัวอย่าง</h2>
                        <v-card-actions></v-card-actions>
                        </v-row>
                        <v-row justify="center">
                          <input type="file" @change="uploadFile" ref="file" />
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>
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
                <!-- <v-btn color="blue darken-1" text @click="closeEditItem">
                  PreView
                </v-btn> -->
                <v-btn color="blue darken-1" text @click="close">
                  ยกเลิก
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveAndUpdate">
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="justify-center"
                ><h3>คุณต้องการลบเนื้อหานี้ ใช่หรือไม่</h3></v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >ยกเลิก</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >ตกลง</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="openEditItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data> </template>
    </v-data-table>
  </v-app>
</template>
<script>
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
    imageId: '',
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
      createDate: 0,
      getDate: Date.now()
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
    axios.get('http://localhost:7000/api/souvenir/get-souvenir').then(resp => {
      let number = 1
      resp.data.list.forEach(item => {
        item.number = number
        number++
      })
      this.desserts = resp.data.list
    })
  },
  methods: {
    uploadFile () {
      this.Images = this.$refs.file.files[0]
    },
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
      await axios.post('http://localhost:7000/api/souvenir/delete-souvenir', {
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
      if (this.editedItem.contentName === '') {
        this.$swal('กรุณาใส่หัวข้อ')
        return
      }
      if (this.editedItem.contentPreview === '') {
        this.$swal('กรุณาใส่เนื้อหาตัวอย่าง')
        return
      }
      // console.log(this.editedItem.contentDetail)
      // console.log(this.editedItem.id)
      if (this.editedItem.contentDetail === '') {
        this.$swal('กรุณาใส่เนื้อหา')
        return
      }
      if (this.Images === undefined && this.editedItem.id === '') {
        this.$swal('กรุณาเลือกรูปภาพปก (.jpg)')
        return
      }
      // check Detail
      const formData = new FormData()
      formData.append('file', this.Images)
      if (this.editedItem.id === '') {
        await axios.post('http://localhost:7000/api/souvenir/createAndUpdate-souvenir', {
          item: this.editedItem, image: this.Images.name
        }).then(function (response) {
          return response.data.ok[0]
        }).catch(function (error) {
          console.log(error)
        })
        // Picture
        const formData = new FormData()
        formData.append('file', this.Images)
        const headers = { 'Content-Type': 'multipart/form-data' }
        await axios.post('http://localhost:7000/api/content/uploadProfilePicture', formData, { headers }).then((res) => {
        })
      } else {
        await axios.post('http://localhost:7000/api/souvenir/createAndUpdate-souvenir', {
          item: this.editedItem
        }).then(function (response) {
        }).catch(function (error) {
          console.log(error)
        })
      }
      this.fectData()
      this.close()
    },
    async fectData () {
      axios.get('http://localhost:7000/api/souvenir/get-souvenir').then(resp => {
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
