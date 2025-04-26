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
let isLoading = false

function checkContentHeight() {
	const contentContainer = document.getElementById('contentContainer')
	const windowHeight = window.innerHeight

	if (contentContainer.offsetHeight < windowHeight && nextPageUrl) {
		loadNextPage()
	}
}

export function renderContent(append = false) {
	const url = 'https://api.rawg.io/api/'
	let filter = null
	const searchParams = new URLSearchParams(window.location.search)

	if (!searchParams.has('filter')) {
		searchParams.set('filter', 'games')
		filter = 'games'

		const newUrl = `${window.location.pathname} ? ${searchParams.toString()}`
		window.history.replaceState({}, '', newUrl)
	} else {
		filter = searchParams.get('filter')
	}
	const ordering =
		new URLSearchParams(window.location.search).get('ordering') || 'popularity'
	const APIKey = '519a9bd81eb849b68bdcce7eacaec6dc'
	let reqUrl = `${url}${filter}?key=${APIKey}`

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

	if (filter === 'games') {
		reqUrl += `&ordering=${ordering}`
	} else {
		const url = new URL(window.location);
		url.searchParams.delete('ordering');
		window.history.replaceState({}, '', url);
	}

	sendRequest('GET', reqUrl)
		.then(data => {
			if (!append) {
				const contentContainer = document.getElementById('contentContainer')
				contentContainer.innerHTML = ''
			}

			if (renderMap[filter]) {
				renderMap[filter](data, append)
			}
			nextPageUrl = data.next

			checkContentHeight()
		})
		.catch(error => {
			console.log(error)
		})
}

function loadNextPage() {
	if (!nextPageUrl || isLoading) return

	isLoading = true

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
			const filter =
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

			if (renderMap[filter]) {
				renderMap[filter](data, true)
			}
			nextPageUrl = data.next
			isLoading = false

			checkContentHeight()
		})
		.catch(error => {
			console.log(error)
			isLoading = false
		})
}

window.addEventListener('scroll', () => {
	const scrollPosition = window.scrollY + window.innerHeight
	const scrollHeight = document.documentElement.scrollHeight

	if (scrollPosition >= scrollHeight * 0.97) {
		loadNextPage()
	}
})

document.addEventListener('DOMContentLoaded', () => {
	renderContent()
})