import {
	renderCreators,
	renderDevelopers,
	renderGames,
	renderGenres,
	renderPlatforms,
	renderPublishers,
	renderStores,
	renderTags,
} from './renders.js'

let nextPageUrl = null
let isLoading = false // Додаємо змінну для блокування запитів

function checkContentHeight() {
	const contentContainer = document.getElementById('contentContainer')
	const windowHeight = window.innerHeight

	// Якщо висота контенту менша за висоту вікна і є наступна сторінка, виконуємо запит
	if (contentContainer.offsetHeight < windowHeight && nextPageUrl) {
		loadNextPage()
	}
}

export function renderContent(append = false) {
	const url = 'https://api.rawg.io/api/'
	const query =
		new URLSearchParams(window.location.search).get('filter') || 'games'
	// const APIKey = '519a9bd81eb849b68bdcce7eacaec6dc'
	const reqUrl = `${url}${query}?key=${APIKey}`

	function sendRequest(method, url) {
		const headers = {
			'Content-Type': 'application/json',
		}

		return fetch(url, {
			method: method,
			headers: headers,
		}).then(response => {
			if (response.ok) {
				return response.json()
			}

			return response.json().then(err => {
				const e = new Error('Something went wrong')
				e.data = err
				throw e
			})
		})
	}

	const renderMap = {
		games: renderGames,
		platforms: renderPlatforms,
		stores: renderStores,
		genres: renderGenres,
		creators: renderCreators,
		tags: renderTags,
		developers: renderDevelopers,
		publishers: renderPublishers,
	}

	sendRequest('GET', reqUrl)
		.then(data => {
			if (!append) {
				// Очищаємо контейнер, якщо це не додатковий запит
				const contentContainer = document.getElementById('contentContainer')
				contentContainer.innerHTML = ''
			}

			if (renderMap[query]) {
				renderMap[query](data, append)
			}
			nextPageUrl = data.next

			// Перевіряємо висоту контенту після рендерингу
			checkContentHeight()
		})
		.catch(error => {
			console.log(error)
		})
}

function loadNextPage() {
	if (!nextPageUrl || isLoading) return // Перевіряємо, чи є наступна сторінка і чи не виконується запит

	isLoading = true // Блокуємо наступні запити

	function sendRequest(method, url) {
		const headers = {
			'Content-Type': 'application/json',
		}

		return fetch(url, {
			method: method,
			headers: headers,
		}).then(response => {
			if (response.ok) {
				return response.json()
			}

			return response.json().then(err => {
				const e = new Error('Something went wrong')
				e.data = err
				throw e
			})
		})
	}

	sendRequest('GET', nextPageUrl)
		.then(data => {
			const query =
				new URLSearchParams(window.location.search).get('filter') || 'games'
			const renderMap = {
				games: renderGames,
				platforms: renderPlatforms,
				stores: renderStores,
				genres: renderGenres,
				creators: renderCreators,
				tags: renderTags,
				developers: renderDevelopers,
				publishers: renderPublishers,
			}

			if (renderMap[query]) {
				renderMap[query](data, true)
			}
			nextPageUrl = data.next
			isLoading = false // Розблоковуємо запити після завершення

			// Перевіряємо висоту контенту після рендерингу
			checkContentHeight()
		})
		.catch(error => {
			console.log(error)
			isLoading = false // Розблоковуємо навіть у разі помилки
		})
}

// Додаємо обробник події прокрутки
window.addEventListener('scroll', () => {
	const scrollPosition = window.scrollY + window.innerHeight
	const scrollHeight = document.documentElement.scrollHeight

	// Виконуємо запит, якщо прокручено більше ніж 97%
	if (scrollPosition >= scrollHeight * 0.97) {
		loadNextPage()
	}
})

document.addEventListener('DOMContentLoaded', () => {
	renderContent()
})
