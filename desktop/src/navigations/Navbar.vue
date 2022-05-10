<template>
	<div>
		<v-app-bar  class="bg-customHeader/20" dense light absolute height="100px">
<v-img src="@/assets/logo.png" width="60px"></v-img>
			<v-toolbar-title>retrouv a nous</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-btn text to="/" color="primary"> Home </v-btn>
			<v-btn text to="/partenaires" color="primary" class="ml-3">
				partenaires
			</v-btn>
			<v-btn text to="/questions" color="primary" class="ml-3">
				Questionnaires
			</v-btn>
			<v-btn text to="/account" color="primary" class="ml-3">
				<v-icon> mdi-account</v-icon>
			</v-btn>
			<v-btn text to="/login" color="primary" v-if="!isChecked">
				<v-icon> mdi-login</v-icon>
			</v-btn>
			<v-btn
				text
				@click="logout()"
				v-if="isChecked"
				class="button-text"
				color="#FF6D6D"
			>
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
	</div>
</template>

<script src="https://cdn.tailwindcss.com"></script>
<script>
import router from "../routes";
import { authenticationService } from "../_services/authentication.service";
export default {
	data() {
		return {
			currentUser: null,
		};
	},
	created() {
		authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
	},

	computed: {
		isChecked() {
			return this.currentUser;
		},
	},
	methods: {
		logout() {
			authenticationService.logout();
			router.push("/login");
		},
	},
};
</script>