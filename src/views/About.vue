<template>
  <div id="About">
    <v-container class="grey lighten-5">
      <v-row>
        <v-col align="center">
          <v-card class="pa-1" outlined tile>
            <!-- <v-img
            height="10%"
            width="70%"
            src="https://nakawee.courseblue.com/wp-content/uploads/%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%AE%E0%B8%B2%E0%B8%811.jpg"
            aspect-ratio="1"
            class="grey lighten-2"
          ></v-img> -->
            <vue-editor v-model="content"></vue-editor>
            <v-btn
              class="mr-4"
              @click="onUpdate()"
              color="success"
            >
              Create
            </v-btn>
            <div v-html="legacySystemHTML"></div>
            <div v-html='map'></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>

export default {
  text: '',
  content: '',
  name: 'RichTextEditPanel',
  data: () => ({
    legacySystemHTML: '',
    map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4206272259185!2d100.62859441534715!3d13.753489200958656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61c2ab81f305%3A0x4f89b4bb70ffac0f!2sLumpini%20Ville%20Ramkhamhaeng%2026!5e0!3m2!1sen!2sth!4v1637760479329!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
  }),
  components: {

  },
  methods: {
    onUpdate () {
      console.log(this.content)
      this.legacySystemHTML = this.content
      // this.text = text
    }
  }
}
</script>
