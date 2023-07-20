/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'own-message': '#7c7cf1',
				'support-message': '#f17c7c',
				'button-primary': '#69b852',
			},
		},
	},
	plugins: [],
}
