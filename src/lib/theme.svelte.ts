import { browser } from '$app/environment'

const item_name='theme-mode'

class Theme {
	current = $state(browser && localStorage.getItem(item_name))
	toggle = () => {
		const theme = this.current === 'dark' ? 'light' : 'dark'
		document.documentElement.classList.toggle('dark', theme === 'dark')
		localStorage.setItem(item_name, theme)
		this.current = theme
	}

	isDark=()=> {
		return this.current === 'dark'
	}
}

export const theme = new Theme()
