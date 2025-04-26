import { renderContent } from './contentGenerate.js'

document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('customSelectButton')
	const menu = document.getElementById('customSelectMenu')
	const selectedOption = document.getElementById('selectedOption')

	const url = new URL(window.location)
	const orderValue = url.searchParams.get('ordering')
	if (orderValue) {
		const matchingItem = Array.from(menu.querySelectorAll('li a')).find(
			item => item.dataset.ordering === orderValue
		)

		if (matchingItem) {
			selectedOption.textContent = matchingItem.querySelector('span').textContent

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
			selectedOption.textContent = firstItem.querySelector('span').textContent
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
			const value = target.dataset.ordering
			selectedOption.textContent = target.querySelector('span').textContent

			menu.querySelectorAll('span.text-green-500').forEach(check => {
				check.classList.add('hidden')
			})
			target.querySelector('span.text-green-500').classList.remove('hidden')

			const url = new URL(window.location)
			url.searchParams.set('ordering', value)
			window.history.pushState({}, '', url)

			renderContent(false)

			menu.classList.remove('show')
		}
	})

	document.addEventListener('click', event => {
		if (!menu.contains(event.target) && !button.contains(event.target)) {
			menu.classList.remove('show')
		}
	})
})
