<template>
  <div id="Contect">
    <nav-bar></nav-bar>
    <v-container>
      <v-row>
        <v-col align="center"><div v-html="map"></div>
        </v-col>
      </v-row>
      <v-card-actions></v-card-actions>
    </v-container>
  </div>
</template>
<script>
import NavBar from '../components/navBar.vue'
export default {
  text: '',
  content: '',
  name: 'RichTextEditPanel',
  data: () => ({
    last_new: [{ img: 'https://nakawee.courseblue.com/wp-content/uploads/%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%8A%E0%B8%991.jpg', title: 'จักรทอ', date: '25 พฤจิกายน 2565', detail: 'เป็นการนำลูกประคบสมุนไพรสดหรือสมุนไพรแห้ง นึ่งให้ร้อน และนำมาประคบตามส่วนต่างๆของร่างกาย ส่วนใหญ่มักนิยมประคบหลังจากการนวด การประคบสมุนไพรจะช่วยส่งเสริมการนวดไทยแบบราชสำนัก ให้ผลการรักษาดีขึ้น ทั้งจากตัวยาสมุนไพร และความร้อน การประคบสมุนไพรมีประโยชน์ช่วยกระตุ้นการไหลเวียนของเลือด ......' }, { img: 'https://nakawee.courseblue.com/wp-content/uploads/%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%8A%E0%B8%992.jpg', title: 'ชาวนา', date: '25 พฤจิกายน 2565', detail: 'อาชีพประชากรตำบลโนนหอม ส่วนใหญ่ประกอบอาชีพเกษตรกรรม โดยมีอาชีพทำนาเป็นอาชีพ หลัก อาชีพรอง คือ ทำไร่ ทำสวน เช่น ปลูกถั่วลิสง ข้าวโพด มะเขือเทศ แตงโม เป็นต้น ซึ่งจะทำ ในช่วงหลังฤดูเก็บเกี่ยว หลังจากนั้นประชากรบางส่วนยังประกอบอาชีพรับจ้างทั่วไป รับราชการและทำ หัตถกรรมในครัวเรือน เช่น การทอเสื่อ การจักสานอุปกรณ์จับสัตว์น้ำ เป็นต้น' }],
    map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7961366.603458299!2d96.9949203425417!3d13.011071215947657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sth!4v1637856908783!5m2!1sen!2sth" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
  }),
  components: {
    NavBar
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
