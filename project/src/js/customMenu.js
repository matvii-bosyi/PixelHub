document.addEventListener('DOMContentLoaded', () => {
	const customMenu = document.getElementById('customMenu')
	const customMenuOpen = document.getElementById('customMenuOpen')

	let isMouseOverMenu = false

	customMenuOpen.addEventListener('mouseenter', () => {
		customMenu.classList.add('show')
	})

	customMenu.addEventListener('mouseenter', () => {
		isMouseOverMenu = true
	})

	customMenu.addEventListener('mouseleave', () => {
		isMouseOverMenu = false
		customMenu.classList.remove('show')
	})

	customMenuOpen.addEventListener('mouseleave', () => {
		setTimeout(() => {
			if (!isMouseOverMenu) {
				customMenu.classList.remove('show')
			}
		}, 100)
	})
})
