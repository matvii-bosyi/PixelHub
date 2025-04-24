document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('customSelectButton')
	const menu = document.getElementById('customSelectMenu')
	const selectedOption = document.getElementById('selectedOption')

	const url = new URL(window.location)
	const orderValue = url.searchParams.get('order')
	if (orderValue) {
		selectedOption.textContent = orderValue

		const matchingItem = Array.from(menu.querySelectorAll('li a')).find(
			item => {
				return item.querySelector('span').textContent === orderValue
			}
		)

		if (matchingItem) {
			menu.querySelectorAll('span.text-green-500').forEach(check => {
				check.classList.add('hidden')
			})
			matchingItem
				.querySelector('span.text-green-500')
				.classList.remove('hidden')
		}
	} else {
		const firstItem = menu.querySelector('li a')
		if (firstItem) {
			const value = firstItem.querySelector('span').textContent
			selectedOption.textContent = value
			firstItem.querySelector('span.text-green-500').classList.remove('hidden')
		}
	}

	button.addEventListener('click', () => {
		menu.classList.toggle('show')
	})

	menu.addEventListener('click', event => {
		const target = event.target.closest('a')
		if (target) {
			event.preventDefault()
			const value = target.querySelector('span').textContent
			selectedOption.textContent = value

			menu.querySelectorAll('span.text-green-500').forEach(check => {
				check.classList.add('hidden')
			})
			target.querySelector('span.text-green-500').classList.remove('hidden')

			const url = new URL(window.location)
			url.searchParams.set('order', value)
			window.history.pushState({}, '', url)

			menu.classList.remove('show')
		}
	})

	document.addEventListener('click', event => {
		if (!menu.contains(event.target) && !button.contains(event.target)) {
			menu.classList.remove('show')
		}
	})
})
