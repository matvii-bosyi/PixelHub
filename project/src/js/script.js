document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('searchInput')
	const searchClear = document.getElementById('searchClear')

	searchInput.addEventListener('input', () => {
		if (searchInput.value.length > 0) {
			searchClear.classList.remove('hidden')
			// searchClear.classList.add('flex')
		} else {
			// searchClear.classList.remove('flex')
			searchClear.classList.add('hidden')
		}
	})

	searchClear.addEventListener('click', () => {
		searchInput.value = ''
		searchClear.classList.add('hidden')
		searchInput.focus()
	})

	// Додаємо обробник для Alt + Enter
	document.addEventListener('keydown', event => {
		if (event.altKey && event.key === 'Enter') {
			searchInput.focus()
		}
	})
})
