<template>
  <div>
    <v-card-actions></v-card-actions>
    <v-card-actions></v-card-actions>
    <v-card-actions></v-card-actions>
    <v-card-actions></v-card-actions>
    <v-card-actions></v-card-actions>
    <v-img
      max-height="100%"
      max-width="100%"
      v-bind:src="pathImg + 'footer.jpg'"
    ></v-img>
  </div>
</template>
<script>
import https from '../plugins/https'
export default {
  data: () => ({
    menuPath: [],
    pathImg: https.baseConfig.imgPath
  })
}

</script>
