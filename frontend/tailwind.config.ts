
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				dark: {
					background: 'hsl(240, 10%, 3.9%)',
					foreground: 'hsl(0, 0%, 98%)',
					card: 'hsl(240, 10%, 3.9%)',
					'card-foreground': 'hsl(0, 0%, 98%)',
					popover: 'hsl(240, 10%, 3.9%)',
					'popover-foreground': 'hsl(0, 0%, 98%)',
					primary: 'hsl(142.1, 70.6%, 45.3%)',
					'primary-foreground': 'hsl(144.9, 80.4%, 10%)',
					secondary: 'hsl(240, 3.7%, 15.9%)',
					'secondary-foreground': 'hsl(0, 0%, 98%)',
					muted: 'hsl(240, 3.7%, 15.9%)',
					'muted-foreground': 'hsl(240, 5%, 64.9%)',
					accent: 'hsl(240, 3.7%, 15.9%)',
					'accent-foreground': 'hsl(0, 0%, 98%)',
					destructive: 'hsl(0, 62.8%, 30.6%)',
					'destructive-foreground': 'hsl(0, 0%, 98%)',
					border: 'hsl(240, 3.7%, 15.9%)',
					input: 'hsl(240, 3.7%, 15.9%)',
					ring: 'hsl(142.1, 70.6%, 45.3%)',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom theme colors
				forest: {
					DEFAULT: '#2D5F2D',
					light: '#3B7A3B',
					dark: '#1F411F',
				},
				amber: {
					DEFAULT: '#FFB950',
					light: '#FFCF7F',
					dark: '#E69F2E',
				},
				earth: {
					DEFAULT: '#8B6D45',
					light: '#A68A5F',
					dark: '#6E562F',
				},
				leaf: {
					DEFAULT: '#70B170',
					light: '#8BC78B',
					dark: '#5A8F5A',
				},
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'pulse-gentle': 'pulse-gentle 3s infinite ease-in-out',
			},
			backgroundImage: {
				'hero-pattern': "url('/src/assets/hero-pattern.png')",
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'earth-texture': "url('/src/assets/earth-texture.png')",
			},
		}
	},
	plugins: [animate],
} satisfies Config;
