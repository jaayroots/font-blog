<template>
 <div>
        <input type="file" @change="uploadFile" ref="file" />
        <button @click="submitFile">Upload!</button>
        <!-- <img v-bind:src="'http://localhost:7000/images/200.jpg'" /> -->
      </div>
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
    uploadFile () {
      this.Images = this.$refs.file.files[0]
    },
    submitFile () {
      const formData = new FormData()
      formData.append('file', this.Images)
      const headers = { 'Content-Type': 'multipart/form-data' }
      // console.log(formData)
      axios.post('http://localhost:7000/api/content/uploadProfilePicture', formData, { headers }).then((res) => {
      })
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
