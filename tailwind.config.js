/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'rgba(2, 2, 2, 1)',
				onBackground: 'rgb(245, 245, 245)',
				surface: 'rgb(18, 18, 18)',
				onSurface: 'rgb(235, 235, 235)',
				onSurfaceVariant: 'rgb(188, 188, 188)',
				primary: 'rgb(168, 135, 248)'

    		}
    	}
    },
    plugins: [require("tailwindcss-animate")]
};

