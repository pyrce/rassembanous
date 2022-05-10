import { EventBus } from "../../eventBus"


export default {

  data() {
      return {
          timeout: 3000,
          contentSnackbar: {
              text: '',
              color: 'success',
              etat: false
          }
      }
  },

  created() {
      EventBus.$on('updateSnack', (contentSnackbar) => {
          this.contentSnackbar.etat = contentSnackbar.etat
          this.contentSnackbar.text = contentSnackbar.text
          this.contentSnackbar.color = contentSnackbar.color
      })
  }


}