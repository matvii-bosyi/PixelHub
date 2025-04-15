document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('searchInput')
	const searchClear = document.getElementById('searchClear')

	searchInput.addEventListener('input', () => {
		if (searchInput.value.length > 0) {
			searchClear.classList.remove('hidden')
		} else {
			searchClear.classList.add('hidden')
		}
	})

	searchClear.addEventListener('click', () => {
		searchInput.value = ''
		searchClear.classList.add('hidden')
		searchInput.focus()
	})
})
