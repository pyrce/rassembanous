
/* eslint-disable no-unused-vars */
import Axios from 'axios';



export default {
  name: "Layout",
  data() {
    return {
      user: {},
      showUser: false,
      api:process.env.VUE_APP_BASE_URL,
    }

  },
  created() {
    this.getUser();
    console.log("layout created")
  },
  mounted() {
    this.getUser();
    console.log("layout mounted")
  },
  computed: {
    updateUser: () => {
      this.getUser()
    }
  },
  methods: {
    getUser() {
      Axios.post(this.api+"/users").then(({ data }) => {

        if (data.msg != "ko") {
          console.log("this data");
          console.log("get user data");
          this.user = data
          this.showUser = true

        } else {
          console.log("user not found")
          this.user = {}
          this.showUser = false

        }
        localStorage.setItem("user", JSON.stringify(this.user))
      })

    },
    login() {
      this.$router.push("/login");
    },
    signup() {
      this.$router.push("/signup");
    },
    profil(id) {
      this.$router.push("/profil/" + id);
    },
    logout() {
      Axios.post(this.api+"/users/logout").then(({ data }) => {
    
        this.user = {};
        localStorage.setItem("user", JSON.stringify(this.user))
        this.getUser();
      })
    }
  },



}