<template>
	<v-snackbar
		v-model="contentSnackbar.etat"
		:timeout="timeout"
		:color="contentSnackbar.color"
	>
		{{ contentSnackbar.text }}
		<template v-slot:action>
			<v-btn text @click="contentSnackbar.etat = false">Fermer</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
import { EventBus } from "../eventBus";
export default {
	data() {
		return {
			timeout: 3000,
			contentSnackbar: {
				text: "",
				color: "success",
				etat: false,
			},
		};
	},

	created() {
		EventBus.$on("snackIt", (contentSnackbar) => {
			this.contentSnackbar.etat = contentSnackbar.etat;
			this.contentSnackbar.text = contentSnackbar.text;
			this.contentSnackbar.color = contentSnackbar.color;
		});
	},
};
</script>
