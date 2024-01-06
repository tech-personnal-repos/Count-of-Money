import { POSITION, useToast } from 'vue-toastification';

function generateDefaultToast() {
	const toast = useToast();

	toast.updateDefaults({
		maxToasts: 3,
		newestOnTop: false,
		transition: 'Vue-Toastification__bounce',
		position: POSITION.TOP_RIGHT,
		timeout: 5000,
		closeOnClick: true,
		pauseOnFocusLoss: false,
		pauseOnHover: true,
		draggable: false,
		draggablePercent: 0.1,
		showCloseButtonOnHover: false,
		hideProgressBar: true,
		closeButton: false,
		icon: true,
		rtl: false
	});

	return toast;
}

export default {
	success(message: string) {
		generateDefaultToast().success(message);
	},

	error(message: string) {
		generateDefaultToast().error(message);
	},

	warning(message: string) {
		generateDefaultToast().warning(message);
	},

	info(message: string) {
		generateDefaultToast().info(message);
	}
};
