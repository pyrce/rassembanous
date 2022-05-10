<template>
	<v-app>
		<link
			href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
			rel="stylesheet"
		/>

		<div class="container mb-20">
			<navbar></navbar>
		</div>
		<div class="main mb-20">
			<router-view></router-view>
		</div>
		<baseSnackbar />
		<div class="footer" style="position: absolute; bottom: 0; width: 100%">
			<footerLayout />
		</div>
	</v-app>
</template>
    <script src="https://cdn.tailwindcss.com"></script>
<script>
import Navbar from "../navigations/Navbar";
import FooterLayout from "../navigations/Footer";
import BaseSnackbar from '../components/baseSnackbar/BaseSnackbar.vue'
export default {
	components: {
		Navbar,
		FooterLayout,
		BaseSnackbar
	},
};
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Oswald:wght@500&display=swap');
.v-btn{
	background-color: "#D62839";
}
.title{
	color:red;
	font-family: "Oswald";
}

.tableHeader{

    background-color:rgba(23, 86, 118, 1);

	font:"Oswald";
	font-size: 10px;
}

.tableHeader span{
		color:white;
}
</style>